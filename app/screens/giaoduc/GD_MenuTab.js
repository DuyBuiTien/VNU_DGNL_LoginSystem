import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, Platform, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { List } from 'react-native-paper';
import RadioForm from '../../modules/react-native-simple-radio-button';
import Modal from 'react-native-modal';

import { GD_INFO } from '../../data/GD_Data'

import { requestGET, requestPOST } from '../../services/Api';

import moment from 'moment';
moment.locale('vi');

const renderModalContent = (setVisibleModal, namhocs, modalLoading, hockys, setValue, setValue1, setNamHoc) => {
  if (!modalLoading) {
    return (
      <View style={styles.content}>
        <Text style={{ fontStyle: 'italic', padding: 20, textAlign: 'center' }} >Vui lòng chọn năm học: </Text>
        <RadioForm
          radio_props={namhocs}
          initial={-1}
          onPress={(value) => setValue(value)}
          buttonSize={15}
          buttonWrapStyle={{ padding: 20 }}
        />
        <Text style={{ fontStyle: 'italic', padding: 20, textAlign: 'center' }} >Vui lòng chọn học kỳ: </Text>
        <RadioForm
          radio_props={hockys}
          initial={-1}
          onPress={(value) => setValue1(value)}
          buttonSize={15}
          buttonWrapStyle={{ padding: 20 }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch', paddingTop: 20 }}>

          <TouchableOpacity onPress={() => { setVisibleModal(false) }}>
            <Text style={{ fontSize: 14, color: '#2089dc', fontWeight: 'bold' }}>ĐÓNG</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setNamHoc() }}>
            <Text style={{ fontSize: 14, color: '#66BB6A', fontWeight: '600' }}>CHỌN</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
  else {
    return (
      <View style={styles.content}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
        </View>
      </View>
    )
  }
}

const GD_MenuTab = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);
  const [isLoading, setIsLoading] = useState(false);
  const dataService = useSelector((state) => state.global.dataService);
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(true);
  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('');
  const [namhocs, setNamhocs] = useState([]);
  const [hockys, setHockys] = useState([]);

  useEffect(() => {

    return () => { };
  }, []);

  const setNamHoc = async () => {
    if (value && value1) {
      var a = namhocs.findIndex(x => x.value === value)
      var b = hockys.findIndex(x => x.value === value1)
      await AsyncStorage.multiSet([
        ['NamHocID', value.toString()],
        ['HocKyID', value1.toString()],
        ['NamHoc', namhocs[a].label],
        ['HocKy', hockys[b].label],
      ])
      setVisibleModal(false)
      setTimeout(() => navigation.replace('GD_SLLDTScreen'), 200)
    }
  }

  const showNamHoc = async () => {
    setVisibleModal(true)
    var data1 = await requestGET(`${dataService.GD_URL}/GetNamHocs`)
    var data2 = data1.data ? data1.data : []
    var radio_props = []
    data2.forEach((i) => {
      radio_props.push({ label: i.TieuDe, value: i.ID })
    })
    var data3 = await requestGET(`${dataService.GD_URL}/GetHocKys`)
    var data4 = data3.data ? data3.data : []
    var radio_props1 = []
    data4.forEach((i) => {
      radio_props1.push({ label: i.TieuDe, value: i.ID })
    })
    setNamhocs(radio_props)
    setHockys(radio_props1)
    setModalLoading(false)
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.navigate('GD_TKB_MainScreen')} style={styles.view1}>
              <FontAwesome name='calendar-alt' color='#73809B' size={30} style={{ padding: 10 }} />
              <Text style={styles.text1}>Thời khoá biểu</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('GD_DD_MainScreen')} style={styles.view1}>
              <FontAwesome name='calendar-check' color='#73809B' size={30} style={{ padding: 10 }} />
              <Text style={styles.text1}>Điểm danh</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('GD_TB_MainScreen')} style={styles.view1}>
              <FontAwesome name='bell' color='#73809B' size={30} style={{ padding: 10 }} />
              <Text style={styles.text1}>Thông báo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('GD_KSK_MainScreen')} style={styles.view1}>
              <FontAwesome name='weight' color='#73809B' size={30} style={{ padding: 10 }} />
              <Text style={styles.text1}>Khám sức khoẻ</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('GD_XNP_MainScreen')} style={styles.view1}>
              <FontAwesome name='clipboard-list' color='#73809B' size={30} style={{ padding: 10 }} />
              <Text style={styles.text1}>Xin nghỉ phép</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('GD_BT_MainScreen')} style={styles.view1}>
              <FontAwesome name='utensils' color='#73809B' size={30} style={{ padding: 10 }} />
              <Text style={styles.text1}>Bán trú</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('GD_GY_MainScreen')} style={styles.view1}>
              <FontAwesome name='sticky-note' color='#73809B' size={30} style={{ padding: 10 }} />
              <Text style={styles.text1}>Góp ý</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { showNamHoc() }} style={styles.view1}>
              <FontAwesome name='cog' color='#73809B' size={30} style={{ padding: 10 }} />
              <Text style={styles.text1}>Chọn lại năm học</Text>
            </TouchableOpacity>
            <Modal
              backdropTransitionOutTiming={0}
              isVisible={visibleModal}
              style={{ margin: 0 }}
              hideModalContentWhileAnimating={true}>
              {renderModalContent(setVisibleModal, namhocs, modalLoading, hockys, setValue, setValue1, setNamHoc)}
            </Modal>
          </View>
        )}
    </View>
  );
};

export default GD_MenuTab;

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    padding: 10
  },
  text: {
    fontSize: 20,
    color: 'black'
  },
  container: {
    backgroundColor: "#fff",
    flex: 1
  },
  view1: {
    flexDirection: 'row', alignItems: 'center', padding: 20
  },
  text1: {
    fontSize: 16, color: '#323232', paddingStart: 20
  },
  text2: {
    fontSize: 16, color: '#fff', paddingStart: 20, fontWeight: 'bold'
  },
  text3: {
    fontSize: 16, color: '#fff', fontWeight: 'bold'
  },
  date: {
    fontSize: 10,
  },
  content: {
    backgroundColor: 'white',
    margin: 10,
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    minHeight: 100,
    padding: 20
  },
});

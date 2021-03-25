/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions, FlatList, ImageBackground} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {Button} from 'react-native-elements';

import {Header} from '../../components';
import ActionSheet from '../../modules/react-native-actions-sheet';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {MENU} from '../../data/GT_Data';
import DatePicker from '../../modules/react-native-datepicker';
import {RenderChonViTri} from '../../components/giaothong';

const MainScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);
  const refRBSheet = useRef();
  const dataService = useSelector((state) => state.global.dataService);
  const [dataMenu, setDataMenu] = useState(MENU);

  const [dataNhaXe, setDataNhaXe] = useState([]);
  const [dataDiChung, setDataDiChung] = useState([]);

  const [noidi, setNoidi] = useState('');
  const [noiden, setNoiden] = useState('');
  const [ngaydi, setNgaydi] = useState('');
  const [isNoidi, setIsNoidi] = useState(true);

  useEffect(() => {
    return () => {};
  }, []);

  const ChonDiaDiem = (check) => {
    setIsNoidi(check);
    refRBSheet.current.setModalVisible(true);
  };
  const handleChonNoiDi = (data) => {
    refRBSheet.current.setModalVisible(false);

    setNoidi(data.PathWithType ? data.PathWithType : data.NameWithType);
  };

  const handleChonNoiDen = (data) => {
    refRBSheet.current.setModalVisible(false);
    setNoiden(data.PathWithType ? data.PathWithType : data.NameWithType);
  };

  const ModalHide = () => {
    refRBSheet.current.setModalVisible(false);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <ImageBackground
        imageStyle={{}}
        resizeMode="cover"
        style={{width: '100%', height: 200, position: 'absolute'}}
        source={require('../../Images/bgdixe.jpeg')}
      />
      <Header title="Tìm xe khách" isStack={true} backgroundColor="transparent" textColor={'#FFF'} />

      <ScrollView>
        <View style={{marginTop: 20, marginHorizontal: 20}}>
          <Text style={{color: '#FFF', fontSize: 22, fontWeight: 'bold'}}>{`Chào ${user.fullName}!`}</Text>
          <Text style={{color: '#FFF', fontSize: 18, fontWeight: 'bold', marginTop: 10}}>Hôm nay bạn muốn đi đâu?</Text>
        </View>
        <View
          style={{
            backgroundColor: '#FFF',
            margin: 20,
            padding: 10,
            borderRadius: 4,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            borderColor: '#abb4bd65',
            shadowRadius: 2,
            elevation: 2,
          }}>
          <View style={styles.content1}>
            <Text style={styles.title}>Nơi đi:</Text>
            <TouchableOpacity
              onPress={() => {
                ChonDiaDiem(true);
              }}
              style={{
                marginTop: 10,
                padding: 10,
                borderColor: '#D1D1D1',
                borderWidth: 0.5,
                borderRadius: 8,
                justifyContent: 'space-between',
                flexDirection: 'row',
                minHeight: 40,
                alignItems: 'center',
              }}>
              <Text
                style={{color: noidi !== '' ? '#3B3B3B' : 'gray', fontWeight: noidi !== '' ? 'bold' : 'normal'}}
                numberOfLines={1}>
                {noidi !== '' ? noidi : 'Chọn nơi đi'}
              </Text>
              <FontAwesome name={'chevron-down'} color={'gray'} />
            </TouchableOpacity>
          </View>
          <View style={styles.content1}>
            <Text style={styles.title}>Nơi đến:</Text>
            <TouchableOpacity
              onPress={() => {
                ChonDiaDiem(false);
              }}
              style={{
                marginTop: 10,
                padding: 10,
                borderColor: '#D1D1D1',
                borderWidth: 0.5,
                borderRadius: 8,
                justifyContent: 'space-between',
                flexDirection: 'row',
                minHeight: 40,
                alignItems: 'center',
              }}>
              <Text
                style={{color: noiden !== '' ? '#3B3B3B' : 'gray', fontWeight: noiden !== '' ? 'bold' : 'normal'}}
                numberOfLines={1}>
                {noiden !== '' ? noiden : 'Chọn nơi đến'}
              </Text>
              <FontAwesome name={'chevron-down'} color={'gray'} />
            </TouchableOpacity>
          </View>
          <View style={styles.content1}>
            <Text style={styles.title}>Ngày đi:</Text>
            <View
              style={{
                marginTop: 10,
                paddingHorizontal: 10,
                borderColor: '#D1D1D1',
                borderWidth: 0.5,
                borderRadius: 8,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <DatePicker
                style={{flex: 1}}
                date={ngaydi}
                mode="date"
                placeholder={'Ngày'}
                format="DD/MM/YYYY"
                confirmBtnText="Chọn"
                cancelBtnText="Huỷ"
                customStyles={{
                  dateInput: {
                    color: ngaydi !== '' ? '#3B3B3B' : 'gray',
                    marginEnd: 5,
                    borderWidth: 0,
                    margin: 0,
                    padding: 0,
                    fontWeight: ngaydi !== '' ? 'bold' : 'normal',
                  },
                }}
                onDateChange={(i) => {
                  setNgaydi(i);
                }}
                iconComponent={<FontAwesome name={'chevron-down'} color={'gray'} style={{marginHorizontal: 5}} />}
              />
            </View>
          </View>
          <Button buttonStyle={{marginTop: 20, marginHorizontal: 15}} title="Tìm kiếm" />
        </View>
      </ScrollView>
      <ActionSheet
        // initialOffsetFromBottom={0.5}
        initialOffsetFromBottom={1}
        ref={refRBSheet}
        bounceOnOpen={true}
        bounciness={8}
        gestureEnabled={true}
        onClose={() => {
          //setTypeBottomSheet(0);
        }}
        containerStyle={{margin: 20}}
        defaultOverlayOpacity={0.3}>
        <RenderChonViTri
          handleDongY={isNoidi ? handleChonNoiDi : handleChonNoiDen}
          actionSheetRef={refRBSheet}
          title="Chọn hành trình"
          ModalHide={ModalHide}
        />
      </ActionSheet>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  content1: {paddingHorizontal: 15, paddingTop: 20},
  title: {color: '#5B6062', fontWeight: 'bold'},
  textinputContainer: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderRadius: 4,
    padding: 0,
    marginVertical: 10,
    alignItems: 'center',
    borderColor: '#abb4bd65',
    borderWidth: 0.4,
  },
});

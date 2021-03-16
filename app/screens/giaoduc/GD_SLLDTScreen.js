/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Modal from 'react-native-modal';
import RadioForm from '../../modules/react-native-simple-radio-button';

import { Header } from '../../components';
import { ItemMenuImage, BlockLogin } from '../../components/common';

import {GD_INFO} from '../../data/GD_Data'

import GD_TabBar from './GD_TabBar'
import GD_HomeTab from './GD_HomeTab'
import GD_PointTab from './GD_PointTab'
import GD_ClassTab from './GD_ClassTab'
import GD_MenuTab from './GD_MenuTab'

import { requestGET, requestPOST } from '../../services/Api';

import moment from 'moment';
moment.locale('vi');

const RenderItem = (props) => {
  const { changeStudent, item } = props
  var date = moment(item.NgaySinh).format('L')
  return(
    <TouchableOpacity onPress={() => changeStudent(item)} style={{flexDirection: 'row', padding: 10, margin: 10, backgroundColor: '#2AA5FF', borderRadius: 10}}>
    <View style={{height: 40, width: 40, borderRadius: 50, borderWidth: 2, borderColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
      <FontAwesome name='user' size={18} color='#fff' />
    </View>
    <View style={{paddingStart: 10}}>
      <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>{item.Ten}</Text>
      <Text style={{color: '#fff', fontSize: 12, paddingTop: 2,fontWeight: 'bold'}}>{date}</Text>
    </View>
    </TouchableOpacity>
  )
}

const renderModalContent = (listStudent, navigation, setVisibleModal, student, changeStudent) => {
  return(
    <View style={styles.content}>
      <Text style={{fontStyle: 'italic', padding: 20, textAlign: 'center'}} >Vui lòng chọn học sinh: </Text>
      <FlatList 
        data={listStudent}
        renderItem={({item, index}) => <RenderItem item={item} index={index} changeStudent={changeStudent}/>}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch', paddingTop: 30}}>
        <TouchableOpacity onPress={() => {
          if(student.length > 0){
            setVisibleModal(false)
          }
          else{
            setVisibleModal(false)
            setTimeout(() => navigation.goBack(), 500)
          }
        }}>
          <Text style={{fontSize: 14, color: '#2089dc', fontWeight: 'bold'}}>ĐÓNG</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const renderModalContent1 = (setNamHocTong, setValue, setValue1, namhocs, hockys) => {
  return(
    <View style={styles.content}>
        <Text style={{fontStyle: 'italic', padding: 20, textAlign: 'center'}} >Vui lòng chọn năm học: </Text>
        <RadioForm
          radio_props={namhocs}
          initial={-1}
          onPress={(value) => {setValue(value)}}
          buttonSize={15}
          buttonWrapStyle={{padding: 20}}
        />
        <Text style={{fontStyle: 'italic', padding: 20, textAlign: 'center'}} >Vui lòng chọn học kỳ: </Text>
        <RadioForm
          radio_props={hockys}
          initial={-1}
          onPress={(value) => {setValue1(value)}}
          buttonSize={15}
          buttonWrapStyle={{padding: 20}}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch', paddingTop: 30}}>
          <TouchableOpacity onPress={() => {setNamHocTong()}}>
            <Text style={{fontSize: 14, color: '#66BB6A', fontWeight: '600'}}>CHỌN</Text>
          </TouchableOpacity>
        </View>
      </View>
  )
}

const renderModalContent2 = (student, setVisibleModal2, Truong, Lop, NamHoc) => {
  var date = moment(student.NgaySinh).format('L')
  return(
      <View style={{flex: 1, backgroundColor: '#2AA5FF'}}>
      <FontAwesome name='times' size={30} color='#fff' style={{alignSelf: 'flex-end', padding: 10, paddingTop: 33}} onPress={() => setVisibleModal2(false)} />
      <View style={{flexDirection: 'row', padding: 10, paddingTop: 10, alignItems: 'center',}}>
        <View style={{height: 80, width: 80, borderRadius: 80, borderWidth: 2, borderColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
          <FontAwesome name='user' size={24} color='#fff' />
        </View>
        <View style={{paddingStart: 10}}>
          <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>{student.Ten}</Text>
          <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>ID {student.ID}</Text>
        </View>
        
        </View>
        <View style={{padding: 10, margin: 10, backgroundColor: '#fff', borderRadius: 10}}>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Text style={{color: '#616161', width: 100}}>Trường</Text>
            <Text>{Truong}</Text>
          </View>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Text style={{color: '#616161', width: 100}}>Lớp</Text>
            <Text>{Lop}</Text>
          </View>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Text style={{color: '#616161', width: 100}}>Khối</Text>
            <Text>{student.Grade}</Text>
          </View>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Text style={{color: '#616161', width: 100}}>Năm học</Text>
            <Text>{NamHoc}</Text>
          </View>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Text style={{color: '#616161', width: 100}}>Giới tính</Text>
            <Text>{student.GioiTinh}</Text>
          </View>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Text style={{color: '#616161', width: 100}}>Ngày sinh</Text>
            <Text>{date}</Text>
          </View>
        </View>
      </View>
  )
}

const GD_SLLDTScreen = (props) => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.global.user);
    const [isLoading, setIsLoading] = useState(false);
    const dataService = useSelector((state) => state.global.dataService);
    const [data, setData] = useState([]);
    const [student, setStudent] = useState({});
    const [studentID, setStudentID] = useState('');
    const [NamHoc, setNamHoc] = useState([]);
    const [HocKy, setHocKy] = useState([]);
    const [Truong, setTruong] = useState([]);
    const [Lop, setLop] = useState([]);
    const [value, setValue] = useState('');
    const [value1, setValue1] = useState('');
    const [listStudent, setListStudent] = useState({});
    const [namhocs, setNamhocs] = useState([]);
    const [hockys, setHockys] = useState([]);

    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModal1, setVisibleModal1] = useState(false);
    const [visibleModal2, setVisibleModal2] = useState(false);

    const fetchData = async () => {
      setIsLoading(true);
      var studentID = await AsyncStorage.getItem('studentID')
      if(studentID){
        var studentInfo = await AsyncStorage.getItem('studentInfo')
        var NamHoc = await AsyncStorage.getItem('NamHoc')
        var HocKy = await AsyncStorage.getItem('HocKy')
        var Truong = await AsyncStorage.getItem('Truong')
        var Lop = await AsyncStorage.getItem('Lop')
        setStudent(JSON.parse(studentInfo))
        setNamHoc(NamHoc)
        setHocKy(HocKy)
        setTruong(Truong)
        setLop(Lop)
        setIsLoading(false)
      }
      else{
        var body = {'token': GD_INFO.token, 'sodienthoai': GD_INFO.phoneNumber}
        var data1 = await requestPOST(`${dataService.GD_URL}/GetHocSinhsBySoDienThoais`, body)
        var data2 = data1.data?data1.data:[]
        setListStudent(data2)
        setVisibleModal(true)
      }
    };
    
    const changeStudent = async(item) => {
      setIsLoading(true)
      await AsyncStorage.multiSet([
        ['studentID', item.ID.toString()],
        ['studentInfo', JSON.stringify(item)]
      ])
      var data1 = await requestGET(`${dataService.GD_URL}/GetNamHocs`)
      var data2 = data1.data?data1.data:[]
      var radio_props = []
      data2.forEach((i) => {
        radio_props.push({label: i.TieuDe, value: i.ID})
      })
      var data3 = await requestGET(`${dataService.GD_URL}/GetHocKys`)
      var data4 = data3.data?data3.data:[]
      var radio_props1 = []
      data4.forEach((i) => {
        radio_props1.push({label: i.TieuDe, value: i.ID})
      })
      setVisibleModal(false)
      setStudentID(item.ID)
      setStudent(item)
      setNamhocs(radio_props)
      setHockys(radio_props1)
      setTimeout(() => setVisibleModal1(true), 1000)
    }

    const showStudents = async() => {
      var body = {'token': GD_INFO.token, 'sodienthoai': GD_INFO.phoneNumber}
      var data1 = await requestPOST(`${dataService.GD_URL}/GetHocSinhsBySoDienThoais`, body)
      var data2 = data1.data?data1.data:[]
      setListStudent(data2)
      setVisibleModal(true)
    }
  
    const setNamHocTong = async() => {
      if(value && value1){
        var a = namhocs.findIndex(x => x.value === value)
        var b = hockys.findIndex(x => x.value === value1)
        var body = {'token': GD_INFO.token, 'HocSinhID': studentID, 'NamHocID': value}
        var data1 = await requestPOST(`${dataService.GD_URL}/GetTruongLop`, body)
        var data2 = data1.data?data1.data:[]
        var Truong = data2[0]?data2[0].TruongHocTieuDe:''
        var Lop = data2[0]?data2[0].LopHocTieuDe:''
        var TruongID = data2[0]?data2[0].TruongHocID:''
        var LopID = data2[0]?data2[0].LopHocID:''
        await AsyncStorage.multiSet([
          ['NamHocID', value.toString()],
          ['HocKyID', value1.toString()],
          ['NamHoc', namhocs[a].label],
          ['HocKy', hockys[b].label],
          ['Truong', Truong],
          ['Lop', Lop],
          ['TruongID', TruongID.toString()],
          ['LopID', LopID.toString()],
        ])
        setVisibleModal1(false)
        setIsLoading(false)
        setTruong(Truong)
        setLop(Lop)
        setNamHoc(namhocs[a].label)
        setHocKy(hockys[b].label)
      }
    }

    useEffect(() => {
        fetchData();
        return () => { };
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center'}} />
          ) : (
          <>
          <View style={{height: 90, alignSelf: 'stretch', flexDirection: 'row', paddingTop: 35, paddingStart: 20, paddingEnd: 20, justifyContent: 'space-between', backgroundColor: '#2AA5FF'}}>
          <View style={{paddingTop: 10}}>
          <FontAwesome onPress={() => navigation.goBack()} name='chevron-left' color='white' size={24} />
          </View>
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => {setVisibleModal2(true)}} style={{height: 40, width: 40, borderRadius: 50, borderWidth: 2, borderColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
            <FontAwesome name='user' size={18} color='#fff' />
          </TouchableOpacity>
          <View style={{paddingStart: 10, paddingEnd: 10}}>
            <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>{student.Ten}</Text>
            <Text style={{color: '#fff', fontSize: 12, paddingTop: 2,fontWeight: 'bold'}}>{HocKy}, {NamHoc}</Text>
          </View>
          <FontAwesome name='chevron-down' size={20} color='#fff' containerStyle={{paddingTop: 8}} onPress={() => showStudents()} />
          </View>
          <View style={{paddingTop: 10}}>
          <FontAwesome size={24}  name='home' color='transparent' containerStyle={{}} />
          </View>
        </View>
        <ScrollableTabView
          style={{flex: 1,}}
          initialPage={0}
          tabBarPosition='bottom'
          renderTabBar={() => <GD_TabBar {...props}/>}
        >
          <ScrollView style={styles.tabView}>
            <GD_HomeTab {...props}/>
          </ScrollView>
          <ScrollView style={styles.tabView}>
            <GD_PointTab {...props}/> 
          </ScrollView>
          <ScrollView style={styles.tabView}>
            <GD_ClassTab {...props}/>
          </ScrollView>
          <ScrollView style={styles.tabView}>
            <GD_MenuTab {...props}/>
          </ScrollView>
        </ScrollableTabView>
        <Modal
          backdropTransitionOutTiming={0}
          isVisible={visibleModal2}
          style={{margin: 0}}
          hideModalContentWhileAnimating={true}>
          {renderModalContent2(student, setVisibleModal2, Truong, Lop, NamHoc)}
        </Modal>
          </>
          )}
          <Modal
            backdropTransitionOutTiming={0}
            isVisible={visibleModal}
            style={{margin: 0}}
            hideModalContentWhileAnimating={true}>
            {renderModalContent(listStudent, navigation, setVisibleModal, student, changeStudent)}
          </Modal>
          <Modal
            backdropTransitionOutTiming={0}
            isVisible={visibleModal1}
            style={{margin: 0}}
            hideModalContentWhileAnimating={true}>
            {renderModalContent1(setNamHocTong, setValue, setValue1, namhocs, hockys)}
          </Modal>
        </View>
    );
};

export default GD_SLLDTScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 20, 
    color: 'black'
  },
  container:{
    flex: 1
  },
  tabView: {
    flex: 1,
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

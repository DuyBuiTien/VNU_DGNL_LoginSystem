import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, Platform, Linking} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { List } from 'react-native-paper';

import { GD_INFO } from '../../data/GD_Data'

import { requestGET, requestPOST } from '../../services/Api';

import moment from 'moment';
moment.locale('vi');

const RenderItem = (props) => {
  const { item, } = props;
  return(
    <View style={{marginTop: 10, padding: 10, flexDirection: 'row',justifyContent: 'space-between'}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{height: 50,width: 50, borderRadius: 30, backgroundColor: '#2AA5FF', justifyContent: 'center', alignItems: 'center'}}>
          <FontAwesome name='user' color='#fff' size={18} />
        </View>
        <View>
          <View style={{flex: 1, paddingStart: 10, alignItems: 'center', flexDirection: 'row'}}>
            <Text style={{paddingEnd: 10}}>{item.Ten}</Text>
            {renderGT(item.GioiTinh)}
          </View>
        </View>
      </View>
      <View style={{paddingTop: 10}}>
        {renderCall(item.phone)}
      </View>
    </View>
  )
}

const RenderItem1 = (props) => {
  const { item, } = props;
  return(
    <View style={{marginTop: 10, padding: 10, flexDirection: 'row',justifyContent: 'space-between'}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{height: 50,width: 50, borderRadius: 30, backgroundColor: '#2AA5FF', justifyContent: 'center', alignItems: 'center'}}>
          <FontAwesome name='chalkboard-teacher' color='#fff' size={18} />
        </View>
        <View>
          <View style={{flex: 1, paddingStart: 10, alignItems: 'center', flexDirection: 'row'}}>
            <Text style={{paddingEnd: 10}}>{item.HoTen}</Text>
            {renderGT(item.GioiTinh)}
          </View>
          <Text style={{color: '#757575',paddingStart: 10}}>{item.MonHoc}</Text>
        </View>
      </View>
      <View style={{paddingTop: 10}}>
        {renderCall(item.SoDienThoai)}
      </View>
    </View>
  )
}

const RenderHead = (listGV, changeData, dataStudent, dataTeacher) => {
  if(!listGV){
    var male = 0
    dataStudent.map((i) => {if(i.GioiTinh === 'Nam'){male ++}})
    return(
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20, paddingStart: 20}}>
        <Animatable.View animation='bounceInLeft' delay={100}>
          <Text style={{fontSize: 20,color: 'black'}}>Danh sách học sinh</Text>
          <Text style={{paddingTop: 5, color: '#757575'}}>{male} Nam - {dataStudent.length - male} Nữ / {dataStudent.length} Học sinh</Text>
        </Animatable.View>
        <Animatable.View animation='fadeInLeft' delay={100}>
        <TouchableOpacity onPress={() => {changeData('GV')}} style={{flexDirection: 'row', padding: 10, paddingStart: 20, paddingEnd: 20, backgroundColor: '#2AA5FF', borderTopLeftRadius: 30, borderBottomLeftRadius: 30, justifyContent: 'center', alignItems: 'center', }}>
          <FontAwesome name='chalkboard-teacher' color='#fff' size={18} />
          <Text style={{color: '#fff'}}>    Giáo viên</Text>
        </TouchableOpacity>
        </Animatable.View>
      </View>
    )
  }
  else{
    var male = 0
    dataTeacher.map((i) => {if(i.GioiTinh === 'Nam'){male ++}})
    return(
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20, paddingStart: 20}}>
        <Animatable.View animation='bounceInLeft' delay={100}>
          <Text style={{fontSize: 20,color: 'black'}}>Danh sách giáo viên</Text>
          <Text style={{paddingTop: 5, color: '#757575'}}>{male} Thầy - {dataTeacher.length - male} Cô/ {dataTeacher.length} Giáo viên</Text>
        </Animatable.View>
        <Animatable.View animation='fadeInLeft' delay={100}>
        <TouchableOpacity onPress={() => {changeData('HS')}} style={{flexDirection: 'row', padding: 10, paddingStart: 20, paddingEnd: 20, backgroundColor: '#2AA5FF', borderTopLeftRadius: 30, borderBottomLeftRadius: 30, justifyContent: 'center', alignItems: 'center', }}>
          <FontAwesome name='user' color='#fff' size={18} />
          <Text style={{color: '#fff'}}>    Học sinh</Text>
        </TouchableOpacity>
        </Animatable.View>
      </View>
    )
  }
}

const renderGT = (gt) => {
  if(gt === 'Nam'){
    return(
      <FontAwesome name='mars' size={24} color='#3F51B5' />
    )
  }
  else{
    return(
      <FontAwesome name='venus' size={24} color='#E91E63' />
    )
  }
}

const renderCall = (phone) => {
  if(phone){
    return(
      <FontAwesome name='phone' size={24} color='#757575' onPress={() => dialCall(phone)} />
    ) 
  }
}

const dialCall = (number) => {
  var phoneNumber = '';
  Platform.OS === 'android'?phoneNumber = `tel:${number}`:phoneNumber = `telprompt:${number}`
  Linking.openURL(phoneNumber);
};

const GD_ClassTab = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);
  const [isLoading, setIsLoading] = useState(false);
  const dataService = useSelector((state) => state.global.dataService);
  const [dataStudent, setDataStudent] = useState([]);
  const [dataTeacher, setDataTeacher] = useState([]);
  const [data, setData] = useState([]);
  const [listGV, setListGV] = useState(false);


  const fetchData = async () => {
    setIsLoading(true);
    var NamHocID = await AsyncStorage.getItem('NamHocID')
    var HocKyID = await AsyncStorage.getItem('HocKyID')
    var studentID = await AsyncStorage.getItem('studentID')
    var body = { 'token': GD_INFO.token, 'HocSinhID': studentID, 'NamHocID': NamHocID, 'HocKyID': HocKyID }
    var data1 = await requestPOST(`${dataService.GD_URL}/DanhSachHocSinhTrongLops`, body)
    var data2 = data1.data ? data1.data : []
    var data3 = await requestPOST(`${dataService.GD_URL}/GiaoVienGiangDay`, body)
    var data4 = data3.data ? data3.data : []
    setDataStudent(data2)
    setDataTeacher(data4)
    setData(data2)
    setIsLoading(false);
  };

  const changeData = (_data) => {
    if(_data === 'HS'){
      setData(dataStudent)
      setListGV(false)
    }
    else{
      setData(dataTeacher)
      setListGV(true)
    }
  }

  useEffect(() => {
    fetchData();
    return () => { };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {RenderHead(listGV, changeData, dataStudent, dataTeacher)}
      {isLoading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
          <View style={{ flex: 1 }}>
            {listGV ?
              <FlatList
                data={data}
                renderItem={({ item, index }) => <RenderItem1 item={item} index={index} />}
                keyExtractor={(item, index) => index.toString()}
                extraData={data}
              />
              :
              <FlatList
                data={data}
                renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
                keyExtractor={(item, index) => index.toString()}
                extraData={data}
              />}
          </View>
        )}
    </View>
  );
};

export default GD_ClassTab;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'black'
  },
  container: {
    backgroundColor: "#fff",
    flex: 1
  },
  tabView: {
    flex: 1
  },
  view1: {
    flexDirection: 'row', padding: 5, backgroundColor: '#2AA5FF', borderRadius: 20, paddingStart: 10, paddingEnd: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    width: 180
  }
});

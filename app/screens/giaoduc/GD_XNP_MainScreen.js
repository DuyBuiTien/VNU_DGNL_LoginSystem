import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, Platform, Linking, KeyboardAvoidingView, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { List } from 'react-native-paper';
import RadioForm from '../../modules/react-native-simple-radio-button';
import Modal from 'react-native-modal';
import { showMessage } from 'react-native-flash-message';
import DatePicker from '../../modules/react-native-datepicker'
import {RectButton} from 'react-native-gesture-handler';
import {Button} from "react-native-elements";
import ActionSheet from '../../modules/react-native-actions-sheet';

import { GD_INFO } from '../../data/GD_Data'
import { Header } from '../../components';

import { requestGET, requestPOST } from '../../services/Api';

import {RenderChonDonVi, RenderChonMucDo, RenderChonLinhVuc} from '../../components/dvc';

import moment from 'moment';
moment.locale('vi');

const GD_XNP_MainScreen = () => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.global.user);
    const [isLoading, setIsLoading] = useState(false);
    const dataService = useSelector((state) => state.global.dataService);
    const [data, setData] = useState([]);
    const [ngay, setNgay] = useState('');
    const [dataBuoiHoc, setDataBuoiHoc] = useState([
        {
          name: 'Cả ngày',
          code: '',
        },
        {
          name: 'Sáng',
          code: 'Sáng',
        },
        {
          name: 'Chiều',
          code: 'Chiều',
        },
      ]);
      const [dataLyDo, setDataLyDo] = useState([]);
    const [lyDo, setLyDo] = useState({code: '', name: ''});
    const [buoiHoc, setBuoiHoc] = useState({code: '', name: ''});
    const [typeDialog, setTypeDialog] = useState('');
    const [ghiChu, setGhiChu] = useState('');
    const refRBSheet = useRef();

    const fetchData = async () => {
        var data1 = await requestGET(`${dataService.GD_URL}/LyDoNghiHocs`)
        var data2 = data1.data ? data1.data : []
        var dataLD = []
        data2.map((i,index) => dataLD.push({name: i.TieuDe, code: i.ID}))
        setDataLyDo(dataLD)
    };

    useEffect(() => {
        fetchData();
        return () => { };
    }, []);

    const ModalHide = () => {
        refRBSheet.current.setModalVisible(false);
        setTypeDialog('');
      };

    const handleBuoiHoc = (item) => {
        ModalHide();
        setBuoiHoc(item);
      };

      const handleLyDo = (item) => {
        ModalHide();
        setLyDo(item);
      };

    const ChonBuoiHoc = () => {
        refRBSheet.current.setModalVisible(true);
        setTypeDialog('buoiHoc');
      };

      const ChonLyDo = () => {
        refRBSheet.current.setModalVisible(true);
        setTypeDialog('lyDo');
      };

      checkContent = async(_ngay, _buoiHoc, _lyDo, _ghiChu) => {
        if(!_ngay || !_lyDo ){
          showMessage('Vui lòng nhập đầy đủ thông tin')
        }
        else{
          setIsLoading(true)
                    var studentID = await AsyncStorage.getItem('studentID')
          var LopID = await AsyncStorage.getItem('LopID')
          var date = moment(_ngay).toISOString()
          var body = {'token': GD_INFO.token, 'HocSinhID': studentID, 'LopID': LopID, 'LyDoID': _lyDo, 'GhiChu': _ghiChu, 'BuoiHoc': _buoiHoc, 'Ngay': date}
          var data1 = await requestPOST(`${dataService.GD_URL}/DonXinNghiHoc`, body)
          if(data1 && data1.error.code == 200){
            setTimeout(() => {
              showMessage('Gửi đơn thành công')
              setIsLoading(false)
            }, 1000);
          }
          else{
            showMessage('Gửi đơn thất bại')
            setIsLoading(false)
          }
        }
      }


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header title="Xin nghỉ phép" isStack={true} RightComponent={() => {return(<FontAwesome onPress={() => navigation.navigate("GD_XNP_ListScreen")} name='list' color='#2E2E2E' size={24} />)}} />
            <KeyboardAvoidingView style={{ flex: 1, padding: 10}} behavior="padding" enabled   keyboardVerticalOffset={10}>
          <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{borderBottomWidth: 0.3, borderBottomColor: '#e8e8e8', margin: 5, alignSelf: 'stretch', paddingTop: 20}}>
            <Text style={{color: '#212121', paddingStart: 10}}>Ngày</Text>
            <DatePicker
              style={{width: 200, alignSelf: 'center', margin: 5}}
              date={ngay}
              locale={'vi'}
              mode="date"
              placeholder="Chọn ngày"
              confirmBtnText="Xác nhận"
              cancelBtnText="Thoát"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: 0,
                  top: 4,
                  marginRight: 0
                },
                dateInput: {
                  marginRight: 40,
                }
              }}
              onDateChange={(event, date) => setNgay(date)}
            />
          </View>
          <View style={{borderBottomWidth: 0.3, borderBottomColor: '#e8e8e8', margin: 5, alignSelf: 'stretch', paddingTop: 20}}>
            <Text style={{color: '#212121', paddingStart: 10}}>Buổi học</Text>
            <RectButton onPress={ChonBuoiHoc} style={[styles.contentChon, {backgroundColor: '#F7F7F7'}]}>
            <Text style={{color: 'gray', marginEnd: 10, fontWeight: buoiHoc.name !== '' ? 'bold' : 'normal'}} numberOfLines={1}>
              {buoiHoc.name !== '' ? buoiHoc.name : 'Chọn buổi học'}
            </Text>
            <FontAwesome
              name={buoiHoc.name === '' ? 'chevron-down' : 'times-circle'}
              color={buoiHoc.name === '' ? 'gray' : '#F26946'}
            />
          </RectButton>
          </View>
          <View style={{borderBottomWidth: 0.3, borderBottomColor: '#e8e8e8', margin: 5, alignSelf: 'stretch', paddingTop: 20}}>
            <Text style={{color: '#212121', paddingStart: 10}}>Lý do</Text>
            <RectButton onPress={ChonLyDo} style={[styles.contentChon, {backgroundColor: '#F7F7F7'}]}>
            <Text style={{color: 'gray', marginEnd: 10, fontWeight: lyDo.name !== '' ? 'bold' : 'normal'}} numberOfLines={1}>
              {lyDo.name !== '' ? lyDo.name : 'Chọn lý do'}
            </Text>
            <FontAwesome
              name={lyDo.name === '' ? 'chevron-down' : 'times-circle'}
              color={lyDo.name === '' ? 'gray' : '#F26946'}
            />
          </RectButton>
          </View>
          
          <View style={{borderBottomWidth: 0.3, borderBottomColor: '#e8e8e8', margin: 5, alignSelf: 'stretch', paddingTop: 20}}>
            <Text style={{color: '#212121', paddingStart: 10}}>Ghi chú</Text>
            <TextInput placeholderTextColor='#BDBDBD'  style={{ height: 50}} value={ghiChu} onChangeText={(text) => setGhiChu(text)}/>
          </View>
          <TouchableOpacity
                    style={{ width: '100%', backgroundColor: '#F23A27', padding: 10, marginTop: 10, borderRadius: 10 }}
                    onPress={() => checkContent(ngay, buoiHoc.code, lyDo.code, ghiChu)}>
                    {isLoading?<ActivityIndicator color="#fff" style={{textAlign: 'center' }} />:<Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#FFF' }}>Gửi</Text>}
                </TouchableOpacity>
          </ScrollView>
          </KeyboardAvoidingView>
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
        {typeDialog === 'buoiHoc' ? (
          <RenderChonMucDo
          data={dataBuoiHoc}
          handleDongY={handleBuoiHoc}
          actionSheetRef={refRBSheet}
          ModalHide={ModalHide}
          title="Chọn buổi học"
        />
        ) : typeDialog === 'lyDo' ? (
          <RenderChonMucDo
            data={dataLyDo}
            handleDongY={handleLyDo}
            actionSheetRef={refRBSheet}
            ModalHide={ModalHide}
            title="Chọn lý do"
          />
        ): (
          <></>
        )}
      </ActionSheet>
        </View>
    );
};

export default GD_XNP_MainScreen;

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
    contentChon: {
        padding: 10,
        margin: 5,
        borderRadius: 4,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      },
});

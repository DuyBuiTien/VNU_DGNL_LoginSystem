import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, Platform, Linking, TextInput } from 'react-native';
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

import { GD_INFO } from '../../data/GD_Data'
import { Header } from '../../components';

import { requestGET, requestPOST } from '../../services/Api';

import moment from 'moment';
moment.locale('vi');

const GD_GY_MainScreen = () => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.global.user);
    const [isLoading, setIsLoading] = useState(false);
    const dataService = useSelector((state) => state.global.dataService);
    const [tieuDe, setTieuDe] = useState([]);
    const [noiDung, setNoiDung] = useState('');

    useEffect(() => {

        return () => { };
    }, []);

    const GuiGopY = async (_tieuDe, _noiDung) => {
        if (!_tieuDe || !_noiDung) {
            showMessage('Vui lòng nhập đầy đủ thông tin')
        }
        else {
            setIsLoading(true)
            var NamHocID = await AsyncStorage.getItem('NamHocID')
            var TruongID = await AsyncStorage.getItem("TruongID")
            var HocKyID = await AsyncStorage.getItem("HocKyID")
            var body = { 'token': GD_INFO.token, 'truonghocid': TruongID, 'namhocid': NamHocID, 'hockyid': HocKyID, 'tieude': _tieuDe, 'noidung': _noiDung }
            var data1 = await requestPOST(`${dataService.GD_URL}/PhuHuynh_GopY`, body)
            if (data1 && data1.error.code == 200) {
                setTimeout(() => {
                    showMessage('Gửi góp ý thành công')
                    setIsLoading(false)
                    setTieuDe('')
                    setNoiDung('')
                }, 1000);
            }
            else {
                var err = data1.error ? data1.error.userMessage : "Xảy ra lỗi trong quá trình gửi"
                showMessage(err)
                setIsLoading(false)
            }
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header title="Góp ý" isStack={true} />
            <View style={{ flex: 1, padding: 10 }}>
                <Text style={{ color: '#212121', margin: 10, paddingTop: 20 }}>Tiêu đề</Text>
                <View style={{ borderWidth: 1, borderColor: '#e8e8e8', margin: 10, alignSelf: 'stretch', paddingTop: 20 }}>
                    <TextInput placeholderTextColor='#BDBDBD' style={{ height: 50 }} value={tieuDe} onChangeText={(text) => setTieuDe(text)} />
                </View>

                <Text style={{ color: '#212121', margin: 10, paddingTop: 20 }}>Nội dung</Text>
                <View style={{ borderWidth: 1, borderColor: '#e8e8e8', margin: 10, alignSelf: 'stretch' }}>
                    <TextInput placeholderTextColor='#BDBDBD' multiline={true} style={{ height: 150 }} value={noiDung} onChangeText={(text) => setNoiDung(text)} />
                </View>
                <TouchableOpacity
                    style={{ width: '100%', backgroundColor: '#F23A27', padding: 10, marginTop: 10, borderRadius: 10 }}
                    onPress={() => GuiGopY(tieuDe, noiDung)}>
                    {isLoading ? <ActivityIndicator color="#fff" style={{ textAlign: 'center' }} /> : <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#FFF' }}>Gửi</Text>}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default GD_GY_MainScreen;

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

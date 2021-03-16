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
import { Header } from '../../components';

import { requestGET, requestPOST } from '../../services/Api';

import moment from 'moment';
moment.locale('vi');

const RenderItem = (props) => {
    const { item } = props;
    var dayString = moment(item.NgayNghi, 'DD/MM/YYYY').format('dddd')
    var trangThai = item.DaDuyet ? "Đã duyệt" : "Chưa duyệt"
    var Buoi = item.BuoiHoc ? `Buổi ${item.BuoiHoc}` : "Cả ngày"
    return (
        <View style={{ margin: 10, flexDirection: 'row', alignSelf: 'stretch', borderRadius: 5, borderWidth: 0.3, borderColor: '#e8e8e8' }}>
            <View style={{ flex: 1 / 4, backgroundColor: '#FAFAFA', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                <Text style={styles.date}>{item.NgayNghi}</Text>
                <Text>{dayString}</Text>
            </View>
            <View style={{ flex: 3 / 4 }}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ padding: 5, backgroundColor: '#2AA5FF', borderRadius: 30 }}><FontAwesome name='cloud-sun' color='#fff' size={10} /></View>
                        <Text style={{ paddingStart: 10 }}>{Buoi}</Text>
                    </View>
                    <View>
                        <Text style={{ color: item.DaDuyet ? '#4CAF50' : '#f44336', fontStyle: 'italic' }}>{trangThai}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const GD_XNP_ListScreen = () => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.global.user);
    const [isLoading, setIsLoading] = useState(false);
    const dataService = useSelector((state) => state.global.dataService);
    const [data, setData] = useState([]);
    const [countDD, setCountDD] = useState(0);
    const [countCD, setCountCD] = useState(0);

    const fetchData = async () => {
        setIsLoading(true);
        var NamHocID = await AsyncStorage.getItem('NamHocID')
        var HocKyID = await AsyncStorage.getItem('HocKyID')
        var studentID = await AsyncStorage.getItem('studentID')
        var body = { 'token': GD_INFO.token, 'hocsinhid': studentID, 'namhocid': NamHocID }
        var data1 = await requestPOST(`${dataService.GD_URL}/PhuHuynh_DanhSachDonXinPhep`, body)
        var data2 = data1.data ? data1.data : []
        var dataDD = data2.filter(i => i.DaDuyet == true)
        var sum = data2.length
        var _countDD = dataDD.length
        var _countCD = sum - _countDD
        setData(data2)
        setCountCD(_countCD)
        setCountDD(_countDD)
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData()
        return () => { };
    }, []);


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header title="Danh sách nghỉ phép" isStack={true} />
            {isLoading ? (
                <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
            ) : (
                    <View style={{ flex: 1 }}>
                        <View style={{ padding: 10 }}>
                            <View style={{ flexDirection: 'row', paddingBottom: 5 }}><Text>Tổng số đơn: </Text><Text style={{ fontWeight: 'bold' }}>{data.length}</Text></View>
                            <View style={{ flexDirection: 'row' }}><Text>Đã duyệt: </Text><Text style={{ fontWeight: 'bold' }}>{countDD}</Text><Text style={{ color: '#FF9800' }}> (chưa duyệt {countCD})</Text></View>
                        </View>
                        <FlatList
                            data={data}
                            renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ padding: 10 }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                )}
        </View>
    );
};

export default GD_XNP_ListScreen;

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

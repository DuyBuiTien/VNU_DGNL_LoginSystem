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
    var day = moment(item.NgayDiemDanh).format('L')
    var dayString = moment(item.NgayDiemDanh).format('dddd')
    return (
        <View style={{ margin: 10, flexDirection: 'row', alignSelf: 'stretch', borderRadius: 5, borderWidth: 0.3, borderColor: '#e8e8e8' }}>
            <View style={{ flex: 1 / 4, backgroundColor: '#FAFAFA', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                <Text style={styles.date}>{day}</Text>
                <Text>{dayString}</Text>
            </View>
            <View style={{ flex: 3 / 4 }}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ padding: 5, backgroundColor: '#2AA5FF', borderRadius: 30 }}><FontAwesome name='cloud-sun' color='#fff' size={10} /></View>
                        <Text style={{ paddingStart: 10 }}>Buổi {item.BuoiHoc}</Text>
                    </View>
                    <View>
                        <Text style={{ color: '#4CAF50', fontStyle: 'italic' }}>{item.TrangThaiDiemDanh}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const GD_DD_MainScreen = () => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.global.user);
    const [isLoading, setIsLoading] = useState(false);
    const dataService = useSelector((state) => state.global.dataService);
    const [data, setData] = useState([]);
    const [countNNCP, setCountNNCP] = useState(0);
    const [countNNKP, setCountNNKP] = useState(0);
    const [countNDM, setCountNDM] = useState(0);

    const fetchData = async () => {
        setIsLoading(true);
        var NamHocID = await AsyncStorage.getItem('NamHocID')
        var HocKyID = await AsyncStorage.getItem('HocKyID')
        var studentID = await AsyncStorage.getItem('studentID')
        var body = { 'token': GD_INFO.token, 'HocSinhID': studentID, 'NamHocID': NamHocID }
        var data1 = await requestPOST(`${dataService.GD_URL}/DiemDanhHocSinh`, body)
        var data2 = data1.data ? data1.data : []
        var _countNNCP = 0
        var _countNNKP = 0
        var _countNDM = 0
        data2.forEach(i => {
            if (i.TrangThaiDiemDanhID == 19) {
                _countNNCP++
            }
            if (i.TrangThaiDiemDanhID == 20) {
                _countNNKP++
            }
            if (i.TrangThaiDiemDanhID == 21) {
                _countNDM++
            }
        });
        console.log(data2)
        setData(data2)
        setCountNNCP(_countNNCP)
        setCountNNKP(_countNNKP)
        setCountNDM(_countNDM)
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData()
        return () => { };
    }, []);


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header title="Thời khoá biểu" isStack={true} />
            {isLoading ? (
                <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
            ) : (
                    <View style={{ flex: 1 }}>
                        <View style={{ padding: 10 }}>
                            <View style={{ flexDirection: 'row', paddingBottom: 5 }}><Text>Tổng số ngày đi học: </Text><Text style={{ fontWeight: 'bold' }}>{data.length}</Text></View>
                            <View style={{ flexDirection: 'row', paddingBottom: 5 }}><Text>Số ngày nghỉ: </Text><Text style={{ fontWeight: 'bold' }}>{countNNCP + countNNKP}</Text><Text style={{ color: '#FF9800' }}> (không phép {countNNKP})</Text></View>
                            <View style={{ flexDirection: 'row', paddingBottom: 5 }}><Text>Số ngày đi muộn: </Text><Text style={{ fontWeight: 'bold' }}>{countNDM}</Text></View>
                        </View>
                        <FlatList
                            data={data}
                            renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ padding: 10 }}
                        />
                    </View>
                )}
        </View>
    );
};

export default GD_DD_MainScreen;

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

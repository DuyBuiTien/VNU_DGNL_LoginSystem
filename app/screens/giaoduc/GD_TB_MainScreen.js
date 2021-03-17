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

const RenderItem1 = (props) => {
    const { item } = props;
    var date = moment(item.NgayThongBao).format('L')
    return (
        <View style={{ marginTop: 10, backgroundColor: '#f7f7f7', padding: 10, flexDirection: 'row', borderRadius: 5, justifyContent: 'space-between' }}>
            <View style={{ height: 30, width: 30, borderRadius: 30, backgroundColor: '#2AA5FF', justifyContent: 'center', alignItems: 'center' }}><FontAwesome name='bell' color='#fff' size={14} /></View>
            <View style={{ flex: 1, paddingStart: 10 }}>
                <Text style={{ fontSize: 14, color: 'black' }}>{item.TieuDe}</Text>
                <Text style={{ color: '#757575' }}>{item.NoiDung}</Text>
                <Text style={{ textAlign: 'right', fontStyle: 'italic', color: '#757575', fontSize: 12, paddingTop: 5 }}>{date}</Text>
            </View>
        </View>
    )
}

const RenderItem = (props) => {
    const { item } = props;
    return (
        <View>
            <Text style={{ textAlign: 'center', padding: 5, color: 'black' }}>{item.LoaiThongBao}</Text>
            <FlatList
                data={item.data}
                renderItem={({ item, index }) => <RenderItem1 item={item} index={index} />}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const GD_TB_MainScreen = () => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.global.user);
    const [isLoading, setIsLoading] = useState(false);
    const dataService = useSelector((state) => state.global.dataService);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        setIsLoading(true);
        var NamHocID = await AsyncStorage.getItem('NamHocID')
        var HocKyID = await AsyncStorage.getItem('HocKyID')
        var studentID = await AsyncStorage.getItem('studentID')
        var body = { 'token': GD_INFO.token, 'HocSinhID': studentID, 'NamHocID': NamHocID }
        var data1 = await requestPOST(`${dataService.GD_URL}/ThongBao`, body)
        var data2 = data1.data ? data1.data : []
        setData(data2)
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData()
        return () => { };
    }, []);


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header title="Thông báo" isStack={true} />
            {isLoading ? (
                <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
            ) : (
                    <View style={{ flex: 1 }}>
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

export default GD_TB_MainScreen;

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

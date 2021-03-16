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
    return (
        <View>
            <Text style={{ textAlign: 'center', padding: 10, fontWeight: 'bold', fontSize: 16 }}>Thứ {item.Thu}</Text>
            <FlatList
                data={item.List}
                renderItem={({ item, index }) => <RenderItem1 item={item} index={index} />}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const RenderItem1 = (props) => {
    const { item } = props;
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, borderBottomColor: '#e8e8e8', borderBottomWidth: 1, padding: 5 }}>
            <Text>Tiết {item.TietHoc}</Text>
            <Text>{item.MonHoc}</Text>
        </View>
    )
}

const GD_TKB_MainScreen = () => {
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
        var body = { 'token': GD_INFO.token, 'HocSinhID': studentID, 'NamHocID': NamHocID, 'HocKyID': HocKyID }
        var data1 = await requestPOST(`${dataService.GD_URL}/ThoiKhoaBieu`, body)
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
            <Header title="Thời khoá biểu" isStack={true} />
            {isLoading ? (
                <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
            ) : (
                    <View style={{ flex: 1 }}>
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

export default GD_TKB_MainScreen;

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

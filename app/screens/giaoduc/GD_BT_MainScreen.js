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

const GD_BT_MainScreen = () => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.global.user);
    const [isLoading, setIsLoading] = useState(false);
    const dataService = useSelector((state) => state.global.dataService);

    useEffect(() => {

        return () => { };
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header title="Góp ý" isStack={true} />
            <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.navigate('GD_BT_TK_MainScreen')} style={styles.view1}>
              <FontAwesome name='chart-bar' color='#73809B' size={30} style={{padding: 10}}/>
              <Text style={styles.text1}>Thống kê</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('GD_BT_DK_MainScreen')} style={styles.view1}>
              <FontAwesome name='clipboard-list' color='#73809B' size={30} style={{padding: 10}}/>
              <Text style={styles.text1}>Đăng ký</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('GD_BT_HDK_MainScreen')}  style={styles.view1}>
              <FontAwesome name='eject' color='#73809B' size={30} style={{padding: 10}}/>
              <Text style={styles.text1}>Huỷ đăng ký</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

export default GD_BT_MainScreen;

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

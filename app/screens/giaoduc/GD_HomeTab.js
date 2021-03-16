import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import RadioForm from '../../modules/react-native-simple-radio-button';

import { GD_INFO } from '../../data/GD_Data'

import { requestGET, requestPOST } from '../../services/Api';

import moment from 'moment';
moment.locale('vi');

const RenderItem = (props) => {
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

const RenderItem1 = (props) => {
    const { item } = props;
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10, borderBottomColor: '#e8e8e8', borderBottomWidth: 1, padding: 5 }}>
            <Text>Tiết {item.TietHoc}</Text>
            <Text>{item.MonHoc}</Text>
        </View>
    )
}

const RenderItem2 = (props) => {
    const { item } = props;
    var data = item.data ? item.data : []
    var data1 = data.slice(0, 3)
    return (
        <View>
            <Text style={{ textAlign: 'center', padding: 5, color: 'black' }}>{item.LoaiThongBao}</Text>
            <FlatList
                data={data1}
                renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
                keyExtractor={(item, index) => index.toString()}

            />
        </View>
    )
}

const renderModalContent = (setVisibleModal, setDayTong, setValue, dataDay, value) => {
    return (
        <View style={styles.content}>
            <RadioForm
                radio_props={dataDay}
                initial={-1}
                onPress={(value) => { setValue(value) }}
                buttonSize={15}
                buttonWrapStyle={{ padding: 20 }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch', paddingTop: 20 }}>

                <TouchableOpacity onPress={() => { setVisibleModal(false) }}>
                    <Text style={{ fontSize: 14, color: '#2089dc', fontWeight: 'bold' }}>ĐÓNG</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setDayTong(value) }}>
                    <Text style={{ fontSize: 14, color: '#66BB6A', fontWeight: '600' }}>CHỌN</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const GD_HomeTab = () => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.global.user);
    const [isLoading, setIsLoading] = useState(false);
    const dataService = useSelector((state) => state.global.dataService);
    const [dataNoti, setDataNoti] = useState([]);
    const [dataTKBs, setDataTKBs] = useState([]);
    const [dataDay, setDataDay] = useState([]);
    const [day, setDay] = useState('');
    const [dataTKB, setDataTKB] = useState([]);
    const [data, setData] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [value, setValue] = useState('');

    const setDayTong = (value) => {
        dataTKBs.map((i) => {
            if (Number(i.Thu) == value) {
                setDataTKB(i.List)
                setDay(`Thứ ${value}`)
                setVisibleModal(false)
            }
        })
    }


    const fetchData = async () => {
        setIsLoading(true);
        var NamHocID = await AsyncStorage.getItem('NamHocID')
        var HocKyID = await AsyncStorage.getItem('HocKyID')
        var studentID = await AsyncStorage.getItem('studentID')
        var body = { 'token': GD_INFO.token, 'HocSinhID': studentID, 'NamHocID': NamHocID }
        var data1 = await requestPOST(`${dataService.GD_URL}/ThongBao`, body)
        var data2 = data1.data ? data1.data : []
        var body1 = { 'token': GD_INFO.token, 'HocSinhID': studentID, 'NamHocID': NamHocID, 'HocKyID': HocKyID }
        var data3 = await requestPOST(`${dataService.GD_URL}/ThoiKhoaBieu`, body1)
        var data4 = data3.data ? data3.data : []
        var dataDay = []
        data4.forEach(i => {
            dataDay.push({ label: `Thứ ${i.Thu}`, value: Number(i.Thu) })
        });
        setDataNoti(data2)
        setDataTKBs(data4)
        setDataDay(dataDay)
        setDataTKB(data4.length > 0 ? data4[0].List : [])
        setDay(dataDay.length > 0 ? dataDay[0].label : '')
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
        return () => { };
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
            ) : (
                    <View style={{ padding: 20, flex: 1 }}>
                        <Text style={{ fontSize: 20, color: 'black' }}>Thông báo mới nhất</Text>
                        <FlatList
                            data={dataNoti}
                            renderItem={({ item, index }) => <RenderItem2 item={item} index={index} />}
                            keyExtractor={(item, index) => index.toString()}

                        />
                        <Text style={{ fontSize: 20, paddingTop: 20, paddingBottom: 20, color: 'black' }}>Thời khoá biểu</Text>
                        {dataTKBs.length > 0 ?
                            <TouchableOpacity onPress={() => setVisibleModal(true)} style={{ width: 150, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', padding: 5, borderColor: '#e8e8e8', borderWidth: 1, borderRadius: 5, alignSelf: 'center' }}>
                                <Text>{day}    </Text>
                                <FontAwesome name='angle-down' size={24} />
                            </TouchableOpacity>
                            : <></>}
                        <FlatList
                            data={dataTKB}
                            renderItem={({ item, index }) => <RenderItem1 item={item} index={index} />}
                            keyExtractor={(item, index) => index.toString()}

                        />
                        <Modal
                            backdropTransitionOutTiming={0}
                            isVisible={visibleModal}
                            style={{ margin: 0 }}
                            hideModalContentWhileAnimating={true}>
                            {renderModalContent(setVisibleModal, setDayTong, setValue, dataDay, value)}
                        </Modal>
                    </View>
                )}
        </View>
    );
};

export default GD_HomeTab;

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

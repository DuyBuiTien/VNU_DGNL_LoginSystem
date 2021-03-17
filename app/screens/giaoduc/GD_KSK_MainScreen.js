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
import { showMessage } from 'react-native-flash-message';
import DatePicker from '../../modules/react-native-datepicker'

import { GD_INFO } from '../../data/GD_Data'
import { Header } from '../../components';

import { requestGET, requestPOST } from '../../services/Api';

import moment from 'moment';
moment.locale('vi');

const RenderItem = (props) => {
    const { item } = props;
    var day = moment(item.NgayKham).format('DD/MM/YYYY')
    var dayString = moment(day, 'DD/MM/YYYY').format('dddd')
    return (
        <View style={{ margin: 10, flexDirection: 'row', alignSelf: 'stretch', borderRadius: 5, borderWidth: 0.3, borderColor: '#e8e8e8' }}>
            <View style={{ flex: 1 / 4, backgroundColor: '#FAFAFA', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                <Text style={styles.date}>{day}</Text>
                <Text>{dayString}</Text>
            </View>
            <View style={{ flex: 3 / 4 }}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: 10 }}>
                    <View style={{ flexDirection: 'row', flex: 1 / 2 }}>
                        <View style={{ padding: 5, backgroundColor: '#2AA5FF', borderRadius: 30 }}><FontAwesome name='weight' color='#fff' size={10} /></View>
                        <Text style={{ paddingStart: 10 }}>{item.CanNang} kg</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1 / 2 }}>
                        <View style={{ padding: 5, backgroundColor: '#2AA5FF', borderRadius: 30 }}><FontAwesome name='ruler-vertical' color='#fff' size={10} /></View>
                        <Text style={{ paddingStart: 10 }}>{item.ChieuCao}</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: 10 }}>
                    <View style={{ flexDirection: 'row', flex: 1 / 2 }}>
                        <View style={{ padding: 5, backgroundColor: '#2AA5FF', borderRadius: 30 }}><FontAwesome name='notes-medical' color='#fff' size={10} /></View>
                        <Text style={{ paddingStart: 10 }}>{item.TheTrang}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1 / 2 }}>
                        <View style={{ padding: 5, backgroundColor: '#2AA5FF', borderRadius: 30 }}><FontAwesome name='info-circle' color='#fff' size={10} /></View>
                        <Text style={{ paddingStart: 10 }}>{item.ThongTinKhac}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const GD_KSK_MainScreen = () => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.global.user);
    const [isLoading, setIsLoading] = useState(false);
    const dataService = useSelector((state) => state.global.dataService);
    const [data, setData] = useState([]);
    const [tuNgay, setTuNgay] = useState('');
    const [denNgay, setDenNgay] = useState('');

    useEffect(() => {

        return () => { };
    }, []);

    const TimKiem = async (_tuNgay, _denNgay) => {
        if (!_tuNgay || !_denNgay) {
            showMessage('Vui lòng nhập đầy đủ thông tin')
        }
        else {
            setIsLoading(true)
            setData([])
            var studentID = await AsyncStorage.getItem('studentID')
            var _tuNgay = moment(_tuNgay).format('YYYY-MM-DD')
            var _denNgay = moment(_denNgay).format('YYYY-MM-DD')
            var body = { 'token': GD_INFO.token, 'HocSinhID': studentID, 'tuNgay': _tuNgay, 'denNgay': _denNgay }
            var data1 = await requestPOST(`${dataService.GD_URL}/SucKhoeHocSinh`, body)
            var data2 = data1.data ? data1.data : []
            if (data2.length < 1) {
                showMessage('Không tìm thấy kết quả')
            }
            setIsLoading(false)
            setData(data2)
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header title="Khám sức khoẻ" isStack={true} />
            <View style={{ flex: 1, padding: 10 }}>
                <View style={{ borderBottomWidth: 0.3, borderBottomColor: '#e8e8e8', margin: 5, alignSelf: 'stretch', paddingTop: 20 }}>
                    <Text style={{ color: '#212121', paddingStart: 10 }}>Từ ngày</Text>
                    <DatePicker
                        style={{ width: 200, alignSelf: 'center', margin: 5 }}
                        date={tuNgay}
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
                        onDateChange={(event, date) => setTuNgay(date)}
                    />
                </View>
                <View style={{ borderBottomWidth: 0.3, borderBottomColor: '#e8e8e8', margin: 5, alignSelf: 'stretch', paddingTop: 20 }}>
                    <Text style={{ color: '#212121', paddingStart: 10 }}>Đến ngày</Text>
                    <DatePicker
                        style={{ width: 200, alignSelf: 'center', margin: 5 }}
                        date={denNgay}
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
                        onDateChange={(event, date) => setDenNgay(date)}
                    />
                </View>
                <TouchableOpacity
                    style={{ width: '100%', backgroundColor: '#F23A27', padding: 10, marginTop: 10, borderRadius: 10 }}
                    onPress={() => TimKiem(tuNgay, denNgay)}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#FFF' }}>Tìm kiếm</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, marginTop: 10 }}>
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
                    ) : (
                            <FlatList
                                data={data}
                                renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={data}
                            />
                        )}
                </View>
            </View>
        </View>
    );
};

export default GD_KSK_MainScreen;

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

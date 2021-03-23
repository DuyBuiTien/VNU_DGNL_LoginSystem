/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator, FlatList, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { requestPOST_NETVIEW } from '../../services/Api';
import { requestGET_AIC, requestPOST_AIC } from '../../services/Api';
import { SearchComponent } from '../../components/common';

import { Header } from '../../components';
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi')

const AL_MainScreen = () => {
    const navigation = useNavigation();
    const dataService = useSelector((state) => state.global.dataService);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});

    const fetchData = async () => {
        setIsLoading(true)
        var today = moment().format('YYYY-MM-DD')
        var data1 = await requestGET_AIC(`${dataService.AIC_URL}/cultures/horoscopes/search?date=${today}`)
        var data2 = data1.data ? data1.data : {}
        if (data2.length > 0) {
            setData(data2[0].data)
        }
        setIsLoading(false)
    };

    useEffect(() => {
        fetchData();
        return () => { };
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF8E1' }}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
            ) : (
                    <ScrollView style={{ flexGrow: 1 }}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 5,
                            height: 150,
                            backgroundColor: '#ef5350',
                            borderBottomLeftRadius: 50,
                            borderBottomRightRadius: 50,
                        }}>
                            <FontAwesome onPress={() => navigation.goBack()} name="chevron-left" s color="#fff" size={25} style={{position: 'absolute', left: 20, top: 40}} />
                            <View style={{
                                backgroundColor: '#fff',
                                borderRadius: 5,
                                marginBottom: -120,
                                shadowOpacity: 0.2,
                                shadowRadius: 5,
                                shadowColor: '#000',
                                shadowOffset: { height: 0, width: 0 },
                            }}>
                                <View style={{ backgroundColor: '#e53935', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5 }}>
                                    <FontAwesome name="circle" s color="#FAFAFA" size={6} style={{}} />
                                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>ÂM LỊCH</Text>
                                    <FontAwesome name="circle" color="#FAFAFA" size={6} style={{}} />
                                </View>
                                <View style={{ paddingHorizontal: 25, paddingTop: 5, paddingBottom: 30, alignItems: 'center', }}>
                                    <Text style={{ fontSize: 12 }}>{data.am_lich.la_so.ngay}</Text>
                                    <Text style={{ fontSize: 50, fontWeight: 'bold' }}>{data.am_lich.ngay}</Text>
                                    <Text style={{ fontSize: 12 }}>{data.am_lich.thang_nam_text.split('(')[0]}</Text>
                                </View>

                            </View>
                        </View>
                        <View style={{paddingTop: 100, alignItems: 'center'}}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>LÁ SỐ TỬ VI MỖI NGÀY</Text>
                            <View style={{paddingTop: 20, flexDirection: 'row'}}>
                                <Text style={{ fontWeight: '600' }}>Dương lịch: </Text>
                                <Text style={{  }}> {data.duong_lich.thu}, {data.duong_lich.ngay} {data.duong_lich.thang_nam_text}</Text>
                            </View>
                            <View style={{paddingTop: 5, flexDirection: 'row'}}>
                                <Text style={{ fontWeight: '600' }}>Âm lịch: </Text>
                                <Text style={{  }}> {data.am_lich.ngay} {data.am_lich.thang_nam_text}</Text>
                            </View>
                        </View>

                        <View style={{marginVertical: 10, borderLeftColor: '#c62828', borderLeftWidth: 5, marginTop: 20, paddingVertical: 5}}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: 20 }}>Lá số</Text>
                        </View>
                        <Text style={{ paddingLeft: 25 }}>Ngày {data.am_lich.la_so.ngay}, tháng {data.am_lich.la_so.thang}, trực {data.am_lich.la_so.truc}</Text>
                        <View style={{marginVertical: 10, borderLeftColor: '#c62828', borderLeftWidth: 5, marginTop: 20, paddingVertical: 5}}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: 20 }}>Giờ hoàng đạo</Text>
                        </View>
                        <Text style={{ paddingLeft: 25 }}>{data.am_lich.la_so.gio_hoang_dao.map((i) => i)}</Text>
                        <View style={{marginVertical: 10, borderLeftColor: '#c62828', borderLeftWidth: 5, marginTop: 20, paddingVertical: 5}}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: 20 }}>Hướng xuất hành</Text>
                        </View>
                        <Text style={{ paddingLeft: 25 }}>{data.am_lich.la_so.huong_xuat_hanh}</Text>
                        <View style={{marginVertical: 10, borderLeftColor: '#c62828', borderLeftWidth: 5, marginTop: 20, paddingVertical: 5}}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: 20 }}>Tuổi xung khắc</Text>
                        </View>
                        <Text style={{ paddingLeft: 25 }}>{data.am_lich.la_so.tuoi_xung_khac}</Text>
                        <View style={{marginVertical: 10, borderLeftColor: '#c62828', borderLeftWidth: 5, marginTop: 20, paddingVertical: 5}}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: 20 }}>Những điều nên và không nên</Text>
                        </View>
                        <View style={{flexDirection: 'row', paddingLeft: 25}}>
                            <Text style={{fontWeight: '600', width: 120}}>Việc có thể làm: </Text>
                            <Text style={{flex: 1}}>{data.am_lich.la_so.co_the_lam}</Text>
                        </View>
                        <View style={{flexDirection: 'row', paddingLeft: 25, paddingTop: 10}}>
                            <Text style={{fontWeight: '600', width: 120}}>Việc hạn chế: </Text>
                            <Text style={{flex: 1}}>{data.am_lich.la_so.han_che}</Text>
                        </View>
                        <View style={{marginVertical: 10, borderLeftColor: '#c62828', borderLeftWidth: 5, marginTop: 20, paddingVertical: 5}}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: 20 }}>Sao tốt</Text>
                        </View>
                        <Text style={{ paddingLeft: 25 }}>{data.am_lich.la_so.sao_tot}</Text>
                    </ScrollView>
                )}
        </View>
    );
};

export default AL_MainScreen;

const styles = StyleSheet.create({

});

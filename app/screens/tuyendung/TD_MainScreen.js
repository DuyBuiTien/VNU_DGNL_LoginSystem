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


const RenderItem = (props) => {
    const { item, navigation, index } = props;
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('TD_DetailScreen', { id: item.id, title: item.job })}
            style={{
                flex: 1,
                marginVertical: 10,
                padding: 10,
                backgroundColor: '#FFFFFF',
                flexDirection: 'row',
                borderRadius: 10,
                alignItems: 'flex-start',
                borderColor: '#616161', 
                borderWidth: 0.3
            }}>
            <Image resizeMode='cover' source={item.cover_url ? { uri: item.cover_url } : require('../../Images/tuyen-dung.png')} style={{ width: 60, height: 60, borderRadius: 60 }} />
            <View style={{ paddingLeft: 10, flex: 1 }}>
                <Text style={{ color: '#2196F3' }}>{item.company}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16, paddingTop: 10 }}>{item.job}</Text>
                <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                    <FontAwesome name='clock' color='#757575' size={15} style={{ paddingRight: 5 }} />
                    <Text style={{ color: '#757575', fontSize: 12 }}>{item.application_deadline}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                    <FontAwesome name='coins' color='#757575' size={15} style={{ paddingRight: 5 }} />
                    <Text style={{ color: '#757575', fontSize: 12 }}>{item.wage}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};


const TD_MainScreen = () => {
    const navigation = useNavigation();
    const token = useSelector((state) => state.diemtin.token);
    const dataService = useSelector((state) => state.global.dataService);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const fetchData = async () => {
        setIsLoading(true)
        var data1 = await requestGET_AIC(`${dataService.AIC_URL}/recruitments/?keyword=`)
        var data2 = data1.data ? data1.data : []
        setData(data2)
        setIsLoading(false)
    };

    useEffect(() => {
        fetchData();
        return () => { };
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header title="Tin tuyển dụng" isStack={true} />
            <SearchComponent placeholder="Tìm kiếm công việc" value={inputValue} onChangeText={setInputValue} />
            {isLoading ? (
                <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
            ) : (
                    <View style={{ flex: 1 }}>
                        <FlatList
                            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            data={data.filter((item) => {
                                const name = item.job.toUpperCase();
                                return name.indexOf(inputValue.toUpperCase()) > -1;
                            })}
                            renderItem={({ item, index }) => (
                                <RenderItem item={item} navigation={navigation} />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={() => (
                                <Text style={{ textAlign: 'center', color: '#50565B', marginTop: 10 }}>Không có kết quả</Text>
                            )}
                        />
                    </View>
                )}
        </View>
    );
};

export default TD_MainScreen;

const styles = StyleSheet.create({
    tabView: {
        flex: 1
    },
});

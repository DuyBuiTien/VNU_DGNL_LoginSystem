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
    const { data, navigation, histories } = props;
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('DNNDT_CSDLLDetailScreen', {
                    id: data.id,
                    title: data.name
                });
            }}
            style={{
                flexDirection: 'row',
                borderRadius: 5,
                justifyContent: 'space-between',
                alignItems: 'flex-start',
            }}>
            <FontAwesome name="file-alt" color="#f44336" size={30} />
            <View
                style={{
                    flex: 1,
                    marginTop: 0,
                    borderBottomColor: '#e8e8e8',
                    borderBottomWidth: 1,
                    margin: 20,
                }}>

                <Text style={{ fontWeight: '600', flex: 1, lineHeight: 20 }}>
                    {data.name ? data.name : ''}
                </Text>
                <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
                    <Text style={{ color: '#1976D2', paddingRight: 20, fontSize: 12, fontWeight: '600' }}>{data.code}</Text>
                    <Text style={{ color: '#9E9E9E', fontSize: 12, fontWeight: '600' }}>{data.created_at}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};


const DNNDT_CSDLLScreen = () => {
    const navigation = useNavigation();
    const token = useSelector((state) => state.diemtin.token);
    const dataService = useSelector((state) => state.global.dataService);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const fetchData = async () => {
        setIsLoading(true)
        var data1 = await requestGET_AIC(`${dataService.AIC_URL}/law_database?offset=0&keyword=`)
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
            <Header title="Cơ sở dữ liệu luật" isStack={true} />
            <SearchComponent value={inputValue} onChangeText={setInputValue} />
            {isLoading ? (
                <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
            ) : (
                    <View style={{ flex: 1, paddingHorizontal: 20 }}>
                        <View style={{ borderBottomColor: '#616161', borderBottomWidth: 0.3 }}>
                            <View style={{ borderBottomColor: '#03a9f4', borderBottomWidth: 4, width: 100 }}>
                                <Text style={{ paddingVertical: 10 }}>
                                    {data.filter((item) => {
                                        const name = item.name.toUpperCase();
                                        return name.indexOf(inputValue.toUpperCase()) > -1;
                                    }).length} kết quả
                            </Text>
                            </View>
                        </View>
                        <FlatList
                            contentContainerStyle={{ flexGrow: 1, paddingVertical: 10 }}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            data={data.filter((item) => {
                                const name = item.name.toUpperCase();
                                return name.indexOf(inputValue.toUpperCase()) > -1;
                            })}
                            renderItem={({ item, index }) => (
                                <RenderItem data={item} navigation={navigation} />
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

export default DNNDT_CSDLLScreen;

const styles = StyleSheet.create({
    tabView: {
        flex: 1
    },
});

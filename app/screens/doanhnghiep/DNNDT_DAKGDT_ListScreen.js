/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator, FlatList, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { requestGET_AIC } from '../../services/Api';

import { Header } from '../../components';
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi')

import { SearchComponent } from '../../components/common';

const RenderItem = (props) => {
    const { item, navigation, index } = props;
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('DNNDT_DAKGDT_DetailScreen', { id: item.id, title: item.title })}
            style={{
                marginVertical: 10,
                backgroundColor: '#FFFFFF',
                flexDirection: 'column',
                borderRadius: 10,
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                shadowOpacity: 0.2,
                shadowRadius: 2,
                shadowColor: '#000',
                shadowOffset: { height: 0, width: 0 },
            }}>
            <ImageBackground resizeMode='cover' source={item.cover_url ? { uri: item.cover_url } : require('../../Images/nn1.jpg')} imageStyle={{ borderRadius: 10 }} style={{ borderRadius: 5, height: 200, width: '100%' }} />
            <View style={{ flex: 1, marginLeft: 10, padding: 10, alignSelf: 'stretch' }}>
                <Text style={{ color: '#BDBDBD', fontWeight: '600'}}>{item.category.toUpperCase()}</Text>
                <View style={{ paddingVertical: 10 }}>
                    <Text numberOfLines={2} style={{ fontSize: 16, flex: 1, fontWeight: '600' }}>{item.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const DNNDT_DAKGDT_ListScreen = () => {
    const navigation = useNavigation();
    const token = useSelector((state) => state.diemtin.token);
    const dataService = useSelector((state) => state.global.dataService);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const route = useRoute();
    const { id, title } = route.params;

    const fetchData = async () => {
        setIsLoading(true);
        var data1 = await requestGET_AIC(`${dataService.AIC_URL}/agencies/articles?category=${id}&invest_form_id=&investment_from=&investment_to=&completion=&keyword=&offset=0`)
        var data2 = data1.data ? data1.data : []
        setData(data2)
        setIsLoading(false)
    };

    useEffect(() => {
        fetchData()
        return () => { };
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header title={title} isStack={true} />
            <SearchComponent value={inputValue} onChangeText={setInputValue} />
            {isLoading ? (
                <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
            ) : (
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={data.filter((item) => {
                                const name = item.title.toUpperCase();
                                return name.indexOf(inputValue.toUpperCase()) > -1;
                            })}
                            renderItem={({ item, index }) => <RenderItem item={item} index={index} navigation={navigation} />}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={data}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{padding: 20}}
                        />
                    </View>
                )}
        </View>
    );
};

export default DNNDT_DAKGDT_ListScreen;

const styles = StyleSheet.create({

});

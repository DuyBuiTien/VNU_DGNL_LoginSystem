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


const RenderItem = (props) => {
    const { item, navigation, index } = props;
    return (
        <TouchableOpacity onPress={() => navigation.navigate('DNNDT_TTTTLDDetailScreen', { id: item.id, title: item.title })} style={{ padding: 10, paddingHorizontal: 20, flexDirection: 'column', borderRadius: 5, justifyContent: 'space-between', alignItems: 'flex-start' }}>

            <ImageBackground resizeMode='cover' source={item.cover_url ? { uri: item.cover_url } : require('../../Images/nn1.jpg')} imageStyle={{ borderRadius: 10 }} style={{ borderRadius: 5, height: 200, width: '100%' }} />
            <View style={{ flex: 1, marginLeft: 0, borderBottomColor: '#e8e8e8', borderBottomWidth: 0, paddingBottom: 10, alignSelf: 'stretch' }}>
                <Text style={{ color: '#FF5722', fontSize: 12, fontWeight: '600', paddingTop: 10}}>Thông tin thị trường lao động</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
                    <Text style={{ color: '#757575', fontSize: 12 }}>{item.published_at}</Text>
                    <FontAwesome name='dot-circle' color='#757575' size={8} style={{ marginHorizontal: 10 }} />
                    <Text style={{ color: '#757575', fontSize: 12 }}>{item.view_quantity} lượt xem</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                    <Text numberOfLines={2} style={{ fontSize: 16, flex: 1, fontWeight: '600' }}>{item.title}</Text>
                </View>
                <Text numberOfLines={3} style={{ flex: 1}}>{item.content}</Text>
            </View>
        </TouchableOpacity>
    );
};

const RenderItem1 = (props) => {
    const { item, navigation, index } = props;
    return (
        <TouchableOpacity onPress={() => navigation.navigate('DNNDT_TTTTLDDetailScreen', { id: item.id, title: item.title })} style={{ padding: 10, paddingHorizontal: 20, }}>
            <View style={{ flex: 1, marginLeft: 0, borderBottomColor: '#e8e8e8', borderBottomWidth: 1, paddingBottom: 10, alignSelf: 'stretch' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}><Text numberOfLines={2} style={{ fontSize: 16, flex: 1, paddingRight: 10, fontWeight: '600' }}>{item.title}</Text></View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#757575', fontSize: 12 }}>{item.published_at}</Text>
                    <FontAwesome name='dot-circle' color='#757575' size={8} style={{ marginHorizontal: 10 }} />
                    <Text style={{ color: '#757575', fontSize: 12 }}>{item.view_quantity} lượt xem</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const RightComponent = (props) => {
    const { isList, setIsList } = props;
    return (
        <FontAwesome onPress={() => setIsList(!isList)} name={isList ? 'list' : 'image'} color='#2E2E2E' size={24} />
    )
}


const DNNDT_TTTTLDScreen = () => {
    const navigation = useNavigation();
    const token = useSelector((state) => state.diemtin.token);
    const dataService = useSelector((state) => state.global.dataService);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [isList, setIsList] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        var data1 = await requestGET_AIC(`${dataService.AIC_URL}/cultures/search?categories=Th%C3%B4ng%20tin%20th%E1%BB%8B%20tr%C6%B0%E1%BB%9Dng%20lao%20%C4%91%E1%BB%99ng`)
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
            <Header title="Thông tin thị trường lao động" isStack={true} RightComponent={() => <RightComponent setIsList={setIsList} isList={isList} />} />
            {isLoading ? (
                <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
            ) : (
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={data}
                            renderItem={({ item, index }) => isList ? <RenderItem1 item={item} index={index} navigation={navigation} /> : <RenderItem item={item} index={index} navigation={navigation} />}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={data}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                )}
        </View>
    );
};

export default DNNDT_TTTTLDScreen;

const styles = StyleSheet.create({

});

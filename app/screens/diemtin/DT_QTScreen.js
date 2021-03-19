/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator, FlatList, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { requestPOST_NETVIEW } from '../../services/Api';

import { Header } from '../../components';
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi')


const RenderItem = (props) => {
    const { item, navigation, index } = props;
    return (
        <TouchableOpacity onPress={() => navigation.navigate('DT_DetailScreen', { item: item })} style={{ padding: 10, paddingHorizontal: 20, flexDirection: index<3?'column':'row', borderRadius: 5, justifyContent: 'space-between', alignItems: 'flex-start' }}>

            <ImageBackground resizeMode='cover' source={item.image_sources?{ uri: item.image_sources[0] }:require('../../Images/nn1.jpg')} imageStyle={{borderRadius: 10}} style={{ borderRadius: 5, height: index<3?200:100, width: index<3?'100%':100 }} />
            <View style={{ flex: 1, marginLeft: index<3?0:10, borderBottomColor: '#e8e8e8', borderBottomWidth: index<3?0:1, paddingBottom: 10, alignSelf: 'stretch' }}>
                <Image resizeMode='cover' source={{ uri: item.icon_url }} style={{ borderRadius: 5, height: 30, width: 30, marginTop: index<3?10:0 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}><Text numberOfLines={2} style={{ fontSize: 16, flex: 1, paddingRight: 10, fontWeight: '600' }}>{item.title}</Text></View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#757575', fontSize: 12 }}>{moment(item.published_timestamp).fromNow()}</Text>
                    <FontAwesome name='dot-circle' color='#757575' size={8} style={{ marginHorizontal: 10 }} />
                    <Text style={{ color: '#757575', fontSize: 12 }}>{item.author_display_name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const RenderItem1 = (props) => {
    const { item, navigation, index } = props;
    return (
        <TouchableOpacity onPress={() => navigation.navigate('DT_DetailScreen', { url: item })} style={{ padding: 10, paddingHorizontal: 20,}}>
            <View style={{ flex: 1, marginLeft: 0, borderBottomColor: '#e8e8e8', borderBottomWidth: 1, paddingBottom: 10, alignSelf: 'stretch' }}>
                <Image resizeMode='cover' source={{ uri: item.icon_url }} style={{ borderRadius: 5, height: 30, width: 30 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}><Text numberOfLines={2} style={{ fontSize: 16, flex: 1, paddingRight: 10, fontWeight: '600' }}>{item.title}</Text></View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#757575', fontSize: 12 }}>{moment(item.published_timestamp).fromNow()}</Text>
                    <FontAwesome name='dot-circle' color='#757575' size={8} style={{ marginHorizontal: 10 }} />
                    <Text style={{ color: '#757575', fontSize: 12 }}>{item.author_display_name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const RightComponent = (props) => {
    const { isList, setIsList } = props;
    return (
        <FontAwesome onPress={() => setIsList(!isList)} name={isList?'list':'image'} color='#2E2E2E' size={24} />
    )
}


const DT_TNScreen = () => {
    const navigation = useNavigation();
    const token = useSelector((state) => state.diemtin.token);
    const dataService = useSelector((state) => state.global.dataService);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);
    const [isList, setIsList] = useState(false);
    const [footerLoad, setFooterLoad] = useState(false);

    const fetchData = async () => {
        var date_from = moment().subtract(10, 'days').format('YYYY/MM/DD') + " " + moment().format('LTS')
        var date_to = moment().format('YYYY/MM/DD') + " " + moment().format('LTS')
        var body = {
            "date_from": date_from,
            "date_to": date_to,
            "order": 1,
            "page": page,
            "size": 10,
            "topic": 919,
            "topic_id": 0,
            "tree_node": 0
        }
        var data1 = await requestPOST_NETVIEW(`${dataService.NETVIEW_URL}/articles/search`, body, token)
        var data2 = data1.data ? data1.data.hits : []
        setData([...data, ...data2]);
        setFooterLoad(false)
        setIsLoading(false)
    };

    useEffect(() => {
        setIsLoading(true);
        return () => { };
    }, []);

    useEffect(() => {
        setFooterLoad(true)
        fetchData();
        return () => { };
    }, [page]);

    const getLoadMore = () => {
        setPage(page+1)
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header title="Tin nóng quốc tế" isStack={true} RightComponent={() => <RightComponent setIsList={setIsList} isList={isList} />} />
            {isLoading ? (
                <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
            ) : (
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={data}
                            renderItem={({ item, index }) => isList?<RenderItem1 item={item} index={index} navigation={navigation} />:<RenderItem item={item} index={index} navigation={navigation} />}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={data}
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={footerLoad ? <ActivityIndicator /> : <View />}
                            onEndReached={() => {
                                getLoadMore();
                              }}
                              onEndReachedThreshold={0.3}
                        />
                    </View>
                )}
        </View>
    );
};

export default DT_TNScreen;

const styles = StyleSheet.create({
    tabView: {
        flex: 1
    },
});

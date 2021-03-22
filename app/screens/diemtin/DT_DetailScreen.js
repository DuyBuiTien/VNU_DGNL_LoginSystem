/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image, ActivityIndicator, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import { Header } from '../../components';
import { requestPOST_NETVIEW } from '../../services/Api';

import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi')

const DT_DetailScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const dataService = useSelector((state) => state.global.dataService);
    const token = useSelector((state) => state.diemtin.token);
    const [isLoading, setIsLoading] = useState(false);
    const route = useRoute();
    const { item } = route.params;

    const [data, setData] = useState({});

    useEffect(() => {
        setIsLoading(true);
        setData(item)
        setIsLoading(false);
        return () => { setData({}) };
    }, [item]);


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header isStack={true} />
            {isLoading ? (
                <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
            ) : (
                    <ScrollView style={{ padding: 20, flexGrow: 1 }}>
                        <View style={{ paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', paddingVertical: 10 }}>{data.title}</Text>
                            <Text style={{ color: '#757575' }}>{moment(data.published_timestamp).fromNow()}</Text>
                            <Text style={{ fontWeight: 'bold', paddingVertical: 10 }}>{data.summary}</Text>
                        </View>
                        {data.image_sources ?
                            <Image resizeMode='cover' source={{ uri: data.image_sources[0] }} style={{ borderRadius: 5, height: 200, width: '100%', marginVertical: 10 }} />
                            : <></>}
                        <Text style={{ lineHeight: 20, textAlign: 'justify' }}>{data.content ? data.content.replace(/\n/g, '\n\n') : ''}</Text>
                        <View style={{paddingBottom: 50}}>
                            <View style={{ flexDirection: 'row', padding: 10 }}>
                                <Text style={{ fontWeight: '600', fontStyle: 'italic' }}>Tác giả:</Text>
                                <Text style={{ fontWeight: '600', paddingLeft: 20, fontStyle: 'italic' }}>{data.author_display_name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', padding: 10,}}>
                                <Text style={{ fontWeight: '600', fontStyle: 'italic' }}>Nguồn:</Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('WebViewScreen', {
                                        data: {
                                            title: '',
                                            url: data.url,
                                            colorHeader: '#FFFAF3',
                                            hideBackForward: false,
                                        }
                                    })}
                                    style-={{}}
                                >
                                    <Text style={{ fontWeight: '600', paddingLeft: 20, paddingRight: 40, color: '#2196F3', fontStyle: 'italic', flex: 1 }}>{data.url}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                )}
        </View>
    );
};

export default DT_DetailScreen;

const styles = StyleSheet.create({

});

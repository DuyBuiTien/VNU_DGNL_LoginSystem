/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Image, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { Header } from '../../components';
import { ItemMenuImage, BlockLogin } from '../../components/common';
import HTMLView from 'react-native-htmlview';

import { requestGET_AIC } from '../../services/Api';

import moment from 'moment';
moment.locale('vi');

const DNNDT_TTTTLDDetailScreen = (props) => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.global.user);
    const dataService = useSelector((state) => state.global.dataService);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({});
    const route = useRoute();
    const { id, title } = route.params;

    const renderNode = (node, index, siblings, parent, defaultRenderer) => {
        if (node.name == 'img') {
            const a = node.attribs;
            return (<Image style={{ height: 200, width: Dimensions.get('window').width - 50 }} source={{ uri: a.src }} />);
        }
    }

    const fetchData = async () => {
        setIsLoading(true);
        var data1 = await requestGET_AIC(`${dataService.AIC_URL}/cultures/${id}`)
        var data2 = data1.data ? data1.data : []
        setData(data2)
        setIsLoading(false)
    };

    useEffect(() => {
        fetchData()
        return () => { };
    }, [id]);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header title={title} isStack={true} />
            {isLoading ? (
                <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
            ) : (
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        <Image style={{ height: 240, width: '100%', resizeMode: 'stretch' }} source={{ uri: data.cover_url }} />
                        <View style={{ flex: 1, padding: 10, paddingHorizontal: 20 }}>
                        <Text style={{ color: '#FF5722', fontSize: 12, fontWeight: '600', paddingVertical: 10}}>Thông tin thị trường lao động</Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{data.title}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
                                <Text style={{ color: '#757575', fontSize: 12 }}>{data.published_at}</Text>
                                <FontAwesome name='dot-circle' color='#757575' size={8} style={{ marginHorizontal: 10 }} />
                                <Text style={{ color: '#757575', fontSize: 12 }}>{data.view_quantity} lượt xem</Text>
                            </View>
                            <HTMLView value={`<div>${data.content_html}</div>`} renderNode={renderNode} stylesheet={styles} />
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
                                    <Text style={{ fontWeight: '600', paddingLeft: 20, paddingRight: 40, color: '#2196F3', fontStyle: 'italic', flex: 1 }}>{data.source}</Text>
                                </TouchableOpacity>
                            </View>
                    </ScrollView>
                )}
        </View>
    );
};

export default DNNDT_TTTTLDDetailScreen;

const styles = StyleSheet.create({
    p: {
        textAlign: 'justify',
        margin: 0
    },
    strong: {
        textAlign: 'justify'
    },
    span: {
        textAlign: 'justify'
    }
});

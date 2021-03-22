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
import { Avatar } from 'react-native-elements'

import { requestGET_AIC } from '../../services/Api';

import moment from 'moment';
moment.locale('vi');

const DNNDT_DDDNNDTDetailScreen = (props) => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.global.user);
    const dataService = useSelector((state) => state.global.dataService);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const route = useRoute();
    const { id, title } = route.params;

    const fetchData = async () => {
        setIsLoading(true);
        var data1 = await requestGET_AIC(`${dataService.AIC_URL}/forums/detail/${id}`)
        var data2 = data1.data ? data1.data : {}
        console.log(data2)
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
            {isLoading ? (
                <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
            ) : (
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} >
                        <Image style={{ height: 240, width: '100%', resizeMode: 'stretch' }} source={data.images.length>0?{ uri: data.images[0] }: require('../../Images/nn1.jpg')} />
                        <View style={{ flex: 1, padding: 10, paddingHorizontal: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{data.title}</Text>
                            <Text style={{ color: '#FF5722', fontSize: 12, paddingVertical: 10 }}>{data.field}</Text>
                        </View>
                        <View style={{flexDirection: 'row', paddingHorizontal: 30 }}>
                            {data.avatar ? <Image source={{ uri: data.avatar }} style={{ width: 40, height: 40, borderRadius: 40 }} /> : <Avatar title={data.user_name?data.user_name.charAt(0):"U"} style={{ width: 40, height: 40, borderRadius: 40 }} />}
                            <View style={{paddingLeft: 20}}>
                            <Text style={{ fontWeight: 'bold' }}>{data.user_name}</Text>
                            <Text style={{paddingTop: 10}}>Đăng lúc {data.created_at}</Text>
                            </View>
                        </View>
                        <Text style={{ paddingHorizontal: 20, flex: 1, paddingTop: 10,textAlign: 'justify', lineHeight: 30, fontSize: 16 }}>{data.content}</Text>
                    </ScrollView>
                )}
        </View>
    );
};

export default DNNDT_DDDNNDTDetailScreen;

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

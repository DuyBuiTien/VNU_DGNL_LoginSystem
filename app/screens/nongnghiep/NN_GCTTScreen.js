/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import { Header } from '../../components';
import { ItemMenuImage, BlockLogin } from '../../components/common';
import { DANHMUC } from '../../data/NN_Data';
import { requestGET } from '../../services/Api';

const NN_GCTTScreen = () => {
    const navigation = useNavigation();
    const dataService = useSelector((state) => state.global.dataService);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        var data1 = await requestGET(`${dataService.NN_URL}/getListdanhmucgiacathitruong`)
        var data2 = data1 ? data1 : []
        data2.map((i) => {
            i.id = i.ID
            i.name = i.ten_danhmuc
            i.navigate = 'NN_GCTTScreen'
            i.icon = require('../../Images/shopping-cart.png')
            i.background = require('../../Images/nn1.jpg')
        })
        setData(data2)
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
        return () => { };
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header title="Giá cả thị trường" isStack={true} />
            {isLoading ? (
                <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
            ) : (
                    <ScrollView>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                flexWrap: 'wrap',
                            }}>
                            {data.map((item) => (
                                <ItemMenuImage item={item} />
                            ))}
                        </View>
                    </ScrollView>
                )}
        </View>
    );
};

export default NN_GCTTScreen;

const styles = StyleSheet.create({});

/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator, FlatList, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { requestGET_AIC } from '../../services/Api';

import { Avatar } from 'react-native-elements'
import { Header } from '../../components';
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi')

import { SearchComponent } from '../../components/common';

const RenderItem = (props) => {
    const { item, navigation, index } = props;
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('DNNDT_DDDNNDTDetailScreen', { id: item.id, title: item.title })}
            style={{
                flex: 1,
                marginVertical: 10,
                padding: 20,
                backgroundColor: '#FFFFFF',
                flexDirection: 'row',
                borderRadius: 10,
                alignItems: 'flex-start',
                shadowOpacity: 0.2,
                shadowRadius: 2,
                shadowColor: '#000',
                shadowOffset: { height: 0, width: 0 },
            }}>
            {item.avatar ? <Image source={{ uri: item.avatar }} style={{ width: 40, height: 40, borderRadius: 40 }} /> : <Avatar title={item.user_name?item.user_name.charAt(0):"U"} style={{ width: 40, height: 40, borderRadius: 40 }} />}
            <View style={{ paddingLeft: 20, flex: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
                <Text style={{ paddingTop: 10 }} numberOfLines={2}>{item.content}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <FontAwesome name='comment-alt-lines' color='#757575' size={15} style={{paddingRight: 5}} />
                        <Text style={{ color: '#757575', fontSize: 12 }}>{item.number_comment} bình luận</Text>
                    </View>
                    <Text style={{ color: '#757575', fontSize: 12 }}>{item.created_at}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const DNNDT_DDDNNDTListScreen = () => {
    const navigation = useNavigation();
    const token = useSelector((state) => state.diemtin.token);
    const dataService = useSelector((state) => state.global.dataService);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const route = useRoute();
    const { id, title } = route.params.data;

    const fetchData = async () => {
        setIsLoading(true);
        var data1 = await requestGET_AIC(`${dataService.AIC_URL}/forums/?keyword=&offset=0&field_id=${id}`)
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
                            contentContainerStyle={{ paddingHorizontal: 20 }}
                        />
                    </View>
                )}
        </View>
    );
};

export default DNNDT_DDDNNDTListScreen;

const styles = StyleSheet.create({

});

/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { requestGET_AIC, requestPOST_AIC } from '../../services/Api';

import { Header } from '../../components';
import { ItemMenuImage, BlockLogin } from '../../components/common';
import { SearchComponent } from '../../components/common';

const RenderItem = (props) => {
    const { item, navigation } = props;
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('VideoScreen', { url: item.source })}
            style={{
                flex: 1,
                flexDirection: 'row',
                padding: 10,
                margin: 5,
                alignItems: 'flex-start',
                borderBottomWidth: 0.5,
                borderBottomColor: '#e8e8e8',
            }}>
            <ImageBackground
                imageStyle={{ borderRadius: 5 }}
                resizeMode="cover"
                style={{ width: 80, height: 80 }}
                source={{uri:item.image}}
            />
            <View style={{ flex: 1, marginStart: 10, justifyContent: 'space-between' }}>
                <Text numberOfLines={2} style={{ fontWeight: 'bold' }}>
                    {item.title}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 40}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome name="eye" size={16} color="#9E9E9E" />
                        <Text style={{ color: '#9E9E9E', fontSize: 12, paddingLeft: 10 }}>{item.view_quantity}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome name="clock" size={16} color="#9E9E9E" />
                        <Text style={{ color: '#9E9E9E', fontSize: 12, paddingLeft: 10 }}>{item.created_at}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const GD_HTAListScreen = () => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.global.user);
    const route = useRoute();
    const { videos, title } = route.params;
    const dataService = useSelector((state) => state.global.dataService);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const fetchData = async () => {
        setIsLoading(true);
        setData(videos)
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
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
                            contentContainerStyle={{ flexGrow: 1 }}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            data={data.filter((item) => {
                                const name = item.title.toUpperCase();
                                return name.indexOf(inputValue.toUpperCase()) > -1;
                            })}
                            renderItem={({ item, index }) => <RenderItem item={item} index={index} navigation={navigation} />}
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

export default GD_HTAListScreen;

const styles = StyleSheet.create({
    tabView: {
        flex: 1,
        padding: 20
    },
});

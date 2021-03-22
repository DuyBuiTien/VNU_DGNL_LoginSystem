/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { requestGET_AIC, requestPOST_AIC } from '../../services/Api';

import { Header } from '../../components';
import { ItemMenuImage, BlockLogin } from '../../components/common';
const windowWidth = Dimensions.get('window').width;

const RenderItem = (props) => {
    const { item, navigation } = props;
    return (
        <TouchableOpacity onPress={() => navigation.navigate('DT_DetailScreen', { item: item })} style={{ padding: 10, paddingHorizontal: 20, flexDirection: index<3?'column':'row', borderRadius: 5, justifyContent: 'space-between', alignItems: 'flex-start' }}>

            <ImageBackground resizeMode='cover' source={item.image_sources?{ uri: item.image_sources[0] }:require('../../Images/nn1.jpg')} imageStyle={{borderRadius: 10}} style={{ borderRadius: 5, height: index<3?200:100, width: index<3?'100%':100 }} />
            <View style={{ flex: 1, marginLeft: index<3?0:10, borderBottomColor: '#e8e8e8', borderBottomWidth: index<3?0:1, paddingBottom: 10, alignSelf: 'stretch' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}><Text numberOfLines={2} style={{ fontSize: 16, flex: 1, paddingRight: 10, fontWeight: '600' }}>{item.title}</Text></View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#757575', fontSize: 12 }}>{moment(item.published_timestamp).fromNow()}</Text>
                    <FontAwesome name='dot-circle' color='#757575' size={8} style={{ marginHorizontal: 10 }} />
                    <Text style={{ color: '#757575', fontSize: 12 }}>{item.author_display_name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const GD_HTAScreen = () => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.global.user);
    const dataService = useSelector((state) => state.global.dataService);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCourse, setIsLoadingCourse] = useState(false);
    const [data, setData] = useState([]);
    const [dataCourse, setDataCourse] = useState([]);
    const [active, setActive] = useState(-1);

    const fetchData = async () => {
        setIsLoading(true);
        var data1 = await requestGET_AIC(`${dataService.NN_URL}/getListdanhmucgiacathitruong`)
        var data2 = data1 ? data1 : []
        if (data2.length > 0) {
            setData(data2)
            setActive(0)
        }
        setIsLoading(false);
    };
    const fetchCourse = async () => {
        setIsLoadingCourse(true);
        var data1 = await requestGET_AIC(`${dataService.AIC_URL}/getListgiacathitruong?page=1&?perpage=100&&idlist=${data[active].ID}`)
        var data2 = data1 ? data1 : []
        setDataCourse(data2)
        setIsLoadingCourse(false);
    };

    useEffect(() => {
        fetchData();
        return () => { };
    }, []);

    useEffect(() => {
        if (active > -1) {
            fetchCourse();
        }
        return () => { };
    }, [active]);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header title="Giá cả thị trường" isStack={true} />{isLoading ? (
                <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
            ) : (
                    <View style={{ flex: 1 }}>
                        {data ?
                            <ScrollableTabView
                                style={{}}
                                renderTabBar={() => <ScrollableTabBar />}
                                onChangeTab={({ i, r }) => setActive(i)}
                                initialPage={0}
                                tabBarPosition="top"
                                tabBarActiveTextColor="#2E2E2E"
                                tabBarInactiveTextColor={'#BDBDBD'}
                                tabBarUnderlineStyle={{ backgroundColor: '#f44336', height: 2 }}>
                                {data.map((i) => (
                                    <View tabLabel={i.ten_danhmuc} style={styles.tabView}>
                                        {isLoadingCourse ?
                                            <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
                                            :
                                            <FlatList
                                                data={dataCourse}
                                                renderItem={({ item, index }) => <RenderItem item={item} index={index} navigation={navigation} />}
                                                keyExtractor={(item, index) => index.toString()}
                                                extraData={dataCourse}
                                                showsVerticalScrollIndicator={false}
                                            />
                                        }
                                    </View>
                                ))}
                            </ScrollableTabView>
                            : <></>}
                    </View>
                )}
        </View>
    );
};

export default GD_HTAScreen;

const styles = StyleSheet.create({
    tabView: {
        flex: 1
    },
});

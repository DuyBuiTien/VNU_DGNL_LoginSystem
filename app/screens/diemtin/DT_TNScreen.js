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


const GD_HNScreen = () => {
    const navigation = useNavigation();
    const token = useSelector((state) => state.diemtin.token);
    const dataService = useSelector((state) => state.global.dataService);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCourse, setIsLoadingCourse] = useState(false);
    const [data, setData] = useState([]);
    const [dataCourse, setDataCourse] = useState([]);
    const [active, setActive] = useState(-1);

    const fetchData = async () => {
        setIsLoading(true);
        var data1 = await requestGET_AIC(`${dataService.AIC_URL}/apprentice/category`)
        var data2 = data1.data ? data1.data : []
        if (data2.length > 0) {
            setData(data2)
            setActive(0)
        }
        setIsLoading(false);
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
            <Header title="Học nghề" isStack={true} />{isLoading ? (
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
                                    <View tabLabel={i.name} style={styles.tabView}>
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

export default GD_HNScreen;

const styles = StyleSheet.create({
    tabView: {
        flex: 1
    },
});

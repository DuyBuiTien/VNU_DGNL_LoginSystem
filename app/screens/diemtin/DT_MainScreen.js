/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image, ActivityIndicator, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import { Header } from '../../components';
import { ItemMenuImage, BlockLogin } from '../../components/common';
import { DANHMUC } from '../../data/DT_Data';
import * as actions from '../../redux/diemtin/Actions';
import { requestPOST_NETVIEW } from '../../services/Api';
import Carousel from 'react-native-snap-carousel';
import SliderEntry from '../../components/common/SliderEntry'

import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi')

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const wp = (percentage) => {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideWidth = wp(90);
const itemHorizontalMargin = wp(2);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

const MainScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const dataService = useSelector((state) => state.global.dataService);
    const token = useSelector((state) => state.diemtin.token);

    const [data, setData] = useState([]);

    const { actionsLoading, error } = useSelector(
        (state) => ({
            actionsLoading: state.diemtin.actionsLoading,
            error: state.diemtin.error,
        }),
        shallowEqual,
    );

    const fetchData = async () => {
        var date_from = moment().subtract(10, 'days').format('L') + " " + moment().format('LTS')
            var date_to = moment().format('L') + " " + moment().format('LTS')
            var body = {
                "date_from": date_from,
                "date_to": date_to,
                "order": 1,
                "page": 0,
                "size": 20,
                "topic": 0,
                "topic_id": 23804,
                "tree_node": 0
            }
            var data1 = await requestPOST_NETVIEW(`${dataService.NETVIEW_URL}/articles/search`, body, token)
            var data2 = data1.data ? data1.data.hits : []
            console.log(data2)
            setData(data2)
    };

    useEffect(() => {
        dispatch(actions.login()).then(() => {
            fetchData()
        });
    }, []);


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header title="Điểm tin" isStack={true} />
            {actionsLoading ? (
                <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
            ) : (
                    <ScrollView>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10, paddingHorizontal: 20}}>
                            <Text style={{fontWeight: 'bold', color: '#3B484E', fontSize: 16}}>Tin về dịch COVID-19</Text>
                            <Text style={{color: '#9E9E9E'}}>Xem tất cả</Text>
                        </View>
                        <View style={{ paddingTop: 10, backgroundColor: 'white'}}>
                            <Carousel
                                data={data}
                                renderItem={({ item, index }) => <SliderEntry data={item} even={(index + 1) % 2 === 0} />}
                                sliderWidth={sliderWidth}
                                itemWidth={itemWidth}
                                containerCustomStyle={styles.slider}
                                contentContainerCustomStyle={styles.sliderContentContainer}
                                layout='stack'
                                loop={true}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                flexWrap: 'wrap',
                            }}>
                            {DANHMUC.map((item) => (
                                <ItemMenuImage item={item} />
                            ))}
                        </View>
                    </ScrollView>
                )}
        </View>
    );
};

export default MainScreen;

const styles = StyleSheet.create({
    slider: {
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
    },
});

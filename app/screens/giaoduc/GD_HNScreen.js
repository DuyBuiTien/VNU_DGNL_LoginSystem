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

const RenderItem1 = (props) => {
    const {item, navigation} = props;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('VideoScreen', {url: item.source});
        }}
        style={{
          flex: 1,
          flexDirection: 'column',
          width: windowWidth-80,
          marginEnd: 20,
          marginStart: 5,
          marginVertical: 20,
          backgroundColor: '#FFFFFF',
          shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 0, width: 0 },
        borderRadius: 10
        }}>
        <ImageBackground
          resizeMode="cover"
          style={{
            height: 120,
            alignItems: 'center', 
            justifyContent: 'center'
          }}
          imageStyle={{borderRadius: 5}}
          source={{
            uri: item.image,
          }}
        >
            <View style={{height: 40, width: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 40, backgroundColor: '#fff'}}>
                <FontAwesome style={{marginLeft: 5}} name="play" size={20} color="#FF9800" />
            </View>
        </ImageBackground>
        <View style={{height: 80, padding: 10, justifyContent: 'space-between'}}>
          <Text style={{fontSize: 14}} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome name="eye" size={16} color="#9E9E9E" />
            <Text style={{color: '#9E9E9E', fontSize: 12, paddingLeft: 10}}>{item.view_quantity}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome name="clock" size={16} color="#9E9E9E" />
            <Text style={{color: '#9E9E9E', fontSize: 12, paddingLeft: 10}}>{item.created_at}</Text>
          </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

const RenderItem = (props) => {
    const { item, navigation } = props;
    return (
        <View style={{padding: 20, paddingRight: 0}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',paddingRight: 20}}>
                <Text style={{fontWeight: '600', flex: 1, paddingRight: 20}}>{item.name}</Text>
                <TouchableOpacity onPress={() =>  navigation.navigate('GD_HNListScreen', {videos: item.videos, title: item.name})} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: '#FF9800', paddingRight: 5}}>Tất cả({item.videos?item.videos.length:0})</Text>
                    <FontAwesome name='chevron-right' color='#FF9800' size={10} />
                </TouchableOpacity>
            </View>
            <FlatList
                horizontal
                scrollEnabled
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
                data={item.videos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => <RenderItem1 item={item} index={index} navigation={navigation} />}
              />
        </View>
    )
}

const GD_HNScreen = () => {
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
        var data1 = await requestGET_AIC(`${dataService.AIC_URL}/apprentice/category`)
        var data2 = data1.data ? data1.data : []
        if (data2.length > 0) {
            setData(data2)
            setActive(0)
        }
        setIsLoading(false);
    };
    const fetchCourse = async () => {
        setIsLoadingCourse(true);
        var data1 = await requestGET_AIC(`${dataService.AIC_URL}/apprentice/training_course?category=${data[active].name}`)
        var data2 = data1.data ? data1.data : []
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

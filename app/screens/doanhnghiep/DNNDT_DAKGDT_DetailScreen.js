/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator, FlatList, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { requestPOST_NETVIEW } from '../../services/Api';
import { requestGET_AIC, requestPOST_AIC } from '../../services/Api';
import { SearchComponent } from '../../components/common';
import { Button } from 'react-native-elements';

import { Header } from '../../components';
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi')


const DNNDT_DAKGDT_DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute()
  const token = useSelector((state) => state.diemtin.token);
  const dataService = useSelector((state) => state.global.dataService);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const { id, title } = route.params

  const fetchData = async () => {
    setIsLoading(true)
    var data1 = await requestGET_AIC(`${dataService.AIC_URL}/agencies/articles/${id}`)
    var data2 = data1.data ? data1.data : {}
    setData(data2)
    setIsLoading(false)
  };

  useEffect(() => {
    fetchData();
    return () => { };
  }, [id]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header title={title} isStack={true} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{ flex: 1, justifyContent: 'center' }} />
      ) : (
          <ScrollView showsVerticalScrollIndicator={false} style={{ flexGrow: 1 }}>
            <Image style={{ height: 240, width: '100%', resizeMode: 'stretch' }} source={{ uri: data.cover_url }} />
            <View style={{ padding: 20 }}>
              <Text style={{ fontWeight: 'bold', flex: 1, lineHeight: 28, fontSize: 24, paddingVertical: 10 }}>
                {data.title ? data.title : ''}
              </Text>
              <View style={{ paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome name="map-marker-alt" color="#2196F3" size={20} />
                    <Text style={{ fontWeight: '600', fontSize: 12, paddingLeft: 20 }}>Địa điểm</Text>
                </View>
                <Text style={{ fontSize: 16, paddingLeft: 35, paddingVertical: 10 }}>{data.address}</Text>
              </View>
              <View style={{ paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome name="question-circle" color="#2196F3" size={20} />
                    <Text style={{ fontWeight: '600', fontSize: 12, paddingLeft: 20 }}>Mục tiêu</Text>
                </View>
                <Text style={{ fontSize: 16, paddingLeft: 40, paddingVertical: 10 }}>{data.target}</Text>
              </View>
              <View style={{ paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome name="expand-arrows-alt" color="#2196F3" size={20} />
                    <Text style={{ fontWeight: '600', fontSize: 12, paddingLeft: 20 }}>Quy mô</Text>
                </View>
                <Text style={{ fontSize: 16, paddingLeft: 40, paddingVertical: 10 }}>{data.scale}</Text>
              </View>
              <View style={{ paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome name="briefcase" color="#2196F3" size={20} />
                    <Text style={{ fontWeight: '600', fontSize: 12, paddingLeft: 20 }}>Hình thức đầu tư</Text>
                </View>
                <Text style={{ fontSize: 16, paddingLeft: 40, paddingVertical: 10 }}>{data.investment_form}</Text>
              </View>
            </View>

          </ScrollView>
        )}
    </View>
  );
};

export default DNNDT_DAKGDT_DetailScreen;

const styles = StyleSheet.create({
  tabView: {
    flex: 1
  },
});

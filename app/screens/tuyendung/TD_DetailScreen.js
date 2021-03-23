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


const TD_DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute()
  const token = useSelector((state) => state.diemtin.token);
  const dataService = useSelector((state) => state.global.dataService);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const { id, title } = route.params

  const fetchData = async () => {
    setIsLoading(true)
    var data1 = await requestGET_AIC(`${dataService.AIC_URL}/recruitments/${id}`)
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
            <Image style={{ height: 240, width: '100%', resizeMode: 'stretch' }} source={data.cover_url ? { uri: data.cover_url } : require('../../Images/tuyen-dung.png')} />
            <View style={{ padding: 20 }}>
              <Text style={{ fontWeight: 'bold', flex: 1, lineHeight: 28, fontSize: 24, paddingTop: 10 }}>
                {data.job ? data.job : ''}
              </Text>
              <Text style={{paddingTop: 10}}>{data.created_at}</Text>
              <View style={{ paddingTop: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome name="briefcase" color="#2196F3" size={18} style={{width: 20}} />
                    <Text style={{ paddingLeft: 20, color: '#757575' }}>{data.company}</Text>
                </View>
              </View>

              <View style={{ paddingTop: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome name="calendar" color="#2196F3" size={18} style={{width: 20}} />
                    <Text style={{ paddingLeft: 20, color: '#757575' }}>{moment(data.application_deadline).format('L')}</Text>
                </View>
              </View>

              <View style={{ paddingTop: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome name="coins" color="#2196F3" size={18} style={{width: 20}} />
                    <Text style={{ paddingLeft: 20, color: '#757575' }}>{data.wage}</Text>
                </View>
              </View>

              <View style={{ paddingTop: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome name="book-open" color="#2196F3" size={18} style={{width: 20}} />
                    <Text style={{ paddingLeft: 20, color: '#757575' }}>{data.experience_requirement}</Text>
                </View>
              </View>

              <View style={{ paddingTop: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome name="user" color="#2196F3" size={18} style={{width: 20}} />
                    <Text style={{ paddingLeft: 20, color: '#757575' }}>{data.gender_name}</Text>
                </View>
              </View>

              <View style={{ paddingTop: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome name="map-marker-alt" color="#2196F3" size={18} style={{width: 20}} />
                    <Text style={{ paddingLeft: 20, color: '#757575' }}>{data.address}</Text>
                </View>
              </View>

              <View style={{ paddingTop: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome name="address-card" color="#2196F3" size={18} style={{width: 20}} />
                    <Text style={{ paddingLeft: 20, color: '#757575' }}>{data.position_name}</Text>
                </View>
              </View>

              <View style={{ paddingTop: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome name="clock" color="#2196F3" size={18} style={{width: 20}} />
                    <Text style={{ paddingLeft: 20, color: '#757575' }}>{data.form_of_work_name}</Text>
                </View>
              </View>

              <View style={{ paddingTop: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome name="phone" color="#2196F3" size={18} style={{width: 20}} />
                    <Text style={{ paddingLeft: 20, color: '#757575' }}>{data.contact_phone}</Text>
                </View>
              </View>

              <View style={{ paddingTop: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome name="envelope" color="#2196F3" size={18} style={{width: 20}} />
                    <Text style={{ paddingLeft: 20, color: '#757575' }}>{data.contact_email}</Text>
                </View>
              </View>

              <Text style={{paddingVertical: 20, fontWeight: 'bold', fontSize: 16}}>Giới thiệu công ty</Text>
              <Text>{data.company_introduce}</Text>

              <Text style={{paddingVertical: 20, fontWeight: 'bold', fontSize: 16}}>Mô tả công việc</Text>
              <Text>{data.job_content}</Text>

              <Text style={{paddingVertical: 20, fontWeight: 'bold', fontSize: 16}}>Quyền lợi công việc</Text>
              <Text>{data.job_benefit}</Text>

              <Text style={{paddingVertical: 20, fontWeight: 'bold', fontSize: 16}}>Yêu cầu công việc</Text>
              <Text>{data.job_requirement}</Text>

            </View>

          </ScrollView>
        )}
    </View>
  );
};

export default TD_DetailScreen;

const styles = StyleSheet.create({
  tabView: {
    flex: 1
  },
});

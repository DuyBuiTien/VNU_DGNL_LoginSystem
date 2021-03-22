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


const RenderItem = (props) => {
  const { data, navigation, histories } = props;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DNNDT_CSDLLDetailScreen', {
          id: data.id,
          title: data.name
        });
      }}
      style={{
        flexDirection: 'row',
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 20,
      }}>
      <FontAwesome name="file-alt" color="#f44336" size={30} />
      <View
        style={{
          flex: 1,
          marginTop: 0,
          marginLeft: 20,
          borderBottomColor: '#616161',
          borderBottomWidth: 0.3,
        }}>

        <Text style={{ fontWeight: '600', flex: 1, lineHeight: 20 }}>
          {data.name ? data.name : ''}
        </Text>
        <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
          <Text style={{ color: '#1976D2', paddingRight: 20, fontSize: 12, fontWeight: '600' }}>{data.code}</Text>
          <Text style={{ color: '#9E9E9E', fontSize: 12, fontWeight: '600' }}>{data.created_at}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};


const DNNDT_CSDLLDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute()
  const token = useSelector((state) => state.diemtin.token);
  const dataService = useSelector((state) => state.global.dataService);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [inputValue, setInputValue] = useState('');
  const { id, title } = route.params

  const fetchData = async () => {
    setIsLoading(true)
    var data1 = await requestGET_AIC(`${dataService.AIC_URL}/law_database/${id}`)
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
              <Text style={{ color: '#1976D2', fontWeight: '600', paddingVertical: 10 }}>{data.code}</Text>
              <Text style={{ fontWeight: 'bold', flex: 1, lineHeight: 25, fontSize: 20, paddingVertical: 10 }}>
                {data.name ? data.name : ''}
              </Text>
              <View style={{ paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1 / 2, fontWeight: '600' }}>Số/Ký hiệu</Text>
                  <Text style={{ flex: 1 / 2 }}>{data.code}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                  <Text style={{ flex: 1 / 2, fontWeight: '600' }}>Ngày ban hành</Text>
                  <Text style={{ flex: 1 / 2 }}>{moment(data.date_issued).format('L')}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                  <Text style={{ flex: 1 / 2, fontWeight: '600' }}>Ngày có hiệu lực</Text>
                  <Text style={{ flex: 1 / 2 }}>{moment(data.effective_date).format('L')}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                  <Text style={{ flex: 1 / 2, fontWeight: '600' }}>Người ký</Text>
                  <Text style={{ flex: 1 / 2 }}>{data.signer}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                  <Text style={{ flex: 1 / 2, fontWeight: '600' }}>Trích yếu</Text>
                  <Text style={{ flex: 1 / 2 }}>{data.abstract}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                  <Text style={{ flex: 1 / 2, fontWeight: '600' }}>Cơ quan ban hành</Text>
                  <Text style={{ flex: 1 / 2 }}>{data.agency_issued}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                  <Text style={{ flex: 1 / 2, fontWeight: '600' }}>Phân loại</Text>
                  <Text style={{ flex: 1 / 2 }}>{data.classify}</Text>
                </View>
              </View>
              <View style={{ marginVertical: 10, padding: 15, borderRadius: 10, backgroundColor: '#FFE0B2' }}>
                <View style={{ flexDirection: 'row' }}>
                  <FontAwesome name='file' size={16} />
                  <Text style={{ paddingLeft: 10, fontWeight: '600' }}>Quy định chi tiết một số điều.pdf</Text>
                </View>
                <Button
                  icon={
                    <FontAwesome
                      name="download"
                      size={15}
                      color="white"
                    />
                  }
                  title="Tải tập tin"
                  buttonStyle={{borderRadius: 20, backgroundColor: '#f44336', width: 120, marginTop: 15, marginLeft: 20}}
                  titleStyle={{fontSize: 14, paddingLeft: 10}}
                />
              </View>
              <View style={{ borderBottomColor: '#616161', borderBottomWidth: 0.3 }}>
                <View style={{ borderBottomColor: '#03a9f4', borderBottomWidth: 4, width: 100 }}>
                  <Text style={{ paddingVertical: 10 }}>Văn bản khác</Text>
                </View>
              </View>
              <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={data.related}
                renderItem={({ item, index }) => (
                  <RenderItem data={item} navigation={navigation} />
                )}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                  <Text style={{ textAlign: 'center', color: '#50565B', marginTop: 10 }}>Không có kết quả</Text>
                )}
              />

            </View>

          </ScrollView>
        )}
    </View>
  );
};

export default DNNDT_CSDLLDetailScreen;

const styles = StyleSheet.create({
  tabView: {
    flex: 1
  },
});

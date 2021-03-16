/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, TextInput, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

import {Header} from '../../components';
import {BlockLogin} from '../../components/common';
import {requestPOST} from '../../services/Api';

const RenderItem = (props) => {
  const {data, navigation, histories} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DVC_TKHS_CaNhan_DetailScreen', {
          data: data,
        });
      }}
      style={{
        padding: 10,
        flexDirection: 'row',
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}>
      <FontAwesome name="file-alt" color="#f44336" size={30} />
      <View
        style={{
          flex: 1,
          marginLeft: 10,
          borderBottomColor: '#e8e8e8',
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}>
        <Text
          style={{
            fontWeight: '400',
            flex: 1,
            paddingRight: 10,
            color: '#A6A8A7',
            textTransform: 'uppercase',
          }}>
          {data?.TenLinhVuc ?? ''}
        </Text>

        <Text style={{color: '#757575', fontWeight: 'bold', flex: 1, marginVertical: 10}} numberOfLines={2}>
          {data.TenHoSo ? data.TenHoSo : ''}
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (data.DanhGiaHaiLong === 'False') {
              navigation.navigate('DVC_TKHS_DanhGiaScreen', {
                data: data,
              });
            }
          }}
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 5, justifyContent: 'space-between'}}>
          <View
            style={{
              padding: 8,
              backgroundColor: data.DanhGiaHaiLong === 'False' ? '#f44336' : '#FFF',
              borderRadius: 4,
              justifyContent: 'center',
              borderWidth: 0.3,
              borderColor: data.DanhGiaHaiLong === 'False' ? '#FFF' : '#f44336',
            }}>
            <Text
              style={{
                color: data.DanhGiaHaiLong === 'False' ? '#FFF' : '#f44336',
                fontWeight: '600',
                textAlign: 'center',
                fontSize: 13,
              }}>
              {data.DanhGiaHaiLong === 'False' ? 'Đánh giá dịch vụ công' : 'Đã đánh giá'}
            </Text>
          </View>
          <Text style={{color: '#bdbdbd', textAlign: 'center'}}>{`${data.NgayTao}`}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const DVC_MainScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.dvc.user);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const dataService = useSelector((state) => state.global.dataService);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      var res = await requestPOST(`${dataService.DVC_URL}/GetPersonalDoc`, {
        token: user.token,
        status: 'Trả kết quả',
        page: '1',
        perpage: '50',
        keysearch: '',
        sort: 'desc',
      });

      if (res && res.data) {
        setData(res.data);
      }
      setIsLoading(false);
    };
    fetchData();
    return () => {};
  }, [dataService.DVC_URL, user.token]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Đánh giá dịch vụ công" isStack={true} />

      {!user ? (
        <BlockLogin name="Dịch vụ công" loginScreen={'DVC_Auth_LoginScreen'} registerScreen={'DVC_Auth_RegisterScreen'} />
      ) : (
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: '#EAEAEA',
                flexDirection: 'row',
                borderRadius: 4,
                padding: 4,
                margin: 10,
                alignItems: 'center',
                flex: 1,
              }}>
              <FontAwesome name="search" color="#787C7E" size={20} style={{marginHorizontal: 5}} />
              <TextInput
                placeholder={'Tìm kiếm'}
                multiline={false}
                onChangeText={(text) => {
                  setInputValue(text);
                }}
                value={inputValue}
                selectionColor={'gray'}
                onSubmitEditing={() => {}}
                clearButtonMode="always"
                style={{flex: 1, margin: 8}}
                keyboardType={'web-search'}
              />
            </View>
          </View>
          <View style={{flex: 1}}>
            <FlatList
              contentContainerStyle={{flexGrow: 1, padding: 10}}
              data={data.filter((i) => {
                const name = i.TenHoSo.toUpperCase();
                return name.indexOf(inputValue.toUpperCase()) > -1;
              })}
              renderItem={(item_) => <RenderItem data={item_.item} navigation={navigation} />}
              keyExtractor={(item_) => item_.Id}
              ListEmptyComponent={() => (
                <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default DVC_MainScreen;

const styles = StyleSheet.create({});

/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity, ImageBackground} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import moment from 'moment';

import {Header} from '../../components';
import {BlockLogin} from '../../components/common';
import {SearchComponent} from '../../components/common';

const RenderItem = (props) => {
  const {data, onPress, url} = props;
  return (
    <TouchableOpacity
      style={{
        margin: 5,
        borderRadius: 8,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        borderColor: '#abb4bd65',
        shadowRadius: 2,
        elevation: 2,
      }}
      onPress={() => onPress(data)}>
      <ImageBackground
        resizeMethod="resize"
        imageStyle={{borderBottomLeftRadius: 8, borderTopLeftRadius: 8}}
        style={{height: 120, width: 120, resizeMode: 'cover', aspectRatio: 1}}
        source={{uri: url + data.DuongDanhHinhAnhViPham}}
      />
      <View style={{flex: 1, padding: 10}}>
        <Text style={{fontSize: 12, color: '#bdbdbd'}}>{data.DonViPhatHien}</Text>
        <Text style={{fontWeight: 'bold', marginTop: 5, color: '#455a64'}} numberOfLines={2}>
          {data.HanhViViPham}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <FontAwesome name={'clock'} size={12} color={'#F26946'} />
          <Text style={{marginStart: 5, fontSize: 12, color: '#F26946'}}>
            {data.ThoiGianViPham ? `${moment(new Date(data.ThoiGianViPham)).format('DD/MM/YYYY')}` : 'Đang cập nhật'}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <FontAwesome name={'map-marker-alt'} size={12} color={'#F26946'} />
          <Text style={{marginStart: 5, fontSize: 12, color: '#455a64'}} numberOfLines={1}>
            {data.DiaDiemViPham}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <FontAwesome name={'money-bill'} size={12} color={'#F26946'} />
          <Text style={{marginStart: 5, fontSize: 12, color: '#455a64'}} numberOfLines={1}>
            {data.Cost.toLocaleString('it-IT', {style: 'currency', currency: 'VND'})}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <FontAwesome name={'cctv'} size={12} color={'#F26946'} />
          <Text style={{marginStart: 5, fontSize: 12, color: '#455a64'}} numberOfLines={1}>
            {data.ThietBiPhatHien}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DVC_MainScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);
  const random = useSelector((state) => state.global.random);
  const dataService = useSelector((state) => state.global.dataService);

  const route = useRoute();
  const {NgayDi, DiemDi, DiemDen} = route.params;

  let DiemDiId = DiemDi?.Id ?? '';
  let DiemDenId = DiemDen?.Id ?? '';

  DiemDiId = 59;
  DiemDenId = 142;

  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [active, setActive] = useState(-1);

  const [dataDiChung, setDataDiChung] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let response = await axios({
        method: 'get',
        url: `${dataService.DICHUNGXE_URL}/v1/trip/search?FromAreaId=${DiemDiId}&ToAreaId=${DiemDenId}`,
      });
      if (response.data && response.data.data) {
        setDataDiChung(response.data.data);
      } else {
      }
      setRefreshing(false);
      setIsLoading(false);
    };
    fetchData();
    return () => {};
  }, [DiemDenId, DiemDiId, dataService.DICHUNGXE_URL]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title={`Danh sách xe ${DiemDi?.Name ?? ''} - ${DiemDen?.Name ?? ''} `} isStack={true} />

      {!user ? (
        <BlockLogin name="Đi chung xe" />
      ) : (
        <View style={{flex: 1}}>
          <SearchComponent value={inputValue} onChangeText={setInputValue} />

          <View style={{flex: 1}}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center'}} />
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                onRefresh={() => {
                  setRefreshing(true);
                }}
                refreshing={refreshing}
                contentContainerStyle={{flexGrow: 1}}
                data={dataDiChung}
                renderItem={(item_) => <RenderItem data={item_.item} navigation={navigation} />}
                keyExtractor={(item_) => item_.Id}
                ListEmptyComponent={() => (
                  <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>
                )}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default DVC_MainScreen;

const styles = StyleSheet.create({});

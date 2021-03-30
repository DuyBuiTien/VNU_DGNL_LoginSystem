/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {useNavigation, useRoute} from '@react-navigation/native';

import {SearchComponent} from '../../components/common';

import {Header} from '../../components';
import {requestGET, requestPOST} from '../../services/Api';

const RenderItem = (props) => {
  const navigation = useNavigation();

  const {data} = props;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DL_Detail_CSLT_Screen', {data: data})}
      style={{
        flexDirection: 'row',
        padding: 10,
        margin: 5,
        alignItems: 'flex-start',
        borderBottomWidth: 0.5,
        borderBottomColor: '#e8e8e8',
      }}>
      <ImageBackground
        imageStyle={{borderRadius: 5}}
        resizeMode="cover"
        style={{width: 100, height: '100%'}}
        source={{
          uri:
            data.AnhDaiDien && data.AnhDaiDien.length > 5
              ? data.AnhDaiDien
              : 'https://vnn-imgs-f.vgcloud.vn/2020/01/10/14/ninh-thuan-thi-truong-day-hua-hen-cua-gioi-dau-tu-bds.jpg',
        }}
      />
      <View style={{flex: 1, marginStart: 10}}>
        <Text numberOfLines={2} style={{fontWeight: 'bold', color: '#455a64'}}>
          {data.Ten}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
          <FontAwesome name="archive" color="#f44336" size={16} />
          <Text style={{color: '#757575', fontSize: 12, paddingStart: 10, flex: 1}} numberOfLines={2}>
            {`${data.DMLoaiCoSo} - ${data.DMXepHang}`}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
          <FontAwesome name="phone" color="#f44336" size={16} />
          <Text style={{color: '#757575', fontSize: 12, paddingStart: 10, flex: 1}} numberOfLines={2}>
            {`${data?.DienThoai ?? 'Đang cập nhật'}`}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
          <FontAwesome name="map-marker-alt" color="#f44336" size={16} />
          <Text style={{color: '#757575', fontSize: 12, paddingStart: 10, flex: 1}} numberOfLines={2}>
            {`${data?.DiaChi ?? 'Đang cập nhật'}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MainScreen = () => {
  const navigation = useNavigation();
  const dataService = useSelector((state) => state.global.dataService);

  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const res = await requestPOST(`${dataService.DL_URL}/CoSoLuuTrus`, {
        token: 'Gaz9jR6ZMg+0qi+7XiRH6g==',
        skip: 0,
        top: 100,
        tukhoa: '',
        orderby: '',
      });
      setIsLoading(false);

      setData(res.data ? res.data : []);
    };

    fetchData();
    return () => {};
  }, [dataService.DL_URL]);

  //return await axios.get(`${dataService.PAHT_URL}/GetByStatus?limit=20&status=${status}`)

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Cơ sở lưu trú" isStack={true} />
      <SearchComponent value={inputValue} onChangeText={setInputValue} keyboardType={'web-search'} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center'}} />
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={data.filter((item) => {
              const name = item.Ten.toUpperCase();
              return name.indexOf(inputValue.toUpperCase()) > -1;
            })}
            renderItem={({item, index}) => <RenderItem data={item} index={index} navigation={navigation} histories={[]} />}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});

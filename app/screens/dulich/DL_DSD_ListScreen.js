/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  TextInput,
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
              ? `https://qldl.namdinh.gov.vn${data.AnhDaiDien.split(',')[0]}`
              : 'https://list.vn/wp-content/uploads/2020/11/kinh-nghiem-cho-be-di-du-lich-thai-lan-2.jpg',
        }}
      />
      <View style={{flex: 1, marginStart: 10}}>
        <Text numberOfLines={2} style={{fontWeight: 'bold', color: '#455a64'}}>
          {data.Ten}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
          <FontAwesome name="star" color="#f44336" size={16} />
          <Text style={{color: '#757575', fontSize: 12, paddingStart: 10, flex: 1}} numberOfLines={2}>
            {`${data.XepHang && data.XepHang.Name ? data.XepHang.Name : ''}`}
          </Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
          <FontAwesome name="map-marker-alt" color="#f44336" size={16} />
          <Text style={{color: '#757575', fontSize: 12, paddingStart: 10, flex: 1}} numberOfLines={2}>
            {`${data.DiaChi}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MainScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const data = route.params?.data ?? {};

  const dataService = useSelector((state) => state.global.dataService);

  const [inputValue, setInputValue] = useState('');
  const [datafinal, setDatafinal] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    const res = await requestPOST(`${dataService.DL_URL}/DiemDuLichs`, {
      token: 'Gaz9jR6ZMg+0qi+7XiRH6g==',
      tukhoa: '',
      skip: 0,
      top: 10,
      orderby: '',
      loaidulichs: `${data.id}`,
    });
    setIsLoading(false);

    setDatafinal(res.data ? res.data : []);
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title={`${data.name}`} isStack={true} />
      <SearchComponent value={inputValue} onChangeText={setInputValue} keyboardType={'web-search'} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center'}} />
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={datafinal.filter((item) => {
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

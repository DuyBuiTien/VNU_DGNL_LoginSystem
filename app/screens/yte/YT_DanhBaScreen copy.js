/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  TextInput,
  FlatList,
  Platform,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

import {Header} from '../../components';

import {requestGET} from '../../services/Api';
import {SearchComponent} from '../../components/common';

const RenderItem = (props) => {
  const {data, likeItem, onPress} = props;

  return (
    <TouchableOpacity
      onPress={() => onPress(data.SoDienThoai)}
      style={{
        padding: 10,
        flexDirection: 'row',
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}>
      <FontAwesome type="font-awesome" name="clinic-medical" color="#f44336" size={30} />
      <View
        style={{
          flex: 1,
          marginLeft: 10,
          borderBottomColor: '#e8e8e8',
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
            paddingTop: 0,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              flex: 1,
              paddingRight: 10,
              color: '#4D5458',
            }}>
            {data.Ten}
          </Text>
          {/* <FontAwesome onPress={() => likeItem(data)} name="heart" color={data.liked ? '#f44336' : '#e8e8e8'} size={25} /> */}
        </View>
        <View style={{flexDirection: 'row', padding: 5, alignItems: 'center'}}>
          <FontAwesome type="font-awesome" name="clock" color="#DB8568" size={14} />
          <Text
            style={{
              color: '#757575',
              flex: 1,
              marginStart: 10,
              fontSize: 12,
            }}>
            {`07:30 - 17:30`}
          </Text>
        </View>
        <View style={{flexDirection: 'row', padding: 5, alignItems: 'center'}}>
          <FontAwesome type="font-awesome" name="phone" color="#DB8568" size={14} />
          <Text
            style={{
              color: '#757575',
              flex: 1,
              marginStart: 10,
              fontSize: 12,
            }}>
            {data.SoDienThoai}
          </Text>
        </View>
        <View style={{flexDirection: 'row', padding: 5}}>
          <FontAwesome name="map-marker-alt" color="#DB8568" size={14} />
          <Text
            style={{
              color: '#757575',
              flex: 1,
              marginStart: 10,
              fontSize: 12,
            }}
            numberOfLines={2}>
            {data.DiaChi}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MainScreen = () => {
  const navigation = useNavigation();
  const dataService = useSelector((state) => state.global.dataService);
  const user = useSelector((state) => state.global.user);
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([]);

  const [datafinal, setDatafinal] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await requestGET(`${dataService.YT_URL}/DiaChiYTes/mGetListTYT`);

    var data2 = res.data ? res.data : [];

    setData(data2);
    setDatafinal(data2);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  const dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Gọi điện thoại cấp cứu" isStack={true} />

      <SearchComponent value={inputValue} onChangeText={setInputValue} />

      {isLoading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center'}} />
      ) : (
        <FlatList
          contentContainerStyle={{flexGrow: 1, padding: 10}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data.filter((item) => {
            const name = item.Ten.toUpperCase();
            const address = item.DiaChi.toUpperCase();
            return name.indexOf(inputValue.toUpperCase()) > -1 || address.indexOf(inputValue.toUpperCase()) > -1;
          })}
          renderItem={({item, index}) => <RenderItem data={item} navigation={navigation} onPress={dialCall} />}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>}
        />
      )}
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});

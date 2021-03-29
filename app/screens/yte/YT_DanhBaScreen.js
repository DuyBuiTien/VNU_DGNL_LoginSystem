/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Linking, FlatList, Platform} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

import {Header} from '../../components';
import {ItemDanhBa} from '../../components/yte';
import {SearchComponent} from '../../components/common';

const MainScreen = () => {
  const navigation = useNavigation();
  const dataService = useSelector((state) => state.global.dataService);
  const user = useSelector((state) => state.global.user);
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      var config = {
        method: 'get',
        url: `https://api-smartapp.namdinh.gov.vn/api/medical/emergency?keyword=${inputValue}`,
        headers: {
          CLIENTAPIKEY: '5ce554c2-1332-481e-97c2-5856d9612433',
        },
      };
      let response = await axios(config);
      if (response.data && response.data.results && response.data.results.data) {
        setData(response.data.results.data);
      }
      setIsLoading(false);
      // setRefreshing(false);
    };

    fetchData();

    return () => {
      setData([]);
    };
  }, [inputValue]);

  const dialCall = (phone) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phone}`;
    } else {
      phoneNumber = `telprompt:${phone}`;
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
          data={data}
          renderItem={({item, index}) => <ItemDanhBa item={item} navigation={navigation} onPress={dialCall} />}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>}
          /* onRefresh={() => {
            setRefreshing(true);
          }}
          refreshing={refreshing} */
        />
      )}
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});

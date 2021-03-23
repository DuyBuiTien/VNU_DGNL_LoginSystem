/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  TextInput,
  FlatList,
  Linking,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

import {Header, Icon} from 'react-native-elements';
import {ItemDanhBa} from '../../components/tongdaithongminh';

import {requestGET} from '../../services/Api';
import {SearchComponent} from '../../components/common';

const MainScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const user = useSelector((state) => state.global.user);
  const dataService = useSelector((state) => state.global.dataService);
  const [isLoading, setIsLoading] = useState(false);

  const {data, title} = route.params;

  const [inputValue, setInputValue] = useState('');
  const [dataDanhBa, setDataDanhBa] = useState([]);
  const [datafinal, setDatafinal] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await requestGET(`${dataService.TDTM_URL}/hotlines/popular/${data.type}`);

    var data2 = res.data ? res.data : [];

    setDataDanhBa(data2);
    setDatafinal(data2);

    setIsLoading(false);
  };

  useEffect(() => {
    if (data.type !== 'yeuthich') {
      fetchData();
    } else {
      setDataDanhBa([]);
      setDatafinal([]);
    }
    return () => {};
  }, [data.type]);

  const TimKiem = () => {
    var data_tmp = datafinal.filter((item) => {
      const name_ = item.HotLine.Detail.toUpperCase();
      const address = item.HotLine.Phone.toUpperCase();
      return name_.indexOf(inputValue.toUpperCase()) > -1 || address.indexOf(inputValue.toUpperCase()) > -1;
    });
    setDataDanhBa(data_tmp);
  };

  const onPress = (item) => {};
  const swipLeft = (item) => {
    Linking.openURL(Platform.OS === 'android' ? `tel:${item.HotLine.Phone}` : `telprompt:${item.HotLine.Phone}`);
  };

  const swipRight = (item) => {
    //console.log('swipRight');
    //console.log(item);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        statusBarProps={{barStyle: 'dark-content', backgroundColor: 'transparent', translucent: true}}
        barStyle="dark-content"
        placement="left"
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name={'arrow-back'}
              color="#2E2E2E"
              underlayColor="#00000000"
              containerStyle={{paddingStart: 0, marginHorizontal: 10}}
            />
          </TouchableOpacity>
        }
        centerComponent={{
          text: `${title}`,
          style: {color: '#2E2E2E', fontSize: 18, fontWeight: 'bold'},
        }}
        rightComponent={
          data && data.type && data.type !== 'yeuthich' ? (
            <TouchableOpacity
              onPress={() => {
                //  Linking.openURL(Platform.OS === 'android' ? 'tel:115' : 'telprompt:115');
                navigation.navigate('TDTM_DanhSachScreen', {
                  data: {
                    type: 'yeuthich',
                  },
                  title: 'Yêu thích',
                });
              }}
              style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'red', padding: 3, borderRadius: 100}}>
              <Icon name={'star'} color="#FFF" underlayColor="#00000000" containerStyle={{paddingStart: 0}} />
              <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 14}}>Yêu thích</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )
        }
        containerStyle={{backgroundColor: '#FFF', justifyContent: 'space-around'}}
        centerContainerStyle={{justifyContent: 'center'}}
      />
      <SearchComponent value={inputValue} onChangeText={setInputValue} keyboardType={'web-search'} onSubmitEditing={TimKiem} />

      {isLoading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center'}} />
      ) : (
        <FlatList
          contentContainerStyle={{flexGrow: 1, padding: 10}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={dataDanhBa}
          renderItem={({item, index}) => (
            <ItemDanhBa
              data={item}
              navigation={navigation}
              showPhone={true}
              showAddress={true}
              showTime={false}
              onPress={onPress}
              swipLeft={swipLeft}
              swipRight={swipRight}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>}
        />
      )}
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});

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

import {Header} from '../../components';
import {ItemDanhBa} from '../../components/tongdaithongminh';

import {requestGET} from '../../services/Api';

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
    fetchData();
    return () => {};
  }, []);

  const TimKiem = (input) => {
    var data_tmp = datafinal.filter((item) => {
      const name_ = item.HotLine.Detail.toUpperCase();
      const address = item.HotLine.Phone.toUpperCase();
      return name_.indexOf(input.toUpperCase()) > -1 || address.indexOf(input.toUpperCase()) > -1;
    });
    setDataDanhBa(data_tmp);
  };

  const onPress = (item) => {};
  const swipLeft = (item) => {
    Linking.openURL(Platform.OS === 'android' ? `tel:${item.HotLine.Phone}` : `telprompt:${item.HotLine.Phone}`);
  };

  const swipRight = (item) => {
    console.log('swipRight');
    console.log(item);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title={title} isStack={true} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: '#EAEAEA',
            flexDirection: 'row',
            borderRadius: 8,
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
              TimKiem(text);
            }}
            value={inputValue}
            selectionColor={'gray'}
            clearButtonMode="always"
            style={{flex: 1, margin: 10, fontSize: 15}}
          />
        </View>
      </View>
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

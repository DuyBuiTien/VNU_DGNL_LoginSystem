/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Image, TextInput, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

import {Header} from '../../components';

import {requestGET} from '../../services/Api';

const RenderItem = (props) => {
  const {data, likeItem} = props;

  return (
    <TouchableOpacity
      onPress={() => {}}
      style={{
        padding: 10,
        flexDirection: 'row',
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}>
      <FontAwesome type="font-awesome" name="allergies" color="#f44336" size={30} />
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
        </View>

        <View style={{flexDirection: 'row', padding: 5, alignItems: 'center'}}>
          <FontAwesome type="font-awesome" name="file" color="#DB8568" size={14} />
          <Text
            numberOfLines={3}
            style={{
              color: '#757575',
              flex: 1,
              marginStart: 10,
              fontSize: 12,
            }}>
            {data.DacDiem}
          </Text>
        </View>
        <View style={{flexDirection: 'row', padding: 5}}>
          <FontAwesome name="briefcase-medical" color="#DB8568" size={14} />
          <Text
            style={{
              color: '#757575',
              flex: 1,
              marginStart: 10,
              fontSize: 12,
            }}
            numberOfLines={2}>
            {data.BienPhapPhongChongDich}
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
    const res = await requestGET(`${dataService.YT_URL}/DichBenhs/mGetListDB`);

    var data2 = res.data ? res.data : [];

    setData(data2);
    setDatafinal(data2);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  const TimKiem = (input) => {
    var data_tmp = datafinal.filter((item) => {
      const name = item.Ten.toUpperCase();
      return name.indexOf(input.toUpperCase()) > -1;
    });
    setData(data_tmp);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Dịch bệnh" isStack={true} />
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
          data={data}
          renderItem={({item, index}) => <RenderItem data={item} navigation={navigation} />}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>}
        />
      )}
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});

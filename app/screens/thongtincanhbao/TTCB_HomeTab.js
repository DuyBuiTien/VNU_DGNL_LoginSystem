/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

import {Header} from '../../components';
import {ItemMenuImage, BlockLogin} from '../../components/common';

import {requestGET} from '../../services/Api';

const RenderItem = (props) => {
  const {item, navigation} = props;
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={{padding: 10, flexDirection: 'row', borderRadius: 5, justifyContent: 'space-between', alignItems: 'flex-start'}}>
      <FontAwesome name={item.CategoryIcon} color="#f44336" size={30} />
      <View style={{flex: 1, marginLeft: 10, borderBottomColor: '#e8e8e8', borderBottomWidth: 1, paddingBottom: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5, paddingTop: 0}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', flex: 1, paddingRight: 10}}>{item.Title}</Text>
        </View>
        <View style={{flexDirection: 'row', padding: 5}}>
          <Text style={{color: '#757575', width: 100}}>Cơ quan</Text>
          <Text style={{color: '#757575', fontWeight: 'bold', flex: 1}}>{item.Organization}</Text>
        </View>
        <View style={{flexDirection: 'row', padding: 5}}>
          <Text style={{color: '#757575', width: 100}}>Thời gian</Text>
          <Text style={{color: '#757575', fontWeight: 'bold', flex: 1}}>{item.CreatedAt}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const TTCB_HomeTab = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);
  const [isLoading, setIsLoading] = useState(false);
  const dataService = useSelector((state) => state.global.dataService);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    var data3 = await requestGET(`${dataService.CB_URL}/information`);
    var data4 = data3.data ? data3.data : [];
    setData(data4);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center'}} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item, index}) => <RenderItem item={item} index={index} navigation={navigation} />}
          keyExtractor={(item, index) => index.toString()}
          extraData={data}
          ListEmptyComponent={() => <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>}
        />
      )}
    </View>
  );
};

export default TTCB_HomeTab;

const styles = StyleSheet.create({});

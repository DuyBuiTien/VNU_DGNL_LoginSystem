/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {Button} from 'react-native-elements';

import {Header} from '../../components';
import {BlockLogin} from '../../components/common';
import {RenderItemDiChung} from '../../components/giaothong';
import {SearchComponent} from '../../components/common';
import axios from 'axios';

const DVC_MainScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);
  const random = useSelector((state) => state.global.random);

  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [active, setActive] = useState(-1);

  const dataService = useSelector((state) => state.global.dataService);

  const [dataDiChung, setDataDiChung] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  let arr = [
    {
      id: 0,
      name: 'Tất cả',
    },
    {
      id: 1,
      name: 'Đang đăng',
    },
    {
      id: 2,
      name: 'Hoàn thành',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let response = await axios({
        method: 'get',
        url: `${dataService.BOOKMARK_URL}/v1/dichungxe/dscanhan?page=0&perpage=100&TrangThai=${active}&q=${inputValue}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
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
  }, [refreshing, active, inputValue, random, dataService.BOOKMARK_URL, user.token]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Quản lý tin đăng" isStack={true} />

      {!user ? (
        <BlockLogin name="Đi chung xe" />
      ) : (
        <View style={{flex: 1}}>
          <SearchComponent value={inputValue} onChangeText={setInputValue} />

          <ScrollableTabView
            style={{}}
            renderTabBar={() => <ScrollableTabBar />}
            initialPage={0}
            onChangeTab={({i, r}) => setActive(i)}
            tabBarPosition="top"
            tabBarActiveTextColor="#757575"
            tabBarInactiveTextColor={'#BDBDBD'}
            tabBarUnderlineStyle={{backgroundColor: '#f44336', height: 2}}>
            {arr.map((item) => (
              <View style={{flex: 1}} tabLabel={item.name}>
                {isLoading ? (
                  <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center'}} />
                ) : (
                  <FlatList
                    onRefresh={() => {
                      setRefreshing(true);
                    }}
                    refreshing={refreshing}
                    contentContainerStyle={{flexGrow: 1}}
                    data={dataDiChung}
                    renderItem={(item_) => <RenderItemDiChung data={item_.item} navigation={navigation} />}
                    keyExtractor={(item_) => item_.Id}
                    ListEmptyComponent={() => (
                      <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>
                    )}
                  />
                )}
              </View>
            ))}
          </ScrollableTabView>
          <View
            style={{
              borderTopWidth: 0.5,
              borderTopColor: '#BDBDBD',
              backgroundColor: '#fff',
            }}>
            <Button
              title="Đăng tin"
              titleStyle={{fontSize: 16, color: '#fff', fontWeight: '600'}}
              containerStyle={{marginVertical: 10, marginHorizontal: 50}}
              buttonStyle={{borderRadius: 10, backgroundColor: '#EF6C00', paddingVertical: 10}}
              onPress={() => {
                navigation.navigate('GT_DiChung_DangTin_Screen');
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default DVC_MainScreen;

const styles = StyleSheet.create({});

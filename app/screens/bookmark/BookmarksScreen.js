/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, ActivityIndicator, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

import {Header} from '../../components';
import {ItemBookmark} from '../../components/bookmark';

const MainScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  let user = useSelector((state) => state.global.user);
  const dataService = useSelector((state) => state.global.dataService);

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [footerload, setFooterload] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const pageSize = 20;

  const fetchData = async () => {
    let response = await axios({
      method: 'get',
      url: `${dataService.BOOKMARK_URL}/v1/bookmark?page=${page}&perpage=${pageSize}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    page === 0 ? setData(response.data.data) : setData([...data, ...response.data.data]);

    setFooterload(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing, page]);

  useEffect(() => {
    setLoading(true);
    fetchData().then(() => {
      setLoading(false);
    });

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Danh sách đã lưu" isStack={true} />
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <ActivityIndicator size="large" color="#fb8c00" />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{flexGrow: 1, padding: 10}}
          data={data}
          renderItem={({item, index}) => <ItemBookmark item={item} index={index} navigation={navigation} />}
          onRefresh={() => {
            setRefreshing(true);
            setPage(0);
          }}
          refreshing={refreshing}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => <></>}
          onEndReached={() => {
            //getLoadMore();
            setFooterload(true);
            setPage(page + 1);
          }}
          ListFooterComponent={footerload ? <ActivityIndicator /> : <View />}
          onEndReachedThreshold={0}
        />
      )}
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});

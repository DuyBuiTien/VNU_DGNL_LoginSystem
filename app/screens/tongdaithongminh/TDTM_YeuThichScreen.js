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
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';

import {Header, Icon} from 'react-native-elements';
import {ItemDanhBa} from '../../components/tongdaithongminh';
import {SearchComponent} from '../../components/common';

const MainScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const user = useSelector((state) => state.global.user);
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
      url: `${dataService.BOOKMARK_URL}/v1/bookmark?page=${page}&perpage=${pageSize}&ContentType=bookmark_tongdaithongminh`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    let tmpdata = response.data.data;
    tmpdata.map((i) => {
      i.HotLine = {
        Address: i.AddressDetail,
        CallCount: 0,
        Category: null,
        CategoryID: null,
        Detail: i.TopicTitle,
        ID: i.TopicId,
        IsDefault: false,
        Lat: i.Latitude,
        Long: i.Longitude,
        Phone: i.Phone,
        Title: i.TopicTitle,
        image: i.CoverUrl,
      };
    });

    page === 0 ? setData(tmpdata) : setData([...data, ...tmpdata]);

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

  const [isLoading, setIsLoading] = useState(false);

  const {title} = route.params;

  const [inputValue, setInputValue] = useState('');

  const onPress = (item) => {};
  const swipLeft = (item) => {
    Linking.openURL(Platform.OS === 'android' ? `tel:${item.HotLine.Phone}` : `telprompt:${item.HotLine.Phone}`);
  };

  const swipRight = async (item) => {
    let response = await axios({
      method: 'post',
      url: `${dataService.BOOKMARK_URL}/v1/bookmark`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      data: {
        IsOwned: false,
        TopicId: item.HotLine.ID,
        TopicTitle: item.HotLine.Detail,
        CategoryId: null,
        CategoryName: 'Tổng đài thông minh',
        ContentType: 'bookmark_tongdaithongminh',
        CoverUrl: item.HotLine.image,
        Latitude: item.HotLine.Lat,
        Longitude: item.HotLine.Long,
        AddressDetail: item.HotLine.Address,
        DateStart: null,
        TimeStart: null,
        DateEnd: null,
        TimeEnd: null,
        Navigate: null,
        Phone: item.HotLine.Phone,
        Link: null,
      },
    });
    setRefreshing(true);
    setPage(0);
    if (response.data && response.data.created) {
      showMessage({
        message: 'Thành công',
        description: 'Danh dạ được thêm thành công!',
        type: 'success',
      });
    } else {
      showMessage({
        message: 'Thành công',
        description: 'Danh dạ đã được bỏ yêu thích!',
        type: 'success',
      });
    }
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
              style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'red', padding: 5, borderRadius: 100}}>
              <Icon name={'star'} color="#FFF" underlayColor="#00000000" containerStyle={{paddingStart: 0}} size={16} />
              <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 14}}>Yêu thích</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )
        }
        containerStyle={{backgroundColor: '#FFF', justifyContent: 'space-around'}}
        centerContainerStyle={{justifyContent: 'center'}}
      />
      <SearchComponent value={inputValue} onChangeText={setInputValue} keyboardType={'web-search'} />

      {isLoading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center'}} />
      ) : (
        <FlatList
          contentContainerStyle={{flexGrow: 1, padding: 10}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data}
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
          onRefresh={() => {
            setRefreshing(true);
            setPage(0);
          }}
          refreshing={refreshing}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => {
            //getLoadMore();
            setFooterload(true);
            setPage(page + 1);
          }}
          ListFooterComponent={footerload ? <ActivityIndicator /> : <View />}
          onEndReachedThreshold={0}
          ListEmptyComponent={() => <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>}
        />
      )}
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});

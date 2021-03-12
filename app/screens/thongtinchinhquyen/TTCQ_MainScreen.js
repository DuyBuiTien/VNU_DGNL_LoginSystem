/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, TextInput, Keyboard, FlatList, ImageBackground} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Icon} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {showMessage} from 'react-native-flash-message';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

import {Button} from 'react-native-elements';

import {requestGET} from '../../services/Api';

import {Header} from '../../components';

import moment from 'moment';
moment.locale('vi');

const RenderItem = (props) => {
    const {item, navigation} = props;
    return (
      <TouchableOpacity
      onPress={() => {navigation.navigate("TTCQ_DetailScreen", {data: item})}}
        style={{
          flex: 1,
          flexDirection: 'column',
          width: 300,
          marginEnd: 10,
          marginVertical: 10,
          backgroundColor: '#FFFFFF',
          borderRadius: 5,
          borderWidth: 0.5,
          borderColor: '#f44336'
  
        }}>
        <ImageBackground
          resizeMode="cover"
          style={{
            height: 100,
          }}
          imageStyle={{borderRadius: 5}}
          source={{uri: item.thumbnail?item.thumbnail:'https://file1.dangcongsan.vn/DATA/0/2018/07/thaibinh20-17_53_38_549.jpg'}}
        />
        <View style={{height: 80, padding: 10}}>
          <Text style={{fontSize: 14}} numberOfLines={2}>{item.title}</Text>
          <View style={{flexDirection: 'row', paddingTop: 10}}>
            <FontAwesome name='clock' size={16} color='#9E9E9E' />
            <Text style={{color: '#9E9E9E', fontSize: 12, paddingLeft: 10}}>{moment(item.created_at).format('L')}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

const RenderItem2 = (props) => {
    const {item, navigation, category} = props;
    return (
    <TouchableOpacity
        onPress={() => {navigation.navigate("TTCQ_DetailScreen", {data: item})}}
        style={{
        flexDirection: 'row',
        padding: 10,
        margin: 5,
        alignItems: 'center'
        }}>
        <ImageBackground imageStyle={{borderRadius: 5}} resizeMode='cover' style={{ width: 80, height: 80}} source={{uri: item.thumbnail?item.thumbnail:'https://file1.dangcongsan.vn/DATA/0/2018/07/thaibinh20-17_53_38_549.jpg'}}></ImageBackground>
        <View style={{flex: 1, marginStart: 10}}>
            <Text style={{color: '#f44336', fontSize: 12, fontWeight: 'bold', lineHeight: 30}}>{category}</Text>
            <Text numberOfLines={2} style={{fontWeight: 'bold'}}>{item.title}</Text>
            <Text style={{color: '#9E9E9E', fontSize: 12, lineHeight: 30}}>{moment(item.created_at).format('L')}</Text>
        </View>
    </TouchableOpacity>
    );
};

const RenderItem3 = (props) => {
    const {item, navigation} = props;
    return (
      <TouchableOpacity
        onPress={() => {navigation.navigate("TTCQ_DetailVBScreen", {data: item})}}
        style={{
          flexDirection: 'row',
          padding: 10,
          margin: 5,
          alignItems: 'center'
        }}>
        <ImageBackground imageStyle={{borderRadius: 5}} resizeMode='cover' style={{ width: 60, height: 60}} source={require("../../Images/tctt.png")}></ImageBackground>
        <View style={{flex: 1, marginStart: 10}}>
            <Text style={{color: '#f44336', fontSize: 12, fontWeight: 'bold', lineHeight: 30}}>Văn bản điều hành</Text>
            <Text numberOfLines={2} style={{fontWeight: 'bold'}}>{item.subject}</Text>
            <Text style={{color: '#9E9E9E', fontSize: 12, lineHeight: 30}}>{moment(item.created_at).format('L')}</Text>
        </View>
      </TouchableOpacity>
    );
  };

const TTCQ_MainScreen = () => {
  const navigation = useNavigation();
  const dataService = useSelector((state) => state.global.dataService);

  const [dataNB, setDataNB] = useState([]);
  const [dataTM, setDataTM] = useState([]);
  const [dataVB, setDataVB] = useState([]);
  const [dataTT, setDataTT] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    var data1 = await requestGET(`${dataService.TT_URL}/GetDuLieuTinBai?page=1&limit=20&sync_time=0`);
    var data2 = data1.data ? data1.data : [];
    setDataNB(data2.slice(0,6))
    setDataTM(data2)

    var data3 = await requestGET(`${dataService.TT_URL}/GetDanhSachVanBan?page=0&limit=20&sync_time=0`);
    var data4 = data3.data ? data3.data : [];
    setDataVB(data4)

    var data5 = await requestGET(`${dataService.TT_URL}/GetDuLieuTinBai?page=2&limit=20&sync_time=0`);
    var data6 = data5.data ? data5.data : [];
    setDataTT(data6)

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <Header title="Thông tin từ chính quyền" isStack={true} />
      <View style={{flex: 1}}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center'}} />
      ) : (
        <>
            <View style={{padding: 20, paddingRight: 0, paddingBottom: 0}}>
            <Text style={{paddingRight: 20, paddingBottom: 10}}>Các thông tin chính thức từ UBND Tỉnh và các Sở Ban ngành của Tỉnh</Text>
                <View style={styles.viewHeader}>
                  <Text style={styles.textHeaderTitle}>   Nổi bật </Text>
                  <TouchableOpacity
                    style={{flexDirection: 'row'}}
                    activeOpacity={0.8}
                    onPress={() => {}}>
                    <Text style={styles.textHeaderAll}>  </Text>
                    <Icon name='chevron-down' type="font-awesome" size={16} color='#f44336' />
                  </TouchableOpacity>
                </View>
                <FlatList
                  horizontal
                  scrollEnabled
                  scrollEventThrottle={16}
                  showsHorizontalScrollIndicator={false}
                  snapToAlignment="center"
                  data={dataNB}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => <RenderItem item={item} index={index} navigation={navigation}/>}
                  ListEmptyComponent={() => (
                    <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>
                  )}
                />
            </View>
            <View style={{flex: 1}}>
            <ScrollableTabView
                style={{flex: 1}}
                tabBarPosition='top'
                initialPage={0}
                tabBarUnderlineStyle={{height: 1,backgroundColor: '#f44336'}}
                tabBarActiveTextColor='#f44336'
                renderTabBar={() => <ScrollableTabBar />}
                >
                  <View tabLabel='TIN MỚI' style={styles.tabView}>
                      <FlatList
                          data={dataTM}
                          keyExtractor={(item,index) => index.toString()}
                          renderItem={({item, index}) => <RenderItem2 category="Tin mới" item={item} index={index} navigation={navigation}/>}
                          ListEmptyComponent={() => (
                            <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>
                          )}
                      />
                  </View>
                  <View tabLabel='VĂN BẢN' style={styles.tabView}>
                      <FlatList
                          data={dataVB}
                          keyExtractor={(item,index) => index.toString()}
                          renderItem={({item, index}) => <RenderItem3 item={item} index={index} navigation={navigation}/>}
                          ListEmptyComponent={() => (
                            <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>
                          )}
                      />
                  </View>
                  <View tabLabel='CHỈ ĐẠO CỦA UBND TỈNH' style={styles.tabView}>
                      <FlatList
                          data={dataTT}
                          keyExtractor={(item,index) => index.toString()}
                          renderItem={({item, index}) => <RenderItem2 category="Chỉ đạo của UBND tỉnh" item={item} index={index} navigation={navigation}/>}
                          ListEmptyComponent={() => (
                            <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>
                          )}
                      />
                  </View>
                  <View tabLabel='CHỈ ĐẠO CỦA TỈNH UỶ' style={styles.tabView}>
                      <FlatList
                          data={dataTT}
                          keyExtractor={(item,index) => index.toString()}
                          renderItem={({item, index}) => <RenderItem2 category="Chỉ đạo của Tỉnh Uỷ" item={item} index={index} navigation={navigation}/>}
                          ListEmptyComponent={() => (
                            <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>
                          )}
                      />
                  </View>
                  <View tabLabel='KINH TẾ' style={styles.tabView}>
                      <FlatList
                          data={dataTT}
                          keyExtractor={(item,index) => index.toString()}
                          renderItem={({item, index}) => <RenderItem2 category="Kinh tế" item={item} index={index} navigation={navigation}/>}
                          ListEmptyComponent={() => (
                            <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>
                          )}
                      />
                  </View>
            </ScrollableTabView>
            </View>
        </>
      )}
      </View>
    </View>
  );
};

export default TTCQ_MainScreen;

const styles = StyleSheet.create({
    tabView: {
        flexGrow: 1,
        //padding: 10,
    },
    viewHeader: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginVertical: 10,
        flexDirection: 'row',
        borderLeftWidth: 2,
        borderLeftColor: '#f44336',
        paddingRight: 20
      },
      textHeaderTitle: {fontSize: 18, color: '#3D4458', fontWeight: '600'},
      textHeaderAll: {color: '#f44336', fontStyle: 'italic'},
      viewIcon: {
        marginHorizontal: 10,
        padding: 15,
        backgroundColor: '#FBEDEB',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      },
      textCount: {fontWeight: 'bold', fontSize: 17, color: '#3D4458'},
      textTitle: {color: '#B2B4C6'},
});

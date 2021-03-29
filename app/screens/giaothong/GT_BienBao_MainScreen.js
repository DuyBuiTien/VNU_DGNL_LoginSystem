/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

import {Header} from '../../components';
import GT_NOTICE_BOARD_TYPE from '../../data/GT_NOTICE_BOARD_TYPE.json';
import GT_NOTICE_BOARD from '../../data/GT_NOTICE_BOARD.json';
import {SearchComponent} from '../../components/common';
import {ItemBienBao} from '../../components/giaothong';

const GT_BienBao_MainScreen = () => {
  const [dataBienBao, setDataBienBao] = useState(GT_NOTICE_BOARD);
  const [data, setData] = useState([]);
  const [active, setActive] = useState(-1);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setData(
      GT_NOTICE_BOARD.filter((item) => {
        if (active > 0) {
          if (item.Type_ID === GT_NOTICE_BOARD_TYPE[active].Type_ID) {
            return item;
          }
        } else {
          return item;
        }
      }),
    );
    return () => {};
  }, [active, dataBienBao]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Biển báo giao thông" isStack={true} />
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
          {GT_NOTICE_BOARD_TYPE.map((item) => (
            <View style={{flex: 1}} tabLabel={item.Type_Name}>
              <FlatList
                contentContainerStyle={{flexGrow: 1}}
                data={data.filter((i) => {
                  const trangthai = i.Name.toUpperCase();
                  const name = i.NameEN.toUpperCase();
                  return name.indexOf(inputValue.toUpperCase()) > -1 || trangthai.indexOf(inputValue.toUpperCase()) > -1;
                })}
                renderItem={(item_) => <ItemBienBao data={item_.item} />}
                keyExtractor={(item_) => item_.Id}
                ListEmptyComponent={() => (
                  <Text style={{textAlign: 'center', color: '#50565B', marginTop: 10}}>Không có kết quả</Text>
                )}
              />
            </View>
          ))}
        </ScrollableTabView>
      </View>
    </View>
  );
};

export default GT_BienBao_MainScreen;

const styles = StyleSheet.create({});

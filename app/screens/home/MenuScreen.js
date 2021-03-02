/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, Dimensions, FlatList} from 'react-native';
import {Header, Icon, Divider} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {showMessage} from 'react-native-flash-message';

import _ from 'lodash';

import * as actions from '../../redux/global/Actions';

const _w = Dimensions.get('screen').width < 500 ? 50 : 70;
const _h = Dimensions.get('screen').width < 500 ? 50 : 70;
const _b = Dimensions.get('screen').width < 500 ? 20 : 30;
const _i = Dimensions.get('screen').width < 500 ? 25 : 30;

const RenderItemMenu = (props) => {
  const {item, editing, favor, onPress} = props;
  return (
    <TouchableOpacity
      key={item.appid}
      onPress={() => {
        onPress(item);
      }}
      style={{justifyContent: 'center', alignItems: 'center', padding: 5, width: '25%'}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: _h,
          width: _w,
          backgroundColor: item.color,
          borderRadius: _b,
        }}>
        <FontAwesome name={item.icon} color="#fff" size={_i} containerStyle={styles.icon} />
        {editing && favor ? (
          <View
            style={{
              height: 25,
              width: 25,
              borderRadius: 20,
              backgroundColor: '#03A9F4',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              right: -5,
              top: -5,
            }}>
            <FontAwesome name="times" color="#fff" size={16} />
          </View>
        ) : editing && !favor ? (
          <View
            style={{
              height: 25,
              width: 25,
              borderRadius: 20,
              backgroundColor: '#03A9F4',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              right: -5,
              top: -5,
            }}>
            <FontAwesome name="plus" color="#fff" size={16} />
          </View>
        ) : (
          <></>
        )}
      </View>
      <Text style={{width: _w + 30, textAlign: 'center', paddingTop: 10, height: 50}}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const MenuScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const dataMenuCaNhan = useSelector((state) => state.global.dataMenuCaNhan);
  const dataMenu = useSelector((state) => state.global.dataMenu);

  const [isEditing, setisEditing] = useState(false);
  const [isEdited, setisEdited] = useState(false);

  const [dataMenuMainFavor, setDataMenuMainFavor] = useState([]);
  const [dataMenuMainOther, setdataMenuMainOther] = useState([]);

  useEffect(() => {
    const menuCaNhanTMP = JSON.parse(JSON.stringify(dataMenuCaNhan));
    let datamenusFavor = [];
    let datamenusOther = [];
    if (menuCaNhanTMP && menuCaNhanTMP.length > 0) {
      dataMenu.map((i) => {
        let check = false;

        menuCaNhanTMP.map((j) => {
          if (i.appid === j) {
            check = true;
            datamenusFavor.push(i);
          }
        });

        if (!check) {
          datamenusOther.push(i);
        }
      });
    } else {
      dataMenu.map((i) => {
        if (i.menumain) {
          datamenusOther.push(i);
        }
      });
    }
    setDataMenuMainFavor(datamenusFavor);
    setdataMenuMainOther(datamenusOther);
    return () => {};
  }, [dataMenu, dataMenuCaNhan]);

  const Huy = () => {
    if (isEdited) {
      Alert.alert(
        'Bạn có chắc muốn thoát',
        'Vị trí mới của các dịch vụ bạn vừa chỉnh sửa sẽ không được lưu lại',
        [
          {text: 'SỬA TIẾP', onPress: () => console.log('Thoat')},
          {
            text: 'THOÁT',
            onPress: () => {
              navigation.goBack();
            },
          },
        ],
        {cancelable: false},
      );
    } else {
    }
  };

  const RemoveItem = (item) => {
    if (dataMenuMainFavor.length > 3) {
      setisEdited(true);
      let tmpFavor = dataMenuMainFavor.filter((i) => i.appid !== item.appid);
      let tmpOther = [...dataMenuMainOther, item];

      setDataMenuMainFavor(tmpFavor);
      setdataMenuMainOther(tmpOther);
    } else {
      showMessage({
        message: 'Lỗi',
        description: 'Mục yêu thích cần ít nhất 3 dịch vụ',
        type: 'danger',
      });
    }
  };

  const AddItem = (item) => {
    if (dataMenuMainFavor.length < 7) {
      setisEdited(true);
      let tmpOther = dataMenuMainOther.filter((i) => i.appid !== item.appid);
      let tmpFavor = [...dataMenuMainFavor, item];

      setDataMenuMainFavor(tmpFavor);
      setdataMenuMainOther(tmpOther);
    } else {
      showMessage({
        message: 'Lỗi',
        description: 'Mục yêu thích cần nhiều nhất 7 dịch vụ',
        type: 'danger',
      });
    }
  };

  const Save = () => {
    let tmp = [];
    dataMenuMainFavor.map((item) => {
      tmp.push(item.appid);
    });

    dispatch(actions.setMenuFavor(tmp));
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        placement="left"
        leftComponent={
          <Icon
            name={isEditing ? 'close' : 'arrow-back'}
            color="#2E2E2E"
            underlayColor="#00000000"
            containerStyle={{paddingStart: 0, marginHorizontal: 10}}
            onPress={() => {
              if (isEditing) {
                Huy();
              } else {
                navigation.goBack();
              }
            }}
          />
        }
        centerComponent={{text: 'Quản lý dịch vụ', style: {color: '#2E2E2E', fontSize: 20, fontWeight: 'bold'}}}
        rightComponent={
          <TouchableOpacity
            onPress={() => {
              setisEditing(!isEditing);
              if (isEditing) {
                Save();
              }
            }}>
            <Text style={{fontWeight: 'bold', color: '#446CE1'}}>{isEditing ? 'Lưu' : 'Sửa'}</Text>
          </TouchableOpacity>
        }
        containerStyle={{backgroundColor: '#FFF'}}
      />
      <ScrollView>
        <View>
          <Text style={{padding: 20, fontSize: 18, fontWeight: '600'}}>Các dịch vụ yêu thích</Text>
          <FlatList
            data={dataMenuMainFavor}
            renderItem={({item, index}) => (
              <RenderItemMenu
                item={item}
                index={index}
                navigation={navigation}
                favor={true}
                editing={isEditing}
                onPress={RemoveItem}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{padding: 10}}
            numColumns={4}
          />
        </View>
        <Divider style={{backgroundColor: '#F5F5F5', height: 8}} />
        <View>
          <Text style={{padding: 20, fontSize: 18, fontWeight: '600'}}>Các dịch vụ khác</Text>
          <FlatList
            data={dataMenuMainOther}
            renderItem={({item, index}) => (
              <RenderItemMenu
                item={item}
                index={index}
                navigation={navigation}
                favor={false}
                editing={isEditing}
                onPress={AddItem}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{padding: 10}}
            numColumns={4}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({});

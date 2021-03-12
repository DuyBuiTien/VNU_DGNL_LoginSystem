/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, ImageBackground, Dimensions, Platform, Image, TextInput} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Header, Icon} from 'react-native-elements';
import {Divider} from 'react-native-elements';
import {Button} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';

const MainScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const data = route.params?.data ?? {};

  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const [noidung, setNoidung] = useState('');

  const TimKiem = () => {
    if (inputValue.length < 7) {
      showMessage({
        message: 'Lỗi!',
        description: 'Vui lòng nhập lại biển số xe',
        type: 'danger',
        duration: 3000,
      });
      setNoidung('');
    } else {
      setTimeout(() => {
        setNoidung(`Xe ${inputValue} không có phạt nguội nào`);
      }, 1000);
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
          text: 'Kiểm tra phạt nguội',
          style: {color: '#2E2E2E', fontSize: 16, fontWeight: 'bold'},
        }}
        rightComponent={
          <View style={{flexDirection: 'row'}}>
            <FontAwesome name={'share-alt'} color="#2E2E2E" containerStyle={{paddingStart: 0}} onPress={() => {}} size={20} />
          </View>
        }
        containerStyle={{backgroundColor: 'transparent', justifyContent: 'space-around'}}
        centerContainerStyle={{justifyContent: 'center'}}
      />
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: '#FFF',
              flexDirection: 'row',
              borderRadius: 4,
              padding: 8,
              margin: 10,
              alignItems: 'center',
              flex: 1,
              borderColor: '#eeeeee',
              borderWidth: 0.5,
            }}>
            <FontAwesome name="search" color="#787C7E" size={20} style={{marginHorizontal: 5}} />
            <TextInput
              placeholder={'Nhập biển, VD: 30A38931, 29C11771...'}
              multiline={false}
              onChangeText={(text) => {
                setInputValue(text);
              }}
              value={inputValue}
              selectionColor={'gray'}
              onSubmitEditing={TimKiem}
              clearButtonMode="always"
              style={{flex: 1, margin: 10, fontSize: 15}}
              keyboardType={'web-search'}
            />
          </View>
          <Text style={{marginHorizontal: 10, fontStyle: 'italic', color: '#bf360c', fontSize: 12, fontWeight: '200'}}>
            Ghi chú: Nhập biển số xe không dấu "-" hoặc ".". VD 30A38931, 29C11771...
          </Text>

          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10}}>
            <FontAwesome name={'info-circle'} color={'#2196f3'} />
            <Text style={{color: '#2196f3', marginStart: 5}}>LÝ DO KHÔNG TRA ĐƯỢC PHẠT NGUỘI</Text>
          </View>
          {noidung.length > 5 ? (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 200}}>
              <Text style={{fontSize: 18, fontWeight: '600', color: '#37474f'}}>Chúc mừng bạn</Text>
              <Text style={{color: '#607d8b'}}>{noidung}</Text>
            </View>
          ) : (
            <></>
          )}
        </ScrollView>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopWidth: 0.5,
          borderTopColor: '#BDBDBD',
          backgroundColor: '#fff',
        }}>
        <Button
          title="Tra cứu"
          titleStyle={{fontSize: 16, color: '#fff', fontWeight: '600'}}
          containerStyle={{margin: 10, marginHorizontal: 50, marginBottom: 30}}
          buttonStyle={{borderRadius: 10, backgroundColor: '#EF6C00', paddingVertical: 10}}
          onPress={() => {
            TimKiem();
          }}
        />
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});

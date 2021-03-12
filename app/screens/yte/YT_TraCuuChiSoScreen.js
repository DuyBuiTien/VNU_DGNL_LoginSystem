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
  const [chieucao, setChieucao] = useState('');

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
          text: 'Tra cứu chỉ số sức khoẻ',
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
              padding: 4,
              margin: 10,
              alignItems: 'center',
              flex: 1,
              borderColor: '#eeeeee',
              borderWidth: 0.5,
            }}>
            <TextInput
              placeholder={'Cân nặng'}
              multiline={false}
              onChangeText={(text) => {
                setInputValue(text);
              }}
              value={inputValue}
              selectionColor={'gray'}
              clearButtonMode="always"
              style={{flex: 1, margin: 10, fontSize: 14}}
            />
          </View>
          <View
            style={{
              backgroundColor: '#FFF',
              flexDirection: 'row',
              borderRadius: 4,
              padding: 4,
              margin: 10,
              alignItems: 'center',
              flex: 1,
              borderColor: '#eeeeee',
              borderWidth: 0.5,
            }}>
            <TextInput
              placeholder={'Chiều cao'}
              multiline={false}
              onChangeText={(text) => {
                setChieucao(text);
              }}
              value={chieucao}
              selectionColor={'gray'}
              clearButtonMode="always"
              style={{flex: 1, margin: 10, fontSize: 14}}
            />
          </View>
          <Text style={{marginHorizontal: 10, fontStyle: 'italic', color: '#bf360c', fontSize: 12, fontWeight: '200'}}>
            Ghi chú: Chỉ số sức khoẻ là chỉ số khối cơ thể được dùng để đánh giá mức độ gầy hay béo của một người, áp dụng cho
            người trên 19 tuổi.
          </Text>

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

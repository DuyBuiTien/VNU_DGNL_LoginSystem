/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import {Text, Button, Input} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {Header} from 'react-native-elements';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ItemTextInput} from '../../components/common';

//import Base64 from '../../utils/Base64';
import * as actions from '../../redux/global/Actions';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');

  const dispatch = useDispatch();
  const dataApp = useSelector((state) => state.global.dataApp);

  const {actionsLoading, error} = useSelector(
    (state) => ({
      actionsLoading: state.global.actionsLoading,
      error: state.global.error,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (error) {
      showMessage({
        message: 'Thất bại',
        description: 'Gửi thông tin khôi phục mật khẩu thất bại',
        type: 'danger',
      });
    }
    return () => {};
  }, [error]);

  const [textInput, setTextInput] = useState('');

  const handleOnpress = async () => {
    Keyboard.dismiss();
    showMessage({
      message: 'Thành công',
      description: 'Thông tin về tài khoản được gửi về địa chỉ thư điện tử của bạn!',
      type: 'success',
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <Header
        statusBarProps={{barStyle: 'dark-content', backgroundColor: 'transparent', translucent: true}}
        barStyle="dark-content"
        placement="left"
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name={'long-arrow-left'}
              size={25}
              color="#2E2E2E"
              underlayColor="#00000000"
              containerStyle={{paddingStart: 0, marginHorizontal: 10}}
            />
          </TouchableOpacity>
        }
        centerComponent={{
          text: '',
          style: {color: '#2E2E2E', fontSize: 18, fontWeight: 'bold'},
        }}
        containerStyle={{backgroundColor: '#FFF', justifyContent: 'space-around'}}
        centerContainerStyle={{justifyContent: 'center'}}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled
          keyboardVerticalOffset={150}>
          <View style={styles.container}>
            <Text style={styles.header_1}>{'QUÊN MẬT KHẨU'}</Text>

            <View style={{padding: 10, margin: 10}}>
              <ItemTextInput
                value={username}
                onChangeText={setUsername}
                placeholder={'Tên đăng nhập'}
                icon={'user'}
                title={'Tên đăng nhập'}
              />

              <ItemTextInput
                value={username}
                onChangeText={setUsername}
                placeholder={'Thư điện tử'}
                icon={'user'}
                title={'Thư điện tử'}
              />

              <Button
                onPress={() => handleOnpress()}
                title={'Gửi thông tin xác nhận'}
                loading={actionsLoading}
                titleStyle={{fontSize: 14, fontWeight: 'bold'}}
                buttonStyle={styles.btn}
              />
            </View>
          </View>

          {actionsLoading && <View style={styles.loading} />}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  containerLoginForm: {
    //backgroundColor: '#E7E7E7',
    padding: 10,
    margin: 10,
    borderRadius: 20,
  },

  header_1: {
    color: '#2E529F',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  btn: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
    marginTop: 20,
  },
  textLuaChon: {color: 'white', fontWeight: 'bold'},
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinputContainer: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderRadius: 4,
    padding: 0,
    margin: 10,
    alignItems: 'center',
    shadowColor: '#2E529F',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    borderColor: '#abb4bd65',
    shadowRadius: 2,
    elevation: 2,
  },
  textinput: {flex: 1, paddingVertical: 10},
});

/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {
  StatusBar,
  View,
  StyleSheet,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import TouchID from 'react-native-touch-id';
import {Text, Button, Input} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {SocialIcon} from 'react-native-elements';
import {Header} from 'react-native-elements';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ItemTextInput} from '../../components/common';

//import Base64 from '../../utils/Base64';
import * as actions from '../../redux/global/Actions';

const LoginScreen = () => {
  const navigation = useNavigation();

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
        description: 'Xác thực thất bại',
        type: 'danger',
      });
    }
    return () => {};
  }, [error]);

  //  const user = useSelector(state => state.global.user);

  const username_tmp = useSelector((state) => state.global.username_tmp);
  const password_tmp = useSelector((state) => state.global.password_tmp);

  const [username, setUsername] = useState(username_tmp);
  const [password, setPassword] = useState('');
  // const checkXacThucVanTay = useSelector((state) => state.global.XacThucVanTay);
  const checkXacThucVanTay = true;

  const DangNhapBangVanTay = () => {
    TouchID.isSupported()
      .then(authenticate())
      .catch(() => {
        showMessage({
          message: 'Thất bại',
          description: 'Điện thoại của bạn không hỗ trợ xác thực sinh trắc học!',
          type: 'danger',
        });
      });
  };

  const authenticate = () => {
    return TouchID.authenticate('Xác thực dấu vân tay của bạn để tiếp tục', {
      title: 'Authentication Required', // Android
      imageColor: '#e00606', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: 'Touch sensor', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: 'Cancel', // Android
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: true, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    })
      .then((success) => {
        handleLogin(username_tmp, password_tmp);
      })
      .catch((errorr) => {
        console.log(errorr);

        showMessage({
          message: 'Thất bại',
          description: 'Xác thực thất bại',
          type: 'danger',
        });
      });
  };

  const handleLogin = async (username_, password_) => {
    Keyboard.dismiss();
    if (!username_ || !password_) {
      showMessage({
        message: 'Thất bại',
        description: 'Chưa nhập đầy đủ trường thông tin!',
        type: 'danger',
      });
      return;
    }

    dispatch(actions.login(username_, password_)).then(() => {
      //dispatch(actions.GetUserInfo());
      navigation.navigate('TrangChuScreen');
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      {/* <StatusBar backgroundColor="#00000000" barStyle="light-content" translucent={true} /> */}
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
            <Text style={styles.header_1}>{dataApp?.title ?? 'ĐĂNG NHẬP'}</Text>

            <Text style={styles.header_2}>{dataApp.name}</Text>

            <View style={{padding: 10, margin: 10, width: '100%'}}>
              <ItemTextInput
                value={username}
                onChangeText={setUsername}
                placeholder={'Tên đăng nhập'}
                icon={'user'}
                title={'Tên đăng nhập'}
              />

              <ItemTextInput
                showEye={true}
                value={password}
                onChangeText={setPassword}
                placeholder={'Mật khẩu'}
                icon={'key'}
                title={'Mật khẩu'}
              />

              {/* {checkXacThucVanTay ? (
                <TouchableOpacity
                  onPress={() => {
                    DangNhapBangVanTay();
                  }}>
                  <View style={styles.containerXacThuc}>
                    <Icon name="fingerprint" size={24} color="#A2A6A8" />
                    <Text style={{paddingStart: 10, color: 'white'}}>Mở khoá bằng vân tay</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <></>
              )} */}

              <Button
                onPress={() => handleLogin(username, password)}
                title={'ĐĂNG NHẬP'}
                loading={actionsLoading}
                titleStyle={{fontSize: 14, fontWeight: 'bold'}}
                buttonStyle={styles.btDangNhap}
              />

              {/* <Text style={{textAlign: 'center', color: '#A2A6A8', marginTop: 20}}>- Kết nối với tài khoản xã hội của bạn -</Text>

              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                <SocialIcon style={{marginHorizontal: 20}} type="facebook" />
                <SocialIcon style={{marginHorizontal: 20}} type="google" />
                <SocialIcon style={{backgroundColor: 'black', marginHorizontal: 20}} type="apple" />
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
                <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                  <Text style={{textAlign: 'center', color: '#2E529F', fontWeight: 'bold'}}>Đăng ký</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotScreen')}>
                  <Text style={{textAlign: 'center', color: '#2E529F', fontWeight: 'bold', marginStart: 10}}>Quên mật khẩu</Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </View>

          {/* {actionsLoading && <View style={styles.loading} />} */}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  containerLoginForm: {
    //backgroundColor: '#E7E7E7',
    padding: 10,
    margin: 10,
    borderRadius: 20,
  },
  containerXacThuc: {
    flexDirection: 'row',
    paddingTop: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLuaChon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    margin: 10,
  },
  header_1: {
    color: '#2E529F',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  header_2: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  input: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {color: '#fff', paddingStart: 10},
  btDangNhap: {
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
});

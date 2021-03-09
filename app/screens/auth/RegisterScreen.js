/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
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
import {RectButton} from 'react-native-gesture-handler';

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
  const [hide, isHide] = useState(false);
  const checkXacThucVanTay = useSelector((state) => state.global.XacThucVanTay);

  let fcmToken = useSelector((state) => state.global.fcmToken);
  if (fcmToken == null) {
    fcmToken = '';
  }

  const eyepass = () => {
    if (hide) {
      return <Icon name="eye" type="font-awesome" size={18} color="#EEEEEE" onPress={() => isHide(!hide)} />;
    } else {
      return <Icon name="eye-slash" type="font-awesome" size={18} color="#BDBDBD" onPress={() => isHide(!hide)} />;
    }
  };

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
      dispatch(actions.GetUserInfo());
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      {/* <StatusBar backgroundColor="#00000000" barStyle="light-content" translucent={true} /> */}
      <Header
        statusBarProps={{barStyle: 'light-content', backgroundColor: 'transparent', translucent: true}}
        barStyle="light-content"
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

      <ScrollView containerStyle={styles.container}>
        <Text style={styles.header_1}>{dataApp?.title ?? 'ĐĂNG KÝ'}</Text>

        <View style={{padding: 10, margin: 10, width: '100%'}}>
          <View
            style={{
              backgroundColor: '#FFF',
              flexDirection: 'row',
              borderRadius: 4,
              padding: 8,
              margin: 10,
              alignItems: 'center',
              shadowColor: '#2E529F',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
            }}>
            <FontAwesome name="user" color="#787C7E" size={20} style={{marginHorizontal: 5}} />
            <TextInput
              placeholder={'Họ và tên'}
              multiline={false}
              onChangeText={(text) => {
                setUsername(text);
              }}
              value={username}
              selectionColor={'gray'}
              clearButtonMode="always"
              style={{flex: 1, margin: 10, fontSize: 15}}
            />
          </View>
          <View
            style={{
              backgroundColor: '#FFF',
              flexDirection: 'row',
              borderRadius: 4,
              padding: 8,
              margin: 10,
              alignItems: 'center',
              shadowColor: '#2E529F',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
            }}>
            <FontAwesome name="at" color="#787C7E" size={20} style={{marginHorizontal: 5}} />
            <TextInput
              placeholder={'Email'}
              multiline={false}
              onChangeText={(text) => {
                setUsername(text);
              }}
              value={username}
              selectionColor={'gray'}
              clearButtonMode="always"
              style={{flex: 1, margin: 10, fontSize: 15}}
            />
          </View>
          <View
            style={{
              backgroundColor: '#FFF',
              flexDirection: 'row',
              borderRadius: 4,
              padding: 8,
              margin: 10,
              alignItems: 'center',
              shadowColor: '#2E529F',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
            }}>
            <FontAwesome name="phone" color="#787C7E" size={20} style={{marginHorizontal: 5}} />
            <TextInput
              placeholder={'Số điện thoại'}
              multiline={false}
              onChangeText={(text) => {
                setUsername(text);
              }}
              value={username}
              selectionColor={'gray'}
              clearButtonMode="always"
              style={{flex: 1, margin: 10, fontSize: 15}}
            />
          </View>
          <View
            style={{
              backgroundColor: '#FFF',
              flexDirection: 'row',
              borderRadius: 4,
              padding: 8,
              margin: 10,
              alignItems: 'center',
              shadowColor: '#2E529F',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
            }}>
            <FontAwesome name="key" color="#787C7E" size={20} style={{marginHorizontal: 5}} />
            <TextInput
              placeholder={'Mật khẩu'}
              multiline={false}
              onChangeText={(text) => {
                setPassword(text);
              }}
              value={password}
              selectionColor={'gray'}
              clearButtonMode="always"
              secureTextEntry={!hide}
              style={{flex: 1, margin: 10, fontSize: 15}}
            />
            <FontAwesome
              name={hide ? 'eye' : 'eye-slash'}
              color="#787C7E"
              size={20}
              style={{marginHorizontal: 5}}
              onPress={() => isHide(!hide)}
            />
          </View>
          <View
            style={{
              backgroundColor: '#FFF',
              flexDirection: 'row',
              borderRadius: 4,
              padding: 8,
              margin: 10,
              alignItems: 'center',
              shadowColor: '#2E529F',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
            }}>
            <FontAwesome name="key" color="#787C7E" size={20} style={{marginHorizontal: 5}} />
            <TextInput
              placeholder={'Nhập lại mật khẩu'}
              multiline={false}
              onChangeText={(text) => {
                setPassword(text);
              }}
              value={password}
              selectionColor={'gray'}
              clearButtonMode="always"
              secureTextEntry={!hide}
              style={{flex: 1, margin: 10, fontSize: 15}}
            />
            <FontAwesome
              name={hide ? 'eye' : 'eye-slash'}
              color="#787C7E"
              size={20}
              style={{marginHorizontal: 5}}
              onPress={() => isHide(!hide)}
            />
          </View>

          {checkXacThucVanTay ? (
            <TouchableOpacity
              onPress={() => {
                DangNhapBangVanTay();
              }}>
              <View style={styles.containerXacThuc}>
                <Icon name="fingerprint" size={24} color="#FFF" />
                <Text style={{paddingStart: 10, color: 'white'}}>Mở khoá bằng vân tay</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <></>
          )}

          <Button
            onPress={() => handleLogin(username, password)}
            title={'ĐĂNG KÝ'}
            loading={actionsLoading}
            titleStyle={{fontSize: 14, fontWeight: 'bold'}}
            buttonStyle={styles.btDangNhap}
          />

          <Text style={{textAlign: 'center', color: '#A2A6A8', marginTop: 20}}>- Kết nối với tài khoản xã hội của bạn -</Text>

          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
            <SocialIcon style={{marginHorizontal: 20}} type="facebook" />
            <SocialIcon style={{marginHorizontal: 20}} type="google" />
            <SocialIcon style={{backgroundColor: 'black', marginHorizontal: 20}} type="apple" />
          </View>
        </View>
      </ScrollView>
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

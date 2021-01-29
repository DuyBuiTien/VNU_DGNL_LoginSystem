/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StatusBar, View, Image, StyleSheet, ImageBackground, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AppIntroSlider from 'react-native-app-intro-slider';

import {Colors, Images} from '../../themes';
import * as actions from '../../redux/global/Actions';

const Screen = (props) => {
  const dispatch = useDispatch();
  const _renderItem = ({item, dimensions}) => (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20}}>
      <Image source={item.image} style={{height: 100, width: 100}} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const navigateToApp = async () => {
    dispatch(actions.setLoadIntro(true));
  };

  const slides = [
    {
      key: '01',
      title: `TD Smart City`,
      text: 'Ứng dụng quản lý các tiện ích thông minh tổng hợp cho cán bộ. \nChỉ với một ứng dụng duy nhất (hoàn toàn miễn phí)',
      image: Images.images.slides_1,
    },
    {
      key: '02',
      title: 'Hoàn toàn miễn phí',
      text: `Ứng dụng cung cấp dịch vụ tiện ích như thư điện tử, quản lý văn bản, chỉ đạo điều hành, quản lý cán bộ và nhiều dịch vụ khác cho cán bộ `,
      image: Images.images.slides_1,
    },
  ];

  return (
    <ImageBackground source={Images.backgrounds.intro} style={styles.mainContent}>
      <StatusBar backgroundColor="#00000000" barStyle="light-content" translucent={true} />

      <View style={{paddingBottom: 20}}>
        <AppIntroSlider
          slides={slides}
          renderItem={_renderItem}
          activeDotStyle={{backgroundColor: '#2196F3'}}
          showSkipButton
          skipLabel="Bỏ qua"
          doneLabel="Trải nghiệm"
          nextLabel="Tiếp theo"
          buttonTextStyle={{color: '#2196F3', fontSize: 14}}
          onDone={() => navigateToApp()}
          onSkip={() => navigateToApp()}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContent: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  image: {
    width: 320,
    height: 320,
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 20,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    padding: 20,
    fontWeight: 'bold',
    color: '#2196F3',
  },
});
export default Screen;

/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StatusBar, View, Image, StyleSheet, ImageBackground, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';

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

  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="md-arrow-round-forward" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };
  const _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="md-checkmark" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };

  const navigateToApp = async () => {
    dispatch(actions.setLoadIntro(true));
  };

  const slides = [
    {
      key: 0,
      title: `Góp sức cùng chính quyền phát triển xã hội`,
      text: `"Smart Nam Định" cung cấp cho bạn kênh liên lạc chính thống giữa người dân với chính quyền`,
      image: Images.images.slides_1,
    },
    {
      key: 1,
      title: 'Cập nhật thông tin nhanh chóng, đa dạng, chính thống',
      text: `Thông báo từ chính quyền, tin tức luôn được cập nhật nhanh chóng, chính xác`,
      image: Images.images.slides_2,
    },
    {
      key: 2,
      title: 'Nam Định trong lòng bàn tay',
      text: `Dễ dàng nắm bắt được mọi thông tin về thành phố như: giao thông, y tế, địa điểm du lịch, các sự kiện đang diễn ra...`,
      image: Images.images.slides_3,
    },
    {
      key: 3,
      title: 'Cùng nhau xây dựng, phát triển cộng đồng',
      text: `"Smart Nam Định" mang đến cho bạn các chương trình học miễn phí, các chức năng bổ trợ người yếu thế`,
      image: Images.images.slides_4,
    },
  ];

  return (
    <ImageBackground source={Images.backgrounds.intro} style={styles.mainContent}>
      <StatusBar backgroundColor="#00000000" barStyle="light-content" translucent={true} />

      <View style={{paddingBottom: 20}}>
        <AppIntroSlider
          data={slides}
          renderItem={_renderItem}
          activeDotStyle={{backgroundColor: '#2196F3'}}
          showSkipButton
          skipLabel="Bỏ qua"
          doneLabel="Trải nghiệm"
          nextLabel="Tiếp theo"
          buttonTextStyle={{color: '#2196F3', fontSize: 14}}
          onDone={() => navigateToApp()}
          onSkip={() => navigateToApp()}
          renderDoneButton={_renderDoneButton}
          renderNextButton={_renderNextButton}
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

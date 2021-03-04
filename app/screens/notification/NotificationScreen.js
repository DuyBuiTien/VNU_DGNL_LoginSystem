/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, Image, View, Text, Animated} from 'react-native';

const HEADER_MAX_HEIGHT = 260;
const HEADER_MIN_HEIGHT = 120;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const TinNoiBat = () => {
  return <View style={{height: 60, backgroundColor: 'blue'}} />;
};

const DATA = Array(10)
  .fill(null)
  .map((_, idx) => ({
    id: idx,
    avatar: 'https://gravatar.com/avatar/b40f03bff7ca801821bb5e335fa6be2d?s=400&d=robohash&r=x',
    fullName: 'Tung lam',
  }));

const getCloser = (value, checkOne, checkTwo) => (Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo);

const NotificationScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const movingMargin = scrollY.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 300, 0],
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1.5, 1, 0.9],
    extrapolate: 'clamp',
  });
  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, -8],
    extrapolate: 'clamp',
  });

  const _renderListItem = (item) => (
    <View key={item.id} style={styles.card}>
      <Image style={styles.avatar} source={{uri: item.avatar}} />
      <Text style={styles.fullNameText}>{item.fullName}</Text>
    </View>
  );

  const ref = useRef(null);

  return (
    <View style={{flex: 1}}>
      <Animated.FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT}}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: true})}
        ref={ref}
        data={DATA}
        renderItem={_renderListItem}
        keyExtractor={(item, index) => `list-item-${index}-${item.color}`}
      />
      <Animated.View style={[styles.header, {transform: [{translateY: headerTranslateY}]}]}>
        <Animated.View
          style={[
            styles.headerBackground,
            {
              transform: [{translateY: imageTranslateY}],
            },
          ]}>
          <TinNoiBat />
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={[
          styles.topBar,
          {
            opacity: imageOpacity,
          },
        ]}>
        <Text style={styles.title}>Thông tin từ chính quyền</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  saveArea: {
    flex: 1,
    backgroundColor: '#eff3fb',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#402583',
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
    borderRadius: 10,
    marginHorizontal: 12,
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  topBar: {
    marginTop: 40,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: '#353D41',
    fontWeight: 'bold',
    fontSize: 20,
  },
  avatar: {
    height: 54,
    width: 54,
    resizeMode: 'contain',
    borderRadius: 54 / 2,
  },
  fullNameText: {
    fontSize: 16,
    marginLeft: 24,
  },
});

export default NotificationScreen;

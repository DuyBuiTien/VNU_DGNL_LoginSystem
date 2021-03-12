import React, {useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const RenderLeftActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.leftAction}>
      <AnimatedIcon name="phone" size={30} color="#fff" style={[styles.actionIcon, {transform: [{scale}]}]} />
    </View>
  );
};

const RenderRightActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [-80, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.rightAction}>
      <AnimatedIcon name="favorite" size={30} color="#fff" style={[styles.actionIcon, {transform: [{scale}]}]} />
    </View>
  );
};

const SwipeableGmail = (props) => {
  const _swipeableRow = useRef();

  const onLeft = () => {
    _swipeableRow.current.close();
    props.swipLeft(props.item);
  };

  const onRight = () => {
    _swipeableRow.current.close();
    props.swipRight(props.item);
  };

  return (
    <Swipeable
      ref={_swipeableRow}
      friction={2}
      leftThreshold={80}
      rightThreshold={40}
      onSwipeableLeftOpen={() => onLeft()}
      renderLeftActions={RenderLeftActions}
      onSwipeableRightOpen={() => onRight()}
      renderRightActions={RenderRightActions}>
      {props.children}
    </Swipeable>
  );
};

export default SwipeableGmail;

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#4CAF50',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#f44336',
    flex: 1,
    justifyContent: 'flex-end',
  },
});

/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Header, Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Item = ({leftComponent, isStack, title, showRight, RightComponent, backgroundColor, textColor}) => {
  const navigation = useNavigation();

  return (
    <Header
      statusBarProps={{barStyle: 'dark-content', backgroundColor: 'transparent', translucent: true}}
      barStyle="dark-content"
      placement="left"
      leftComponent={
        leftComponent || isStack ? (
          <TouchableOpacity onPress={() => (isStack ? navigation.goBack() : navigation.openDrawer())}>
            <Icon
              name={isStack ? 'arrow-back' : 'menu'}
              color={textColor ? textColor : '#2E2E2E'}
              underlayColor="#00000000"
              containerStyle={styles.icon}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )
      }
      centerComponent={{
        text: title,
        style: {color: textColor ? textColor : '#2E2E2E', fontSize: 18, fontWeight: 'bold'},
      }}
      rightComponent={RightComponent && <RightComponent />}
      containerStyle={{
        backgroundColor: backgroundColor ? backgroundColor : '#FFF',
        justifyContent: 'space-around',
      }}
      centerContainerStyle={{}}
    />
  );
};

export default Item;

const styles = StyleSheet.create({
  icon: {paddingStart: 0, marginHorizontal: 10},
  container: {
    backgroundColor: '#FFF',
    justifyContent: 'space-around',
  },
});

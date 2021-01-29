import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Header, Icon} from 'react-native-elements';

const Item = ({leftComponent, isStack, title, showRight, RightComponent}) => {
  const navigation = useNavigation();

  return (
    <Header
      statusBarProps={{barStyle: 'light-content', backgroundColor: 'transparent', translucent: true}}
      barStyle="light-content"
      placement="left"
      leftComponent={
        leftComponent || isStack ? (
          <TouchableOpacity onPress={() => (isStack ? navigation.goBack() : navigation.openDrawer())}>
            <Icon name={isStack ? 'arrow-back' : 'menu'} color="#2E2E2E" underlayColor="#00000000" containerStyle={styles.icon} />
          </TouchableOpacity>
        ) : (
          <></>
        )
      }
      centerComponent={{
        text: title,
        style: {color: '#2E2E2E', fontSize: 20, fontWeight: 'bold'},
      }}
      rightComponent={RightComponent && <RightComponent />}
      containerStyle={styles.container}
      centerContainerStyle={{}}
    />
  );
};

export default Item;

const styles = StyleSheet.create({
  icon: {paddingStart: 0, marginHorizontal: 20},
  container: {
    backgroundColor: '#FFF',
    justifyContent: 'space-around',
  },
});

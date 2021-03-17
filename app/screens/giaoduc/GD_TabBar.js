/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const logo = ['school', 'award', 'user-friends', 'buromobelexperte']

const GD_TabBar = (props) => {
  const { tabs, style, goToPage, activeTab } = props
  const navigation = useNavigation();
  const user = useSelector((state) => state.global.user);
  const icons = useRef([])

  return (
    <View style={[styles.tabs, style]}>
      {tabs.map((tab, i) => {
        icon = logo[i]

        return <TouchableOpacity key={i} onPress={() => goToPage(i)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center',}}>
          <FontAwesome
            name={icon}
            size={24}
            color={activeTab === i ? '#2AA5FF' : 'rgb(204,204,204)'}
            ref={(icon) => { icons[i] = icon; }}
          />
        </TouchableOpacity>;
      })}
    </View>
  );
};

export default GD_TabBar;

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

},
tabs: {
    height: 60,
    flexDirection: 'row',
    paddingTop: 5,
    borderTopWidth: 0.1,
    borderTopColor: '#e8e8e8',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: '#fff',
},
});

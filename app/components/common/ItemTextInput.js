/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

const ItemTextInput = (props) => {
  const [hide, isHide] = useState(false);
  const {value, onChangeText, placeholder, icon, title, description, showEye} = props;
  return (
    <View style={{marginVertical: 10}}>
      <Text style={{marginHorizontal: 10}}>{title}</Text>
      <View style={styles.textinputContainer}>
        <FontAwesome name={icon ? icon : 'home'} color="#787C7E" size={20} style={styles.textinputIcon} />
        <TextInput
          placeholder={placeholder ? placeholder : ''}
          multiline={false}
          onChangeText={(text) => {
            onChangeText(text);
          }}
          value={value}
          selectionColor={'gray'}
          clearButtonMode="always"
          style={styles.textinput}
        />
        {showEye && (
          <FontAwesome
            name={hide ? 'eye' : 'eye-slash'}
            color="#787C7E"
            size={20}
            style={styles.textinputIcon}
            onPress={() => isHide(!hide)}
          />
        )}
      </View>
      {description && <Text style={{marginHorizontal: 10, color: '#bdbdbd', fontStyle: 'italic'}}>{description}</Text>}
    </View>
  );
};

export default ItemTextInput;
const styles = StyleSheet.create({
  container: {flex: 1},

  textinputContainer: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderRadius: 4,
    padding: 0,
    margin: 10,
    alignItems: 'center',

    shadowOpacity: 0.2,
    borderWidth: 0.4,
    borderColor: '#abb4bd65',
    shadowRadius: 2,
  },
  textinput: {flex: 1, paddingVertical: 10},
  textinputIcon: {marginHorizontal: 10},
});

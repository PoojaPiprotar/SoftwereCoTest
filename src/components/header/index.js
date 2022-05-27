import * as React from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import {HP, WP} from '../../utils/scale';
import {icons} from '../../assets/icons';
import {ButtonComponent} from '../button';
import {color} from '../../theme/color';
export const HeaderComponent = ({rightComponent, onPress, centerText}) => {
  return (
    <View style={style.root}>
      <TouchableOpacity
        preset="link"
        onPress={() => {
          onPress();
        }}
        style={style.leftContainer}>
        <Image style={style.leftIcon} source={icons['back']} />
      </TouchableOpacity>
      {centerText && <Text style={style.centerText}>{centerText}</Text>}
      {rightComponent && (
        <View style={style.rightContainer}>
          <ButtonComponent icon={true} textData="Follow" iconName="plus" />
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  root: {
    flexDirection: 'row',
    paddingHorizontal: WP(3),
    paddingTop: HP(2),
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: HP(7),
  },
  leftContainer: {
    padding: 10,
    width: WP(10),
  },
  rightContainer: {
    padding: 10,
    maxWidth: WP(60),
    alignItems: 'flex-end',
  },
  leftIcon: {
    width: 20,
    height: 20,
  },

  centerText: {
    color: color.black,
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
});

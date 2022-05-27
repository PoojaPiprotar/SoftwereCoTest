import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {WP} from '../../utils/scale';
import {icons} from '../../assets/icons';
import {color} from '../../theme/color';
import {commonStyle} from '../../theme/commonStyle';

export const ButtonComponent = props => {
  return (
    <TouchableOpacity
      style={[style.root, props.containerStyle]}
      onPress={() => {
        props.onPress(props.textData);
      }}>
      {props?.icon && (
        <Image
          style={[commonStyle.iconStyle, {tintColor: color.white}]}
          source={icons[props.iconName] || icons['back']}
        />
      )}
      {props?.textData && (
        <Text
          style={[
            style.textDataStyle,
            props?.style,
            {marginLeft: props.icon ? WP(2) : 0},
            {marginRight: props.iconRight ? WP(2) : 0},
          ]}>
          {props?.textData}
        </Text>
      )}
      {props?.iconRight && (
        <Image
          style={[commonStyle.iconStyle, {tintColor: color.white}]}
          source={icons[props.iconName] || icons['back']}
        />
      )}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  root: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: color.white,
    backgroundColor: color.black,
  },
  textDataStyle: {
    color: color.white,
    fontSize: 14,
    fontStyle: 'normal',
  },
});

import React from 'react';
import {Text, StyleSheet, ScrollView, View, Image} from 'react-native';
import {useSelector} from 'react-redux';

import {ButtonComponent, HeaderComponent} from '../../components';
import {color} from '../../theme/color';
import {commonStyle} from '../../theme/commonStyle';
import {constant} from '../../utils/constants';
import {HP, WP} from '../../utils/scale';

export const Orders = ({navigation, route}) => {
  const orderScreenImage = require('../../assets/images/orderScreenImage.png');
  const time = route?.params?.time;
  const count = useSelector(state => state?.countReducer?.count);
  const totalPrice = useSelector(state => state?.countReducer?.totalPrice);
  const OrderedInfo = ({title, value, isTotal}) => {
    return (
      <View style={style.orderInfoRoot}>
        <Text style={isTotal ? commonStyle.titleText : style.titleStyle}>
          {title}
        </Text>
        <Text style={isTotal ? commonStyle.titleText : style.valueStyle}>
          {value}
        </Text>
      </View>
    );
  };
  return (
    <View style={commonStyle.screenStyle}>
      <HeaderComponent
        centerText={time}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView style={style.root}>
        <Image style={style.imageStyle} source={orderScreenImage}></Image>
        <Text style={style.orderThankuText}>Thanks for your order!</Text>
        <Text style={style.receiptText}>Receipt №345271</Text>
        <Text style={commonStyle.titleText}>Order summary</Text>
        <OrderedInfo title="Items" value={count} />
        <OrderedInfo title="Order placed" value={time} />
        <OrderedInfo title="Order delivered" value={time} />
        <Text style={commonStyle.titleText}>Billing info</Text>
        <OrderedInfo title="1226 Univercity Road, 45" />
        <Text style={commonStyle.titleText}>Order summary</Text>
        <OrderedInfo title="Subtotal" value="$10.00" />
        <OrderedInfo title="Tax" value="$0.00" />
        <OrderedInfo title="Delivery fee" value="$0.00" />
        <OrderedInfo title="Discount" value="$0.00" />
        <OrderedInfo title="Total" value={`$ ${totalPrice}`} isTotal={true} />
        <View style={[style.orderInfoRoot]}>
          <ButtonComponent
            textData={'BACK TO SHOP'}
            style={{color: color.black}}
            icon
            containerStyle={style.buttonStyle}
            onPress={() => {
              navigation.navigate(constant.PRODUCTLIST);
            }}
          />
          <ButtonComponent
            textData={'TRACK ORDERS'}
            style={{color: color.green}}
            containerStyle={[style.buttonStyle, {borderColor: color.green}]}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  root: {
    paddingHorizontal: WP(3),
    paddingVertical: HP(3),
  },
  imageStyle: {
    height: HP(15),
    width: '100%',
  },
  orderThankuText: {
    color: color.white,
    position: 'absolute',
    top: HP(5),
    fontSize: 24,
    textAlign: 'center',
    width: '100%',
    fontWeight: '900',
  },
  receiptText: {
    color: color.dim,
    fontSize: 16,
    fontWeight: '400',
    marginVertical: HP(2),
  },
  titleStyle: {
    color: color.dim,
    fontSize: 16,
    fontWeight: '400',
  },
  orderInfoRoot: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: HP(1),
  },
  valueStyle: {
    color: color.black,
    fontSize: 16,
  },
  buttonStyle: {
    backgroundColor: color.white,
    borderColor: color.black,
    borderWidth: 2,
  },
});

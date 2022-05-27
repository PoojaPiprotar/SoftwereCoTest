import * as React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {ButtonComponent, icons} from '../../components';
import {color} from '../../theme/color';
import {commonStyle} from '../../theme/commonStyle';
import {HP, width, WP} from '../../utils/scale';

const ListComponent = ({
  item,
  index,
  onPlusPress,
  onAddtocartPress,
  onMinusPress,
  onDeletePress,
  onComponentPress,
  onWishlistPress,
}) => {
  return (
    <TouchableOpacity
      style={[commonStyle.shadowContainer, style.root]}
      onPress={() => {
        onComponentPress(item);
      }}>
      <Image
        style={style.imageStyle}
        source={item?.image}
        resizeMode="contain"
      />
      <TouchableOpacity
        style={{position: 'absolute', top: 5, right: 5}}
        onPress={() => {
          onWishlistPress(item);
        }}>
        <Image
          style={style.wishlistIconStyle}
          source={
            item?.wishlist === true ? icons.wishlistAdded : icons.wishlist
          }
          resizeMode="contain"
        />
      </TouchableOpacity>

      <View style={{paddingVertical: 10, paddingHorizontal: 5}}>
        <Text style={style.nameTextStyle} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={style.priceTextStyle} numberOfLines={2}>
            {item.price}
          </Text>
          <Text style={style.perKgTextStyle}>{item?.perKg}</Text>
        </View>
        {!item?.isAddedToCart ? (
          <ButtonComponent
            icon={true}
            textData="ADD TO CART"
            iconName="plus"
            style={{fontSize: 12}}
            containerStyle={{backgroundColor: color.green}}
            onPress={() => {
              onAddtocartPress(item, index);
            }}
          />
        ) : (
          <View style={commonStyle.cartContainer}>
            <ButtonComponent
              icon={true}
              onPress={() => {
                if (item?.total == 1) {
                  onDeletePress(item);
                } else {
                  onPlusPress(item);
                }
              }}
              iconName={item?.total == 1 ? 'delete' : 'plus'}
              containerStyle={{backgroundColor: color.green}}
            />
            <Text style={style.priceTextStyle}>{item.total}</Text>
            <ButtonComponent
              icon={true}
              iconName={item?.total == 1 ? 'plus' : 'minus'}
              containerStyle={{backgroundColor: color.green}}
              onPress={() => {
                if (item?.total == 1) {
                  onPlusPress(item);
                } else {
                  onMinusPress(item);
                }
              }}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  root: {
    width: width / 2 - 15,
    padding: 2,
    justifyContent: 'space-between',
    marginHorizontal: WP(2),
    marginVertical: HP(2),
  },
  imageStyle: {
    height: 66,
    width: '100%',
  },
  nameTextStyle: {
    fontSize: 14,
    fontWeight: '400',
    color: color.black,
    marginBottom: HP(1),
  },
  priceTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.black,
    marginBottom: HP(1),
  },
  perKgTextStyle: {
    fontSize: 16,
    color: color.dim,
    marginLeft: WP(2),
  },
  wishlistIconStyle: {
    height: 20,
    width: 20,
  },
});
export {ListComponent};

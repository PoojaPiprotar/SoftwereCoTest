import React, {useState, useEffect} from 'react';
import {FlatList, Text, StyleSheet, View, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {ButtonComponent, HeaderComponent} from '../../components';
import {itemAdded, allOrdersAdd, changeCount} from '../../redux/action';
import {color} from '../../theme/color';
import {commonStyle} from '../../theme/commonStyle';
import {constant} from '../../utils/constants';
import {height, HP, WP} from '../../utils/scale';

export const MyCart = ({navigation, route}) => {
  const dispatch = useDispatch();
  const cat_list = useSelector(state => state?.countReducer?.cat_list);
  const count = useSelector(state => state?.countReducer?.count);
  const totalPrice = useSelector(state => state?.countReducer?.totalPrice);
  const allOrders = useSelector(state => state?.countReducer?.allOrders);
  const [tab, setTab] = useState('cart');
  const [cartList, setCartList] = useState([]);
  useEffect(() => {
    setCartList(cat_list);
  }, [cartList]);

  const CartComponent = ({item, index}) => {
    return (
      <View style={style.cartComponentContainer}>
        <View style={{width: '55%', flexDirection: 'row'}}>
          <Image style={style.imageStyle} source={item?.image} />
          <View>
            <Text style={style.shopNameStyle}>{item?.price}</Text>
            <Text style={style.deliveryText}>{item?.name}</Text>
            <Text style={[style.deliveryText, {color: color.dim}]}>
              Preferences
            </Text>
          </View>
        </View>
        <View
          style={[
            commonStyle.cartContainer,
            {width: '45%', alignSelf: 'flex-end', alignItems: 'center'},
          ]}>
          <ButtonComponent
            icon={true}
            onPress={() => {
              if (item?.total == 1) {
                cat_list[index].isAddedToCart = false;
                let price =
                  totalPrice -
                  Number(
                    cat_list[index]?.price?.substring(
                      cat_list[index]?.price?.indexOf('$') + 1,
                    ),
                  ) *
                    cat_list[index].total;
                dispatch(changeCount(count, price));
              } else {
                cat_list[index].total = item.total + 1;
                let price =
                  Number(
                    cat_list[index]?.price?.substring(
                      cat_list[index]?.price?.indexOf('$') + 1,
                    ),
                  ) *
                    (cat_list[index].total > 1
                      ? cat_list[index].total - 1
                      : 1) +
                  Number(totalPrice);
                dispatch(changeCount(count, price));
                setCartList([]);
                dispatch(itemAdded(cat_list));
                setCartList([]);
                dispatch(itemAdded(cat_list));
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
                cat_list[index].total = item.total + 1;
                setCartList([]);
                dispatch(itemAdded(cat_list));
              } else {
                cat_list[index].total = item.total - 1;
                let price =
                  totalPrice -
                  Number(
                    cat_list[index]?.price?.substring(
                      cat_list[index]?.price?.indexOf('$') + 1,
                    ),
                  ) *
                    cat_list[index].total;
                dispatch(changeCount(count, price));
                setCartList([]);
                dispatch(itemAdded(cat_list));
              }
            }}
          />
        </View>
      </View>
    );
  };
  const renderItem = item => {
    return (
      <View style={style.cartComponentContainer}>
        <View style={{}}>
          <Text style={style.itemText}>{`${item?.noOfItems} items`}</Text>
          <Text style={style.deliveryText}>{item?.time}</Text>
        </View>
        <Text style={commonStyle.titleText}>{item?.totalPrice}</Text>
      </View>
    );
  };
  return (
    <View style={commonStyle.screenStyle}>
      <HeaderComponent
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={style.TabContainer}>
        <Text
          style={[
            style.tabTitle,
            {borderBottomColor: tab === 'cart' ? color.black : color.white},
            {borderBottomWidth: tab === 'cart' ? 3 : 0},
            {color: tab === 'cart' ? color.black : color.dim},
          ]}
          onPress={() => {
            setTab('cart');
          }}>
          Cart
        </Text>
        <Text
          style={[
            style.tabTitle,
            {borderBottomColor: tab === 'orders' ? color.black : color.white},
            {borderBottomWidth: tab === 'orders' ? 3 : 0},
            {color: tab === 'orders' ? color.black : color.dim},
          ]}
          onPress={() => {
            setTab('orders');
          }}>
          Past orders
        </Text>
      </View>
      {tab === 'cart' ? (
        <>
          <View style={{paddingHorizontal: WP(3)}}>
            <Text style={commonStyle.titleText}>My cart</Text>
          </View>
          <View style={style.shopNameContainer}>
            <View>
              <Text style={style.shopNameStyle}>Harris Farm Markets</Text>
              <Text style={style.deliveryText}>Delivery fee: $1.00</Text>
            </View>
            <Text style={style.shopNameStyle}>$5.00</Text>
          </View>
          {cartList?.length > 0 &&
            cartList?.map((item, index) => {
              return (
                item?.isAddedToCart === true && (
                  <CartComponent item={item} index={index} />
                )
              );
            })}
          <View
            style={[
              commonStyle.bottomContainer,
              {
                bottom: height * 0.0,
                paddingBottom:
                  Platform.OS === 'ios' ? height * 0.02 : height * 0.02,
              },
            ]}>
            <View>
              <Text style={style.itemText} numberOfLines={2}>
                {`${count} item`}
              </Text>
              <Text style={commonStyle.titleText} numberOfLines={2}>
                {`$ ${totalPrice}`}
              </Text>
            </View>
            <ButtonComponent
              textData={'CONFIRM'}
              style={{color: color.white}}
              iconRight={true}
              iconName="right"
              containerStyle={{backgroundColor: color.green, width: WP(60)}}
              onPress={data => {
                let temp = [];
                let time = new Date().toLocaleString().replace(',', '');
                if (allOrders?.length > 0) {
                  temp.push(...allOrders, {
                    noOfItems: count,
                    totalPrice: totalPrice,
                    time: time,
                  });
                } else {
                  temp.push({
                    noOfItems: count,
                    totalPrice: `$ ${totalPrice}`,
                    time: time,
                  });
                }
                dispatch(allOrdersAdd(temp));
                navigation.navigate(constant.ORDERS, {time: time});
              }}
            />
          </View>
        </>
      ) : (
        <>
          {allOrders?.length > 0 && (
            <FlatList
              bounces={false}
              data={allOrders}
              renderItem={({item, index}) => renderItem(item, index)}
              keyExtractor={(item, index) => index.toString()}
              style={style.flatListStyle}
              numColumns={2}
            />
          )}
        </>
      )}
    </View>
  );
};
const style = StyleSheet.create({
  TabContainer: {
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: color.dim,
    borderBottomWidth: 3,
    marginVertical: HP(2),
  },
  tabTitle: {
    color: color.dim,
    width: '50%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  shopNameContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: HP(2),
    paddingHorizontal: WP(3),
  },
  shopNameStyle: {
    fontSize: 18,
    color: color.black,
    fontWeight: '600',
  },
  deliveryText: {
    fontSize: 14,
    fontWeight: '300',
    color: color.black,
  },
  cartComponentContainer: {
    paddingHorizontal: WP(3),
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: HP(1),
  },
  imageStyle: {
    height: 56,
    width: 56,
    marginRight: WP(2),
  },
  priceTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.black,
    marginBottom: HP(1),
  },
  itemText: {
    color: color.black,
    fontSize: 14,
  },
});

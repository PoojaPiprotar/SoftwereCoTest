import React, {useEffect, useState} from 'react';
import {Text, View, Image, StyleSheet, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {ButtonComponent, HeaderComponent} from '../../components';
import {selectedCatChange, itemAdded, changeCount} from '../../redux/action';

import {color} from '../../theme/color';
import {commonStyle} from '../../theme/commonStyle';
import {constant} from '../../utils/constants';
import {global} from '../../utils/global';
import {HP, WP} from '../../utils/scale';
import {ListComponent} from './listComponent';
import {ProductDetailModal} from './productDetailModal';

export const ProductList = ({navigation}) => {
  const dispatch = useDispatch();

  const count = useSelector(state => state?.countReducer?.count);
  const totalPrice = useSelector(state => state?.countReducer?.totalPrice);
  const category = useSelector(state => state?.countReducer?.category);
  const cat_list = useSelector(state => state?.countReducer?.cat_list);
  const homeImage = require('../../assets/images/homeScreenImage.png');
  const [list, setList] = useState([]);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [detail, setDetail] = useState();
  useEffect(() => {
    setList(cat_list);
  }, [list]);
  const renderItem = (item, index) => {
    return (
      <ListComponent
        item={item}
        index={index}
        onComponentPress={item => {
          setDetail(item);
          setDetailModalOpen(true);
        }}
        onWishlistPress={item => {
          cat_list[index].wishlist = !item.wishlist;
          setList([]);
          dispatch(itemAdded(cat_list));
        }}
        onAddtocartPress={async (item, index) => {
          cat_list[index].isAddedToCart = true;
          cat_list[index].total = item.total + 1;
          let price =
            Number(
              cat_list[index]?.price?.substring(
                cat_list[index]?.price?.indexOf('$') + 1,
              ),
            ) *
              (cat_list[index].total > 1 ? cat_list[index].total - 1 : 1) +
            Number(totalPrice);
          setList([]);
          dispatch(itemAdded(cat_list));
          dispatch(changeCount(count + 1, price));
        }}
        onPlusPress={() => {
          cat_list[index].total = item.total + 1;
          setList([]);
          dispatch(itemAdded(cat_list));
          let price =
            Number(
              cat_list[index]?.price?.substring(
                cat_list[index]?.price?.indexOf('$') + 1,
              ),
            ) *
              (cat_list[index].total > 1 ? cat_list[index].total - 1 : 1) +
            Number(totalPrice);
          dispatch(changeCount(count, price));
        }}
        onMinusPress={() => {
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
          setList([]);
          dispatch(itemAdded(cat_list));
        }}
        onDeletePress={() => {
          cat_list[index].isAddedToCart = false;
          let price =
            totalPrice -
            Number(
              cat_list[index]?.price?.substring(
                cat_list[index]?.price?.indexOf('$') + 1,
              ),
            );
          dispatch(changeCount(count - 1, price));
          setList([]);
          dispatch(itemAdded(cat_list));
        }}
      />
    );
  };
  const renderProductDetailModal = () => (
    <ProductDetailModal
      modalVisible={detailModalOpen}
      setModalVisible={() => {
        setDetailModalOpen(!detailModalOpen);
      }}
      detail={detail}
      onCartPress={() => {
        setDetailModalOpen(!detailModalOpen);
        navigation.navigate(constant.MYCART);
      }}
    />
  );
  return (
    <View style={commonStyle.screenStyle}>
      <Image style={style.imageStyle} source={homeImage} />
      <View style={{position: 'absolute', width: '100%'}}>
        <HeaderComponent rightComponent={true} onPress={() => {}} />
      </View>
      <View style={style.catContainer}>
        {global?.cat_Arr.map(item => (
          <ButtonComponent
            textData={item}
            style={[
              style.catStyle,
              {color: category === item ? color.white : color.black},
            ]}
            containerStyle={[
              commonStyle.shadowContainer,
              {backgroundColor: category === item ? color.green : color.white},
            ]}
            onPress={data => {
              setList([]);
              dispatch(selectedCatChange(item));
            }}
          />
        ))}
      </View>
      <View style={{paddingHorizontal: WP(3)}}>
        <Text style={commonStyle.titleText}>{category}</Text>
      </View>
      {list?.length > 0 && (
        <FlatList
          bounces={false}
          data={list}
          renderItem={({item, index}) => renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          style={style.flatListStyle}
          numColumns={2}
        />
      )}
      {renderProductDetailModal()}
    </View>
  );
};
const style = StyleSheet.create({
  imageStyle: {
    height: HP(30),
    width: '100%',
  },
  catContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: HP(1),
  },
  catStyle: {
    color: color.black,
    fontWeight: '600',
  },
  catTextContainer: {},
  flatListStyle: {
    width: '100%',
    height: 'auto',
    marginBottom: HP(2),
  },
});

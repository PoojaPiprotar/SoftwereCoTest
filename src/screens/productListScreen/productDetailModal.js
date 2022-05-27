import React from 'react';
import {View, StyleSheet, Text, Image, Modal, ScrollView} from 'react-native';
import {color} from '../../theme/color';
import {commonStyle} from '../../theme/commonStyle';
import {height, HP, WP} from '../../utils/scale';
import {useSelector} from 'react-redux';
import {global} from '../../utils/global';
import {ButtonComponent} from '../../components';

export const ProductDetailModal = ({
  modalVisible,
  setModalVisible,
  detail,
  onCartPress,
}) => {
  const detailImage = require('../../assets/images/detailImage.png');
  const category = useSelector(state => state?.countReducer?.category);
  const InfoStatus = ({title, value}) => {
    return (
      <View style={style.infoContainer}>
        <Text style={style.keyStyle}>{`${title}: `}</Text>
        <Text style={style.valueStyle}>{value}</Text>
      </View>
    );
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={style.modalContainer}>
        <Image
          style={style.imageStyle}
          source={detailImage}
          resizeMode="cover"
        />

        <ScrollView style={style.scrollViewStyle}>
          <Text style={commonStyle.titleText}>{detail?.name}</Text>
          <Text style={commonStyle.titleText}>large (min 500g)</Text>
          <InfoStatus title="Sold By" value={detail?.shopName} />
          <InfoStatus title="Status" value={detail?.status} />
          <InfoStatus title="category" value={category} />
          <View style={[style.infoContainer, {alignItems: 'center'}]}>
            <Text style={commonStyle.titleText} numberOfLines={2}>
              {detail?.price}
            </Text>
            <Text style={style.itemText} numberOfLines={2}>
              {` /item`}
            </Text>
          </View>
          <View style={style.infoView}>
            <Text style={style.infoText}>Information</Text>
          </View>
          <Text style={style.infoDetail}>{global.info}</Text>
        </ScrollView>
        <View style={commonStyle.bottomContainer}>
          <View>
            <Text style={style.itemText} numberOfLines={2}>
              {`${detail?.total} item`}
            </Text>
            <Text style={commonStyle.titleText} numberOfLines={2}>
              {Number(detail?.price.substring(detail?.price.indexOf('$') + 1)) *
                Number(detail?.total)}
            </Text>
          </View>
          <ButtonComponent
            textData={'GO TO CART'}
            style={{color: color.white}}
            iconRight={true}
            iconName="right"
            containerStyle={{backgroundColor: color.green}}
            onPress={data => {
              onCartPress();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
const style = StyleSheet.create({
  modalContainer: {
    backgroundColor: color.white,
    height: '100%',
    marginTop: '20%',
    borderRadius: 20,
    alignItems: 'center',
  },
  imageStyle: {
    height: HP(30),
    width: '100%',
  },
  scrollViewStyle: {
    marginTop: '2%',
    height: '80%',
    width: '100%',
    padding: height * 0.05,
    // flex: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: '5%',
  },
  keyStyle: {
    color: color.dim,
    fontSize: 14,
  },
  valueStyle: {
    fontSize: 14,
    color: color.black,
    marginLeft: WP(1),
  },
  itemText: {
    color: color.black,
    fontSize: 14,
  },
  infoText: {
    color: color.black,
    fontSize: 14,
    fontWeight: '400',
  },
  infoView: {
    borderBottomColor: color.dim,
    borderBottomWidth: 1,
    marginTop: '5%',
  },
  infoDetail: {
    fontSize: 16,
    color: color.dim,
    marginTop: HP(3),
  },
});

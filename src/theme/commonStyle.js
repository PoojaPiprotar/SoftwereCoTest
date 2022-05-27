import {StyleSheet, Platform} from 'react-native';
import {height, HP} from '../utils/scale';
import {color} from './color';
export const commonStyle = StyleSheet.create({
  iconStyle: {
    width: 16,
    height: 16,
  },
  screenStyle: {
    flex: 1,
    backgroundColor: color.white,
  },
  titleText: {
    color: color.black,
    fontSize: 24,
    fontWeight: '900',
  },
  shadowContainer: {
    backgroundColor: color.white,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  bottomContainer: {
    backgroundColor: color.white,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    bottom: height * 0.05,
    position: 'absolute',
    width: '100%',
    paddingTop: height * 0.02,
    justifyContent: 'space-around',
    paddingBottom: Platform.OS === 'ios' ? height * 0.02 : height * 0.05,
  },
  cartContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

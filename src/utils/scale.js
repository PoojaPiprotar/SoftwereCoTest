import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

const WP = (percent = 0) => {
  return Math.round(width * (percent / 100));
};

const HP = (percent = 0) => {
  return Math.round(height * (percent / 100));
};

export {WP, HP, height, width};

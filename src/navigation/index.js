import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MyCart, Orders, ProductList} from '../screens';
import {constant} from '../utils/constants';

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={constant.PRODUCTLIST}
          component={ProductList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={constant.MYCART}
          component={MyCart}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={constant.ORDERS}
          component={Orders}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../screens/Home";
import { Schedulling } from "../screens/Schedulling";
import { SchedullingDetails } from "../screens/SchedullingDetails";
import { Confirmation } from "../screens/Confirmation";
import { CarDetails } from "../screens/CarDetails";

type RootStackParamList = {
  Home: undefined;
  CarDetails: undefined;
  Schedulling: undefined;
  SchedullingDetails: undefined;
  Confirmation: undefined;
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export function AppStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Schedulling" component={Schedulling} />
      <Screen name="SchedullingDetails" component={SchedullingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}

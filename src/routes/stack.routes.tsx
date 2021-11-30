import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../screens/Home";
import { Schedulling } from "../screens/Schedulling";
import { SchedullingDetails } from "../screens/SchedullingDetails";
import { SchedullingComplete } from "../screens/SchedullingComplete";
import { CarDetails } from "../screens/CarDetails";

type RootStackParamList = {
  Home: undefined;
  CarDetails: undefined;
  Schedulling: undefined;
  SchedullingDetails: undefined;
  SchedullingComplete: undefined;
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Screen name="Home" component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Schedulling" component={Schedulling} />
      <Screen name="SchedullingDetails" component={SchedullingDetails} />
      <Screen name="SchedullingComplete" component={SchedullingComplete} />
    </Navigator>
  );
}

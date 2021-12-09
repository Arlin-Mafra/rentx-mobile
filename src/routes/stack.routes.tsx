import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../screens/Home";
import { Schedulling } from "../screens/Schedulling";
import { SchedullingDetails } from "../screens/SchedullingDetails";
import { SchedullingComplete } from "../screens/SchedullingComplete";
import { CarDetails } from "../screens/CarDetails";
import { MyCars } from "../screens/MyCars";
import { Splash } from "../screens/Splash";

type RootStackParamList = {
  Home: undefined;
  CarDetails: undefined;
  Schedulling: undefined;
  SchedullingDetails: undefined;
  SchedullingComplete: undefined;
  MyCars: undefined;
  Splash: undefined;
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Screen name="Splash" component={Splash} />
      <Screen
        name="Home"
        component={Home}
        options={{ gestureEnabled: false }}
      />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Schedulling" component={Schedulling} />
      <Screen name="SchedullingDetails" component={SchedullingDetails} />
      <Screen name="SchedullingComplete" component={SchedullingComplete} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}

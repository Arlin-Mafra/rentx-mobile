import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

import LogoSvg from "../../assets/logo.svg";
import BrandSvg from "../../assets/brand.svg";

import { Container } from "./styles";

type Props = NativeStackScreenProps<any, "Splash">;

export function Splash({ navigation }: Props) {
  const splashAnimation = useSharedValue(0);

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [0, 1]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value, [0, 50], [50, 0]),
        },
      ],
    };
  });

  function startApp() {
    navigation.navigate("SignIn");
  }

  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 3000 }, () => {
      "worklet";
      runOnJS(startApp)();
    });
  }, []);
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Animated.View style={brandStyle}>
        <BrandSvg width={80} height={50} />
      </Animated.View>
      <Animated.View style={logoStyle}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
}

import React from "react";
import LottieView from "lottie-react-native";
import loadingCar from "../../assets/loadingCar.json";
import { Container } from "./styles";

export function LoadingCar() {
  return (
    <Container>
      <LottieView
        source={loadingCar}
        autoPlay
        resizeMode="contain"
        loop
        style={{ height: 200 }}
      ></LottieView>
    </Container>
  );
}

import React from "react";
import { useRoute } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImagesSlider } from "../../components/ImagesSlider";
import { Button } from "../../components/Button";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoriesIcon } from "../../Utils/getAccessoriesIcon";
import { StatusBar, StyleSheet } from "react-native";
import { useTheme } from "styled-components";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Acessories,
  Footer,
} from "./styles";

type Props = NativeStackScreenProps<any, "CarDetails">;

interface Params {
  car: CarDTO;
}

export function CarDetails({ navigation }: Props) {
  const route = useRoute();
  const { car } = route.params as Params;
  const theme = useTheme();

  const scrolly = useSharedValue(0);
  const scrollHandle = useAnimatedScrollHandler((event) => {
    scrolly.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrolly.value,
        [0, 200],
        [200, 90],
        Extrapolate.CLAMP
      ),
    };
  });

  const sliderCarStyleAnimated = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrolly.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });
  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.background_secondary },
        ]}
      >
        <Header>
          <BackButton onPress={() => navigation.goBack()} />
        </Header>
        <Animated.View style={sliderCarStyleAnimated}>
          <CarImages>
            <ImagesSlider imagesUrl={car.photos} />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandle}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>
        <Acessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoriesIcon(accessory.type)}
            />
          ))}
        </Acessories>
        <About>
          {car.about} {car.about} {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>
      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={() => navigation.navigate("Schedulling", { car })}
        />
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 1,
  },
});

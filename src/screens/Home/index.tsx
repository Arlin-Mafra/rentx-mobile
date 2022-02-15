import React, { useEffect, useState } from "react";
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";
import { CarDTO } from "../../dtos/CarDTO";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar, StyleSheet, BackHandler } from "react-native";
import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { api } from "../../services/api";
import { LoadingCar } from "../../components/LoadingCar";
import theme from "../../styles/theme";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Container, Header, HeaderContent, TotalCars, CarList } from "./styles";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

type Props = NativeStackScreenProps<any, "Home">;

export function Home({ navigation }: Props) {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getCars() {
      try {
        setLoading(true);
        const response = await api.get("/cars");
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getCars();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }, []);

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }
  function handleMyCarsOpen() {
    navigation.navigate("MyCars");
  }

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsButtonStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {},
  });

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <HeaderContent>
          <Logo />
          <TotalCars>Total de {cars.length} carros</TotalCars>
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadingCar />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[myCarsButtonStyles, styles.button]}>
          <ButtonAnimated onPress={handleMyCarsOpen}>
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.main,
    position: "absolute",
    bottom: 13,
    right: 22,
    height: 60,
    width: 60,
    borderRadius: 30,
  },
});

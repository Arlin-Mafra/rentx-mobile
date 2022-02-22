import React, { useEffect, useRef, useState } from "react";
import { StatusBar, StyleSheet, BackHandler } from "react-native";
import { synchronize } from "@nozbe/watermelondb/sync";

import { RectButton, PanGestureHandler } from "react-native-gesture-handler";
import { useNetInfo } from "@react-native-community/netinfo";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { CarDTO } from "../../dtos/CarDTO";
import { Car } from "../../components/Car";
import { Car as ModelCar } from "../../database/models/Car";

import { Ionicons } from "@expo/vector-icons";
import Logo from "../../assets/logo.svg";

import { api } from "../../services/api";
import { LoadingCar } from "../../components/LoadingCar";

import theme from "../../styles/theme";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Container, Header, HeaderContent, TotalCars, CarList } from "./styles";
import { database } from "../../database";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

type Props = NativeStackScreenProps<any, "Home">;

export function Home({ navigation }: Props) {
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(false);

  const netInfo = useNetInfo();
  const synchronizing = useRef(false);

  useEffect(() => {
    async function offLineSynchronized() {
      if (netInfo.isConnected && !synchronizing.current) {
        synchronizing.current = true;
        try {
          await synchronize({
            database,
            pullChanges: async ({ lastPulledAt }) => {
              const response = await api.get(
                `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
              );

              const { changes, latestVersion } = await response.data;

              return { changes, timestamp: latestVersion };
            },
            pushChanges: async ({ changes }) => {
              const user = changes.users;
              await api.post("/users/sync", user);
            },
          });
        } catch (error) {
          throw new Error(error);
        } finally {
          synchronizing.current = false;
        }
      }
    }
    offLineSynchronized();
  }, [netInfo.isConnected]);

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        setLoading(true);
        const carCollection = database.get<ModelCar>("cars");
        const cars = await carCollection.query().fetch();
        console.log(cars);
        if (isMounted) {
          setCars(cars);
        }
      } catch (error) {
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchCars();

    return () => {
      isMounted = false;
    };
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

import React, { useEffect, useState } from "react";
import { FlatList, StatusBar } from "react-native";
import { BackButton } from "../../components/BackButton";
import { AntDesign } from "@expo/vector-icons";
import { Car } from "../../components/Car";
import { CarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";
import { useTheme } from "styled-components";
import { LoadingCar } from "../../components/LoadingCar";
import { Car as ModelCar } from "../../database/models/Car";

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsNumber,
  CarWrapper,
  CarFooter,
  CarFooterPeriod,
  CarFooterTitle,
  CarFooterDate,
} from "./styles";

interface CarsProps {
  id: string;
  user_id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

export function MyCars({ navigation }) {
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get(`/rentals`);
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);
  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton
          style={{ marginBottom: 30 }}
          color={theme.colors.shape}
          onPress={() => navigation.goBack()}
        />
        <Title>
          Seus agendamentos,{"\n"}
          estão aqui.
        </Title>

        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>

      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsNumber>{cars.length}</AppointmentsNumber>
        </Appointments>
        {loading ? (
          <LoadingCar />
        ) : (
          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car
                  data={item.car}
                  style={{ backgroundColor: theme.colors.background_secondary }}
                />
                <CarFooter>
                  <CarFooterTitle>Periodo</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      color={theme.colors.text}
                      size={20}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        )}
      </Content>
    </Container>
  );
}

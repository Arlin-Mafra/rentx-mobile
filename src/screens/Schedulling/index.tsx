import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import theme from "../../styles/theme";
import { BackButton } from "../../components/BackButton";
import ArrowSvg from "../../assets/arrow.svg";

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from "./styles";
import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";

type Props = NativeStackScreenProps<any, "Schedulling">;

export function Schedulling({ navigation }: Props) {
  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton
          color={theme.colors.shape}
          onPress={() => navigation.goBack()}
        />
        <Title>
          Escolha uma{"\n"}
          data de início e{"\n"}
          fim do aluguel
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={true}>28/11/2021</DateValue>
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={true}>30/11/2021</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={() => navigation.navigate("SchedullingDetails")}
        />
      </Footer>
    </Container>
  );
}

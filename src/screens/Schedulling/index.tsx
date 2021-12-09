import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import theme from "../../styles/theme";
import { Button } from "../../components/Button";
import { format } from "date-fns";
import { getPlataformDate } from "../../Utils/getPlataformDate";
import { useRoute } from "@react-navigation/core";
import { CarDTO } from "../../dtos/CarDTO";
import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDateProps,
} from "../../components/Calendar";
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

type Props = NativeStackScreenProps<any, "Schedulling">;

interface RentalPeriodProps {
  startFormated: string;
  endFormated: string;
}

interface Params {
  car: CarDTO;
}

export function Schedulling({ navigation }: Props) {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );

  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );

  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>(
    {} as RentalPeriodProps
  );

  const route = useRoute();
  const { car } = route.params as Params;

  function handleChoosePeriod() {
    navigation.navigate("SchedullingDetails", {
      car,
      dates: Object.keys(markedDates),
    });
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormated: format(
        getPlataformDate(new Date(firstDate)),
        "dd/MM/yyyy"
      ),
      endFormated: format(getPlataformDate(new Date(endDate)), "dd/MM/yyyy"),
    });
  }
  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton
          style={{ marginBottom: 20 }}
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
            <DateValue selected={!!rentalPeriod.startFormated}>
              {rentalPeriod.startFormated}
            </DateValue>
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormated}>
              {rentalPeriod.endFormated}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleChoosePeriod}
          enabled={!!rentalPeriod.startFormated}
        />
      </Footer>
    </Container>
  );
}

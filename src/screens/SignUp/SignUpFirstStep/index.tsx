import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from "./styels";

type Props = NativeStackScreenProps<any, "SignUpFirstStep">;

export function SignUpFirstStep({ navigation }: Props) {
  function handleBack() {
    navigation.goBack();
  }
  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
        <Steps>
          <Bullet active={true} />
          <Bullet active={false} />
        </Steps>
      </Header>
      <Title>Crie sua{"\n"}conta</Title>
      <SubTitle>
        Faça seu cadastro de{"\n"}
        forma rápida e fácil.
      </SubTitle>
      <Form>
        <FormTitle>1.Dados</FormTitle>
      </Form>
    </Container>
  );
}

import React from "react";
import { StatusBar } from "react-native";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";
import theme from "../../styles/theme";

import { Container, Header, Title, SubTitle, Footer, Form } from "./styles";

export function SignIn() {
  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <Title>
          Estamos {"\n"}
          quase lá.
        </Title>
        <SubTitle>
          Faça seu login para começar{"\n"}
          uma experiência incrível.
        </SubTitle>
      </Header>
      <Form>
        <Input
          iconName="mail"
          placeholder="E-mail"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
        />
        <PasswordInput iconName="lock" placeholder="Senha" />
      </Form>
      <Footer>
        <Button
          title="Login"
          enabled={false}
          loading={false}
          onPress={() => {}}
        />
        <Button
          title="Criar conta gratuíta"
          color={theme.colors.background_secondary}
          ligth
          enabled={false}
          loading={false}
          onPress={() => {}}
        />
      </Footer>
    </Container>
  );
}

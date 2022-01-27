import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface Props{
  isFocused:boolean;
}

export const Container = styled.View`
  margin-bottom: 8px;
  flex-direction: row;
`;

export const IconContainer = styled.View<Props>`
  justify-content: center;
  align-items: center;
  background: ${({theme}) => theme.colors.background_secondary};
  width: 56px;
  height: 56px;
  margin-right: 2px;

  ${({isFocused,theme}) => isFocused && css`
    border-bottom-width:2px;
    border-bottom-color: ${theme.colors.main} ;
  `}
`;
export const InputText = styled.TextInput<Props>`
  flex: 1;
  height: 56px;
  background: ${({theme}) => theme.colors.background_secondary};
  color: ${({theme}) => theme.colors.text};
  padding: 18px 23px;
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.primary_400};

  ${({isFocused,theme}) => isFocused && css`
    border-bottom-width:2px;
    border-bottom-color: ${theme.colors.main} ;
  `}
`;

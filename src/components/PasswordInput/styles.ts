import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 56px;
 
  margin-bottom: 8px;
  flex-direction: row;
`;

export const IconContainer = styled.View`
  justify-content: center;
  align-items: center;
  background: ${({theme}) => theme.colors.background_secondary};
  width: 56px;
  height: 56px;
  margin-right: 2px;
`;
export const InputText = styled.TextInput`
  flex: 1;
  background: ${({theme}) => theme.colors.background_secondary};
  color: ${({theme}) => theme.colors.text};
  padding: 18px 23px;
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.primary_400};

`;

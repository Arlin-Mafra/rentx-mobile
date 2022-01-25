import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    padding: 0 32px;
    background: ${({theme}) => theme.colors.background_primary};
`;
export const Header = styled.View`
    width: 100%;
    margin-top: ${getStatusBarHeight() + 115}px;
`;
export const Title = styled.Text`
    font-size: ${RFValue(40)}px;
    font-family: ${({theme}) => theme.fonts.secondary_600};
    color: ${({theme}) => theme.colors.title};
`;
export const SubTitle = styled.Text`
    margin-top: 16px;
    font-size: ${RFValue(15)}px;
    font-family: ${({theme}) => theme.fonts.primary_400};
    color: ${({theme}) => theme.colors.text};
    line-height: ${RFValue(25)}px ;
`;
export const Form = styled.View`
    margin: 64px 0;
`;

export const Footer = styled.View`
    bottom: 0px;
`;

import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    padding: 0 32px;
    background: ${({theme})=>theme.colors.background_primary};

`;
export const Header = styled.View`
    width: 100%;
    flex-direction:row ;
    justify-content: space-between;
    align-items: center;

    margin-top: ${getStatusBarHeight() + 36}px;
    margin-bottom: 65px;
`;
export const Steps = styled.View`
    flex-direction:row ;
    justify-content: center;
    align-items: center;
`;
export const Form = styled.View`
    width: 100%;
    margin-top: 64px;
    margin-bottom: 32px;
`;
export const FormTitle = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({theme}) => theme.fonts.secondary_600};
    color: ${({theme}) => theme.colors.title};
    margin-bottom: 24px;
`;

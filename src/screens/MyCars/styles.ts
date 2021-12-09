import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    background-color: ${({theme}) => theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    height: 350px;
    background-color: ${({theme})=> theme.colors.header};

    justify-content: center;
    padding: 25px;

    padding-top: ${getStatusBarHeight()}px;
`;
export const  Title = styled.Text`
    color: ${({theme})=> theme.colors.shape};
    font-family: ${({theme})=> theme.fonts.secondary_600};
    font-size: ${RFValue(28)}px;

    
    margin-top: 24px;
`;
export const  SubTitle = styled.Text`
    color: ${({theme})=> theme.colors.shape};
    font-family: ${({theme})=> theme.fonts.secondary_400};
    font-size: ${RFValue(15)}px;
    margin-top: 18px;
    margin-bottom: 34px;
`;

export const Content = styled.View`
    flex: 1;
    width: 100%;
    padding: 0 16px;
`;
export const Appointments = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 24px 0;

 
`;
export const AppointmentsTitle = styled.Text`
    color: ${({theme})=> theme.colors.text};
    font-family: ${({theme})=> theme.fonts.secondary_400};
    font-size: ${RFValue(15)}px;
`;
export const AppointmentsNumber = styled.Text`
    color: ${({theme})=> theme.colors.title};
    font-family: ${({theme})=> theme.fonts.secondary_500};
    font-size: ${RFValue(15)}px;
`;

export const CarWrapper = styled.View`
    margin-bottom: 16px;
    background-color: ${({theme}) => theme.colors.background_secondary};

`;
export const CarFooter = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 24px 15px;

    background-color: ${({theme})=> theme.colors.background_secondary};   
    
    border-top-width: 2px;
    border-top-color: ${({theme})=> theme.colors.shape}; 
`;
export const CarFooterPeriod = styled.View`
    flex-direction: row;
   
`;
export const CarFooterTitle = styled.Text`
    color: ${({theme})=> theme.colors.text_detail};
    font-family: ${({theme})=> theme.fonts.secondary_500};
    font-size: ${RFValue(10)}px;
    text-transform: uppercase ;
`;
export const CarFooterDate = styled.Text`
    color: ${({theme})=> theme.colors.title};
    font-family: ${({theme})=> theme.fonts.primary_400};
    font-size: ${RFValue(13)}px;

    margin: 0 10px;
`;



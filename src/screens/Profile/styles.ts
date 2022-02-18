import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface OptionsProps {
    active:boolean;
}


export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    width: 100%;
    height: 227px;

    background-color: ${({theme})=> theme.colors.header};
    padding: 0px 32px;
    align-items: center;

`; 
export const HeaderContent = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: ${getStatusBarHeight() + 32}px;

`; 
export const Title = styled.Text`
    font-size: ${RFValue(25)}px;
    font-family: ${({theme})=> theme.fonts.secondary_600};
    color: ${({theme})=> theme.colors.background_secondary};

`;

export const PhotoContainer = styled.View`
    width: 180px;
    height: 180px;
    border-radius: 90px;
    background-color: ${({theme})=> theme.colors.shape};
    margin-top: 48px;
`;

export const Photo = styled.Image`
    width: 180px;
    height: 180px;
    border-radius: 90px;
`;

export const PhotoButton = styled(RectButton)`
    background-color:  ${({theme})=> theme.colors.main};
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;

    position: absolute;
    bottom: 10px;
    right: 10px;
`;
export const Content = styled.View`
    flex: 1;
    padding: 0 32px;
    margin-top: 122px;
`;
export const Options = styled.View`
    border-bottom-width: 1px;
    border-bottom-color:  ${({theme})=> theme.colors.line};
    margin-bottom: 24px;

    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;
export const Option = styled.TouchableOpacity<OptionsProps>`
    padding-bottom: 14px;

    ${({active}) => active && css`
    border-bottom-width: 3px;
    border-bottom-color:  ${({theme})=> theme.colors.main};
    `}
`;
export const OptionTitle = styled.Text<OptionsProps>`
    font-size: ${RFValue(20)}px;
    font-family: ${({theme})=> theme.fonts.secondary_600};
    color: ${({active, theme}) => 
    active ?  theme.colors.title : theme.colors.text_detail};

`;

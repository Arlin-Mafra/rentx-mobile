import { Dimensions } from "react-native";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";

interface ImageIndexProps{
    active:boolean;
}

export const Container = styled.View`
    width: 100%;
`;
export const ImagesIdexes = styled.View`
    flex-direction: row;
    align-self: flex-end;
    padding-right: 24px;
`;

export const CarimageWrapper = styled.View`
    width: ${Dimensions.get('window').width}px;
    height: 132px;

    justify-content: center;
    align-items: center;
`;
export const CarImage = styled(FastImage)`
    width: 280px;
    height: 132px;
`;
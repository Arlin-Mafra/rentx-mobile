import React from "react";

import {
  Container,
  ImagesIdexes,
  ImageIndex,
  CarimageWrapper,
  CarImage,
} from "./styles";

interface Props {
  imagesUrl: string[];
}

export function ImagesSlider({ imagesUrl }: Props) {
  return (
    <Container>
      <ImagesIdexes>
        <ImageIndex active={false} />
        <ImageIndex active={true} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImagesIdexes>
      <CarimageWrapper>
        <CarImage source={{ uri: imagesUrl[0] }} resizeMode="contain" />
      </CarimageWrapper>
    </Container>
  );
}

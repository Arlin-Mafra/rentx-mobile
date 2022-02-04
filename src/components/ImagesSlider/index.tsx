import React, { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";
import { Bullet } from "../Bullet";

import { Container, ImagesIdexes, CarimageWrapper, CarImage } from "./styles";

interface Props {
  imagesUrl: string[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImagesSlider({ imagesUrl }: Props) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });
  return (
    <Container>
      <ImagesIdexes>
        {imagesUrl.map((item, index) => (
          <Bullet key={index} active={index === imageIndex} />
        ))}
      </ImagesIdexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CarimageWrapper>
            <CarImage source={{ uri: item }} resizeMode="contain" />
          </CarimageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
}

import React from 'react';
import {Dimensions, Image, type ImageSourcePropType} from 'react-native';

import {Box} from '@components/atoms';
import {type BoxProps} from '@components/atoms/Box/Box';

type ProductImageProps = {
  source: ImageSourcePropType;
  width?: number;
  height?: number;
} & BoxProps;

const imageProductHeight = Dimensions.get('window').width / 2.7;

export default React.memo(function ProductImage(
  props: ProductImageProps,
): JSX.Element {
  const {
    source,
    width = '100%',
    height = imageProductHeight,
    ...baseProps
  } = props;
  return (
    <Box
      borderWidth={5}
      style={{borderRadius: 150}}
      borderColor="cardTertiaryBackground"
      {...baseProps}>
      <Image
        source={source}
        style={{
          width,
          height,
          borderRadius: 150,
        }}
        resizeMode="contain"
      />
    </Box>
  );
});

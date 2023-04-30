import React, {memo} from 'react';
import {
  type StyleProp,
  View,
  type ViewProps,
  type ViewStyle,
} from 'react-native';

import {scale, verticalScale} from '@utils/layout';

interface GapProps extends ViewProps {
  height?: number;
  width?: number;
}

interface StyleSheetType {
  container: (height: number, width: number) => StyleProp<ViewStyle>;
}

export default memo(function Gap(props: GapProps): JSX.Element {
  const {height = 0, width = 0, ...baseProps} = props;
  return (
    <View
      style={styles.container(verticalScale(height), scale(width))}
      {...baseProps}
    />
  );
});

const styles: StyleSheetType = {
  container: (height: number, width: number): ViewStyle => ({
    height,
    width,
  }),
};

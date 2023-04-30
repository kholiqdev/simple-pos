import React from 'react';

import {Box} from '@components/atoms';
import {type BoxProps} from '@components/atoms/Box/Box';

type BaseLayoutProps = BoxProps;

export default function BaseLayout(props: BaseLayoutProps): JSX.Element {
  const {children, ...baseProps} = props;

  return (
    <Box px="s" backgroundColor="mainBackground" {...baseProps}>
      {children}
    </Box>
  );
}

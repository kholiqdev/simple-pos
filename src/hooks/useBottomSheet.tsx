import React from 'react';

import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {type BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

interface BottomSheetHookProps {
  childrenComponent: JSX.Element;
  snapPoints: string[];
  handleSheetChanges?: (index: number) => void;
  index?: number;
}

export default function useBottomSheet(props: BottomSheetHookProps): {
  component: JSX.Element;
  ref: React.RefObject<BottomSheet>;
} {
  const {childrenComponent, snapPoints, index = -1, handleSheetChanges} = props;
  const ref = React.useRef<BottomSheet>(null);

  const renderBackdrop = React.useCallback(
    (backdropProps: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop {...backdropProps} />
    ),
    [],
  );

  const component = React.useMemo(
    () => (
      <BottomSheet
        ref={ref}
        index={index}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        backdropComponent={renderBackdrop}>
        {childrenComponent}
      </BottomSheet>
    ),
    [childrenComponent, snapPoints, index, handleSheetChanges, renderBackdrop],
  );

  return {component, ref};
}

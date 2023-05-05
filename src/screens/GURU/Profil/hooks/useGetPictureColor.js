import {useCallback, useEffect, useState} from 'react';
import ImageColors from 'react-native-image-colors';

export default function useGetPictureColor(uri) {
  const [colorResult, setColorResult] = useState('black');

  const getPictureColor = useCallback(async () => {
    try {
      if (uri?.length > 0) {
        const result = await ImageColors.getColors(
          uri?.replaceAll?.(' ', '%20'),
          {
            fallback: '#228B22',
            cache: true,
            key: uri + '',
          },
        );

        if (result.platform === 'android') {
          if (result.vibrant) {
            setColorResult(result.vibrant);
          }
        }
      }
    } catch (e) {}
  }, [uri]);

  useEffect(() => {
    if (uri?.length > 0) {
      getPictureColor();
    }
  }, [uri]);

  return {colorResult};
}

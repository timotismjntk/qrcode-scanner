import {useCallback, useEffect, useRef, useState} from 'react';
import {Blurhash} from 'react-native-blurhash';

export default function useCreateBlurhash(uri) {
  const [blurhasResult, setBlurhasResult] = useState(
    'W28NX:?d0eM{-;^+00Dh^+xuR*9F-;-:9ZIUIo%g,-IVtl%MROQ-',
  );
  const isSuccesGetBlurHash = useRef(false);

  const createBlurhash = useCallback(async () => {
    try {
      if (!isSuccesGetBlurHash?.current) {
        if (uri?.length > 0) {
          const blurhash = await Blurhash.encode(
            uri?.replaceAll(' ', '%20'),
            6,
            4,
          );
          if (blurhash) {
            setBlurhasResult(blurhash);
            isSuccesGetBlurHash.current = true;
          }
        }
      }
    } catch (e) {}
  }, [uri, isSuccesGetBlurHash]);

  useEffect(() => {
    if (uri?.length > 0) {
      createBlurhash();
    }
  }, [uri, createBlurhash]);

  return {blurhasResult};
}

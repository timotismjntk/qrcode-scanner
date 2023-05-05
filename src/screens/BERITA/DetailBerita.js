import React, {useCallback, useMemo, useRef} from 'react';
import {Image, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';

import {windowWidth, windowHeight} from '../../utils';
import exampleImage from '../../assets/icons2/web-content.png';

const image = Image.resolveAssetSource(exampleImage).uri;

const konten = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, height=device-height initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" type="text/css" rel="stylesheet" />
    </head>
    <body>
        <div class="wrapper">
          <object loading="lazy" class="headerImage" data="#headerImage#" type="image/png">
            <img loading="lazy" class="headerImage" src="${image}" />
          </object>
          <div class="subWrapper">
            <p class="tanggal">#tanggal#</p>
            <H1 class="judulBerita">#judulBerita#</H1>
            #kontenBlog#
          </div>
        </div>
    </body>
    <style>
        body {
          padding: 15px;
          margin-top: 12vh;
          font-family: 'poppins';
          padding-bottom: 8vh;
        }
        .wrapper {
          box-sizing: border-box;
          background: #FFFFFF;
          border: 1px solid rgba(59, 59, 59, 0.15);
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          border-radius: 7px;
          overflow: hidden;
        }
        .subWrapper {
          padding: 10px;
          padding-top: 0px;
        }
        .headerImage {
          height: 25vh;
          width: 100%;
          background: #bfbfbf;
        }
        .tanggal {
          font-size: 12px;
          line-height: 13px;
          color: black;
        }
        .judulBerita {
          font-weight: bolder;
          font-size: 17px;
          color: black;
        }
        .penulis {
          font-size: 14px;
          color: black;
          line-height: 13px;
        }
    </style>
    </html>`;

export default function DetailBlog({route}) {
  const scrollRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      scrollRef?.current?.scrollTo?.({x: 0, y: 0, animated: true});
    }, []),
  );

  const htmlKonten = useMemo(() => {
    const replacer = {
      '#headerImage#': route?.params?.thumbnail || image,
      '#judulBerita#': route?.params?.judul || '-',
      '#kontenBlog#': route?.params?.konten || '-',
      '#tanggal#': route?.params?.haritanggal_formated || '-',
    };
    return konten?.replace(
      /#headerImage#|#judulBerita#|#kontenBlog#|#tanggal#/gi,
      matched => replacer[matched],
    );
  }, [route]);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        originWhitelist={['*']}
        style={{
          width: windowWidth,
        }}
        setBuiltInZoomControls={false}
        startInLoadingState
        source={{html: htmlKonten}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: 'white',
    minHeight: windowHeight,
    paddingBottom: '15%',
    paddingTop: '25%',
    paddingHorizontal: '4%',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 20,
    borderRadius: windowWidth * 0.02,
    overflow: 'hidden',
    width: '100%',
    paddingBottom: '3%',
  },
  imageHeader: {
    width: windowWidth * 0.95,
    height: windowWidth * 0.7,
    overflow: 'hidden',
  },
  contentWrapper: {
    paddingHorizontal: '3.5%',
    paddingVertical: '2%',
    flex: 1,
  },
  publishedAt: {
    color: 'black',
    fontSize: windowWidth * 0.036,
    fontFamily: 'OpenSans-Regular',
  },
  title: {
    color: 'black',
    marginTop: '2%',
    fontSize: windowWidth * 0.05,
    fontFamily: 'OpenSans-Bold',
  },
  author: {
    color: 'black',
    fontSize: windowWidth * 0.03,
    marginTop: '4%',
    fontFamily: 'OpenSans-Regular',
  },
});

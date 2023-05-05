import React, {useRef, useState} from 'react';
import {StatusBar, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CollapsibleTabViewHeader from 'react-native-tab-view-header';
import {RectButton} from 'react-native-gesture-handler';

// components
import RenderHeaderProfil from './components/RenderHeaderProfil';
import RenderLabel from './components/RenderLabel';
import LoadingModal from '../../../components/LoadingModal';

import {windowWidth, windowHeight} from '../../../utils';

// hooks
import useProfilSayaSiswa from './hooks/useProfilSayaSiswa';
import useChangeProfilData from './hooks/useChangeProfilData';

export default function Index({navigation}) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isHeaderSticked, setIsHeaderSticked] = useState(false);
  const flatlistRef = useRef({})?.current;
  const {isLoadingUpdateProfilSaya, tabSlides, setTabSlides, url_foto} =
    useProfilSayaSiswa({flatlistRef});
  const {changeProfilData} = useChangeProfilData({
    data: tabSlides,
    setError: setTabSlides,
    setCurrentSlideIndex,
    flatlistRef,
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor="transparent" translucent />
      <CollapsibleTabViewHeader
        removeClippedSubviews={false}
        style={styles.tabContainer}
        tabSlides={tabSlides}
        tabIndex={currentSlideIndex} // if you want to control the current tab index
        onIndexChange={i => {
          setCurrentSlideIndex(i);
        }}
        headerHeight={windowHeight * 0.3}
        tabBarStickyPosition={windowHeight * 0.08}
        initialLayout={{width: windowWidth}}
        renderHeader={() => (
          <RenderHeaderProfil
            isHeaderSticked={isHeaderSticked}
            url_foto={url_foto}
          />
        )}
        renderLabel={props => <RenderLabel {...props} />}
        enableRefresh
        onTabBarStickyChange={sticked => {
          navigation.setParams({showHeaderTitle: sticked});
          setIsHeaderSticked(sticked);
        }}
      />
      <RectButton onPress={changeProfilData} style={styles.saveButton}>
        <Text style={styles.saveButtonTitle}>Simpan</Text>
      </RectButton>
      <LoadingModal open={isLoadingUpdateProfilSaya} close={() => null} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabContainer: {
    paddingTop: '6%',
  },
  saveButton: {
    padding: '3%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#61A2F9',
    elevation: 10,
  },
  saveButtonTitle: {
    color: 'white',
    fontSize: windowWidth * 0.04,
    fontFamily: 'OpenSans-SemiBold',
  },
});

/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {StyleSheet, FlatList, Text, View, Image} from 'react-native';

import LinearButton from './LinearButton';
import {RectButton} from 'react-native-gesture-handler';

import {windowWidth, moderateScale, verticalScale, scale} from '../utils';

export default function Roles({
  data,
  containerStyle,
  customRender,
  theme = 'default',
}) {
  const RenderItem = ({item}) => {
    if (customRender) {
      return customRender;
    } else {
      if (theme === 'default') {
        return (
          <LinearButton
            colors={['#1b6cfc', '#0035ad']}
            style={styles.defaultLinear}>
            <RectButton style={styles.defaultBtn} onPress={() => item.fn()}>
              <View style={styles.defaultIconWrapper}>
                <Image style={styles.defaultIcon} source={item.icon} />
              </View>
              <Text style={styles.defaultBtnTitle}>{item.title}</Text>
            </RectButton>
          </LinearButton>
        );
      } else if (theme === 'default2') {
        return (
          <View style={styles.default2Item}>
            <LinearButton
              colors={['#1b6cfc', '#0035ad']}
              style={styles.default2Linear}>
              <RectButton style={styles.default2Btn} onPress={() => item.fn()}>
                <View style={styles.default2IconWrapper}>
                  <Image style={styles.default2Icon} source={item.icon} />
                </View>
              </RectButton>
            </LinearButton>
            <Text numberOfLines={2} style={styles.default2BtnTitle}>
              {item.title}
            </Text>
          </View>
        );
      } else if (theme === 'rounded') {
        // rounded
        return (
          <RectButton
            onPress={() => item.fn()}
            rippleColor="#0099e5"
            style={styles.roundedItem}>
            <LinearButton
              colors={['#1b6cfc', '#0035ad']}
              style={styles.roundedLinear}>
              <View style={styles.roundedIconWrapper}>
                <Image style={styles.roundedIcon} source={item.icon} />
              </View>
            </LinearButton>
            <Text numberOfLines={2} style={styles.roundedBtnTitle}>
              {item.title}
            </Text>
          </RectButton>
        );
      } else {
        // diamond square shaped
        return (
          <RectButton
            onPress={() => item.fn()}
            rippleColor="#0099e5"
            style={styles.diamondItem}>
            <LinearButton
              colors={['#1b6cfc', '#0035ad']}
              style={styles.diamondLinear}>
              <View style={styles.diamondIconWrapper}>
                <Image style={styles.diamondIcon} source={item.icon} />
              </View>
            </LinearButton>
            <Text numberOfLines={2} style={styles.diamondBtnTitle}>
              {item.title}
            </Text>
          </RectButton>
        );
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.box}>
        <View style={styles.defaultSection}>
          <Text style={styles.defaultSectionTitle}>Role</Text>
          <Text style={styles.defaultSectionSubTitle}>
            Pilih role dibawah ini:
          </Text>
        </View>
        <FlatList
          horizontal
          contentContainerStyle={containerStyle || styles.defaultContainer}
          data={data || []}
          keyExtractor={(item, index) => index.toString()}
          extraData={[customRender, theme]}
          renderItem={({item}) => <RenderItem item={item} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: '2%',
    marginBottom: '5%',
  },
  box: {
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: windowWidth * 0.02,
    paddingBottom: '4%',
  },
  defaultContainer: {
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: '4%',
    borderRadius: windowWidth * 0.02,
    paddingBottom: '2%',
  },
  defaultSection: {
    padding: '4%',
  },
  defaultSectionTitle: {
    fontSize: moderateScale(22),
    color: 'black',
    fontFamily: 'OpenSans-Bold',
  },
  defaultSectionSubTitle: {
    fontSize: moderateScale(14),
    color: 'grey',
    fontFamily: 'OpenSans-Regular',
  },
  defaultLinear: {
    justifyContent: 'center',
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: windowWidth * 0.03,
    alignItems: 'center',
    marginBottom: scale(12),
  },
  defaultBtn: {
    justifyContent: 'center',
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: windowWidth * 0.03,
    alignItems: 'center',
    elevation: windowWidth * 0.2,
  },
  defaultBtnTitle: {
    color: 'white',
    fontSize: moderateScale(11),
    paddingHorizontal: '3%',
    textAlign: 'center',
    marginTop: '4%',
    fontFamily: 'OpenSans-Regular',
  },
  defaultIconWrapper: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
    overflow: 'hidden',
    marginBottom: '2%',
  },
  defaultIcon: {
    width: '100%',
    height: '100%',
  },
  default2Item: {
    width: windowWidth * 0.2,
  },
  default2Linear: {
    justifyContent: 'center',
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    marginBottom: 0,
    borderRadius: windowWidth * 0.03,
    alignItems: 'center',
  },
  default2Btn: {
    justifyContent: 'center',
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: windowWidth * 0.03,
    alignItems: 'center',
  },
  default2BtnTitle: {
    fontSize: moderateScale(13),
    fontFamily: 'OpenSans-Regular',
    color: 'black',
    marginTop: '10%',
  },
  default2IconWrapper: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
    overflow: 'hidden',
    marginBottom: '2%',
  },
  default2Icon: {
    width: '100%',
    height: '100%',
  },
  roundedItem: {
    width: windowWidth * 0.22,
    alignItems: 'center',
    padding: '3%',
    borderRadius: windowWidth * 0.03,
  },
  roundedLinear: {
    justifyContent: 'center',
    marginBottom: 0,
    alignItems: 'center',
    width: windowWidth * 0.16,
    height: windowWidth * 0.16,
    borderRadius: windowWidth * 0.16,
  },
  roundedIconWrapper: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
    overflow: 'hidden',
    marginBottom: '2%',
  },
  roundedIcon: {
    width: '100%',
    height: '100%',
  },
  roundedBtnTitle: {
    fontSize: moderateScale(13),
    fontFamily: 'OpenSans-Regular',
    color: 'black',
    marginTop: '10%',
  },
  diamondItem: {
    width: windowWidth * 0.22,
    alignItems: 'center',
    padding: '3%',
    borderRadius: windowWidth * 0.03,
  },
  diamondLinear: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.12,
    height: windowWidth * 0.12,
    transform: [{rotate: '45deg'}],
    borderRadius: windowWidth * 0.01,
    marginTop: '10%',
  },
  diamondIconWrapper: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
    overflow: 'hidden',
    marginBottom: '2%',
    transform: [{rotate: '-45deg'}],
  },
  diamondIcon: {
    width: '100%',
    height: '100%',
  },
  diamondBtnTitle: {
    fontSize: moderateScale(12.5),
    fontFamily: 'OpenSans-Regular',
    color: 'black',
    marginTop: '20%',
    textAlign: 'center',
  },
});

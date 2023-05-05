import React, {useMemo, useState} from 'react';
import {Text, StyleSheet, View, Pressable, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import MonthPicker from 'react-native-month-year-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {windowWidth} from '../utils';

export default function Dropdown({
  list,
  type,
  selectedValue,
  setValue,
  placeholder,
  openDate,
  setOpenDate,
  selectedDate,
  setSelectedDate,
  arrowUpFn,
  arrowDownFn,
  controlledDate = true,
}) {
  const [openUnControlledDate, setOpenUnControlledDate] = useState(false);

  const generatedYears = useMemo(() => {
    return Array.from({length: 15}, (_, idx) =>
      String(new Date().getFullYear() - idx),
    );
  }, []);

  const generatedMonths = useMemo(() => {
    const month = new Intl.DateTimeFormat(['id'], {month: 'long'});
    return Array.from({length: 12}, (_, idx) =>
      String(
        month.format(new Date(`${new Date().getFullYear()}-${idx + 1}-01`)),
      ),
    );
  }, []);

  const generatedDays = useMemo(() => {
    return ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  }, []);

  const memoizedList = useMemo(() => {
    if (type === 'year') {
      return generatedYears;
    } else if (type === 'month') {
      return generatedMonths;
    } else if (type === 'day') {
      return generatedDays;
    } else {
      return list;
    }
  }, [generatedDays, generatedMonths, generatedYears, list, type]);

  if (type === 'date') {
    return (
      <Pressable
        style={styles.container}
        onPress={() => {
          controlledDate ? setOpenDate(true) : setOpenUnControlledDate(true);
        }}>
        <Text style={styles.datePlaceholder}>
          {selectedDate || placeholder}
        </Text>
        <DatePicker
          modal
          open={controlledDate ? openDate : openUnControlledDate}
          date={selectedDate?.length > 0 ? new Date(selectedDate) : new Date()}
          locale="id"
          androidVariant="iosClone"
          title="Pilih Tanggal"
          cancelText="Tutup"
          confirmText="Simpan"
          mode="date"
          onConfirm={date => {
            const formattedDate = date?.toLocaleDateString?.('id', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            });
            setSelectedDate(
              String(formattedDate?.split?.('/')?.reverse?.()?.join?.('-')),
            );
            controlledDate
              ? setOpenDate(false)
              : setOpenUnControlledDate(false);
          }}
          onCancel={() => {
            controlledDate
              ? setOpenDate(false)
              : setOpenUnControlledDate(false);
          }}
        />
      </Pressable>
    );
  }

  if (type === 'dateMonth') {
    return (
      <Pressable
        style={styles.container}
        onPress={() =>
          controlledDate ? setOpenDate(true) : setOpenUnControlledDate(true)
        }>
        <Text style={styles.datePlaceholder}>
          {selectedDate || placeholder}
        </Text>
        {controlledDate
          ? openDate
          : openUnControlledDate && (
              <MonthPicker
                locale="id"
                onChange={(event, date) => {
                  controlledDate
                    ? setOpenDate(false)
                    : setOpenUnControlledDate(false);
                  const monthYear = date
                    .toLocaleDateString?.('id', {
                      month: '2-digit',
                      year: 'numeric',
                    })
                    ?.split?.('/')
                    ?.join?.('-');
                  setSelectedDate(monthYear);
                }}
                value={new Date()}
              />
            )}
      </Pressable>
    );
  }

  if (type === 'number') {
    return (
      <View style={styles.numberContainer}>
        <TextInput
          value={selectedValue}
          placeholder={placeholder}
          keyboardType="numeric"
          onChangeText={text => {
            const removeNotNumber = String(Number(text.replace(/[^0-9]/g, '')));
            setValue(removeNotNumber);
          }}
          style={styles.numberInput}
        />
        <View style={styles.numberLeftContainer}>
          <MaterialIcons
            name="arrow-drop-up"
            size={windowWidth * 0.05}
            color="black"
            onPress={arrowUpFn}
          />
          <MaterialIcons
            name="arrow-drop-down"
            size={windowWidth * 0.05}
            color="black"
            onPress={arrowDownFn}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        mode="dropdown"
        dropdownIconColor="white"
        onValueChange={itemValue => {
          if (placeholder !== itemValue) {
            setValue(itemValue);
          } else {
            setValue('');
          }
        }}>
        <Picker.Item
          label={placeholder}
          style={styles.titlePlaceHolder}
          value={placeholder}
        />
        {memoizedList?.length > 0 &&
          memoizedList.map((item, index) => (
            <Picker.Item
              key={index}
              label={item}
              style={styles.item}
              value={item}
            />
          ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: windowWidth * 0.12,
    justifyContent: 'center',
    marginTop: '3%',
    backgroundColor: 'white',
    borderRadius: windowWidth * 0.02,
    paddingVertical: '2.5%',
    marginBottom: '6%',
    borderWidth: 0.8,
  },
  titlePlaceHolder: {
    fontSize: windowWidth * 0.04,
    color: 'black',
    fontFamily: 'OpenSans-Regular',
  },
  item: {
    color: 'black',
    width: '100%',
    flex: 1,
    fontSize: windowWidth * 0.04,
    fontFamily: 'OpenSans-Regular',
  },
  datePlaceholder: {
    fontSize: windowWidth * 0.04,
    color: 'black',
    fontFamily: 'OpenSans-Regular',
    paddingHorizontal: '4%',
  },
  numberContainer: {
    width: '100%',
    height: windowWidth * 0.12,
    marginTop: '3%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: windowWidth * 0.02,
    marginBottom: '3%',
    borderWidth: 0.8,
    flexDirection: 'row',
  },
  numberInput: {
    fontSize: windowWidth * 0.04,
    color: 'black',
    fontFamily: 'OpenSans-Regular',
    paddingHorizontal: '4%',
    flex: 1,
  },
  numberLeftContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingRight: '2%',
    paddingVertical: '2.5%',
  },
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

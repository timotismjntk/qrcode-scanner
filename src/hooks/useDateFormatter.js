import {useCallback} from 'react';

export default function useDateFormatter() {
  const isDateObject = useCallback(date => {
    return (
      Object.prototype.toString.call(date) === '[object Date]' &&
      new Date(date) !== 'Invalid Date'
    );
  }, []);

  const formatFn = useCallback((date, options) => {
    return date?.toLocaleDateString?.('id', options);
  }, []);

  const dateFormatter = useCallback(
    ({
      currentDate = new Date(),
      formatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      },
      separator = '-',
      formatType = null,
    }) => {
      if (currentDate) {
        if (typeof currentDate === 'object' && isDateObject(currentDate)) {
          return formatFn(currentDate, formatOptions)?.replace?.(
            /[^a-zA-Z0-9, ]/g,
            separator,
          );
        } else {
          const months = {
            januari: '01',
            january: '01',
            februari: '02',
            february: '02',
            maret: '03',
            march: '03',
            april: '04',
            mei: '05',
            may: '05',
            juni: '06',
            june: '06',
            juli: '07',
            july: '07',
            agustus: '08',
            august: '08',
            september: '09',
            oktober: '10',
            october: '10',
            november: '11',
            desember: '12',
            december: '12',
          };
          if (formatType === 'MM-DD-YYYY') {
            const [month, date, year] = currentDate?.split('-');
            const result = formatFn(
              new Date(year?.concat('-', month, '-', date)),
              formatOptions,
            );
            return separator
              ? result?.replace?.(/[^a-zA-Z0-9, ]/g, separator)
              : result;
          } else {
            if (currentDate?.includes(', ')) {
              let [date, month, year] = currentDate?.split(', ')[1]?.split(' '); // to handle date like: DayName, Date MonthName Year (Senin, 20 Agustus 2022)
              month = month?.toLocaleLowerCase();
              const result = formatFn(
                new Date(year?.concat('-', months[month], '-', date)),
                formatOptions,
              );
              return separator
                ? result?.replace?.(/[^a-zA-Z0-9, ]/g, separator)
                : result;
            } else {
              currentDate = currentDate?.replaceAll(' ', '-'); // to handle date like: Date MonthName Year (20 Agustus 2022)
              currentDate = currentDate?.replaceAll('/', '-'); // to handle date like: Date/MonthName/Year (20/Agustus/2022)

              if (/[a-zA-Z]/g.test(currentDate)) {
                let [date, month, year] = currentDate?.split('-');
                month = month?.toLocaleLowerCase();
                const result = formatFn(
                  new Date(year?.concat('-', months[month], '-', date)),
                  formatOptions,
                );
                return separator
                  ? result?.replace?.(/[^a-zA-Z0-9, ]/g, separator)
                  : result;
              } else {
                let [date, month, year] = currentDate?.split('-');
                if (date?.length === 4) {
                  const tempYear = year;
                  const tempDate = date;
                  year = tempDate;
                  date = tempYear;
                  const result = formatFn(
                    new Date(year?.concat('-', month, '-', date)),
                    formatOptions,
                  );
                  return separator
                    ? result?.replace?.(/[^a-zA-Z0-9, ]/g, separator)
                    : result;
                } else {
                  const result = formatFn(
                    new Date(year?.concat('-', month, '-', date)),
                    formatOptions,
                  );
                  return separator
                    ? result?.replace?.(/[^a-zA-Z0-9, ]/g, separator)
                    : result;
                }
              }
            }
          }
        }
      } else {
        return '-';
      }
    },
    [formatFn, isDateObject],
  );

  return {dateFormatter};
}

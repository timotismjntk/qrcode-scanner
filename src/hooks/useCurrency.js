import {useCallback} from 'react';

export default function useCurrency() {
  const currency = useCallback(number => {
    if (number !== null) {
      return new Intl.NumberFormat('id', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(Number(number));
    } else {
      return '-';
    }
  }, []);

  return {currency};
}

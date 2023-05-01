export const formatCurrency = (amount: number, currency = 'IDR'): string => {
  const resultCurrenct = Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);
  return resultCurrenct ?? `${currency} ${amount}`;
};

export const formatCurrencyTextInput = (value: string): string => {
  return value
    .replace(/^[0]/, '')
    .replace(/[^0-9]/g, '')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

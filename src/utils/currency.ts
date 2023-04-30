export const formatCurrency = (amount: number, currency = 'IDR'): string => {
  const resultCurrenct = Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);
  return resultCurrenct ?? `${currency} ${amount}`;
};

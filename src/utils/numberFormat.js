const units = {
  5: 'k',
  6: 'k',
  7: 'm',
  8: 'm',
  9: 'm',
  10: 'b',
};
export const formatNumber = (value) => {
  if (value >= 0) {
    const numberToString = typeof value === 'string' ? value : value.toString();
    const { length } = numberToString;
    const numberSplitted = numberToString.split('');
    if (length < 5) {
      return new Intl.NumberFormat('en-IN').format(value);
    }
    if (length === 5) {
      return `${numberSplitted[0]}${numberSplitted[1]}.${numberSplitted[2] > 0 ? numberSplitted[2] : '0'}${units[length]}`;
    }
    if (length === 6) {
      return `${numberSplitted[0]}${numberSplitted[1]}${numberSplitted[2]}${units[length]}`;
    }
    if (length === 7) {
      return `${numberSplitted[0]}.${numberSplitted[1] > 0 ? numberSplitted[1] : '0'}${units[length]}`;
    }
    if (length === 8) {
      return `${numberSplitted[0]}${numberSplitted[1]}.${numberSplitted[2] > 0 ? numberSplitted[2] : '0'}${units[length]}`;
    }
    if (length === 9) {
      return `${numberSplitted[0]}${numberSplitted[1]}${numberSplitted[2]}${units[length]}`;
    }
    if (length === 10) {
      return `${numberSplitted[0]}.${numberSplitted[1] > 0 ? numberSplitted[1] : '0'}${units[length]}`;
    }
  }
  return '';
};

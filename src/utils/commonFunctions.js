import _ from 'lodash';
import random from 'csprng';

export const checkEmpty = (data) => _.isEmpty(data)

export const equalityChecker = (data1, data2) => _.isEqual(data1, data2);

export const randomIdGenerator = () => {
  return random(160, 32);
};
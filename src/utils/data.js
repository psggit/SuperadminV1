/**
 * Convert an array into multiple array of arrays where the size of the inner Array is fixed.
 *
 * @param  {Array} array the list of elements
 * @param  {Integer} size  size of the inner Array
 * @return {Array} the array of arrays.
 */
const breakArrayIntoMultipleArray = (array, size = 1) => {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (i % size === 0) {
      newArray.push([]);
    }
    (newArray[(newArray.length - 1)]).push(array[i]);
  }
  return newArray;
};

/**
 * Returns the list of all duplicates element in decending order of its index.
 * The decending order ensure that during removal of data array indexs
 * don't mess-up.
 *
 * list of duplicates Find the duplicates in the list.
 *
 * @param  {Array} list The array of elements.
 * @param  {Function} keyFunction is a function which returns an object
 * with the key values. Example: if the object is
 * {
 *  a:1,
 *  b: {
 *   c: 2,
 *   d: { e: 1}
 *   },
 *   f: 1
 * }
 *
 * and a, b.d are the key values to identify the object are unique
 * then the output of the function for the above input should be
 * {
 *  a: 1,
 *  b: {
 *   d: { e: 1}
 *  }
 * }
 *
 * NOTE: the function must return an Object. and not primitive or string.
 * Keep track of edge case like if a inner object is undefined etc in the
 * function.
 *
 * Keep the object light. (the smaller the object better the performance.)
 *
 * @return {Array}      index of duplicates in the given array (reverse order)
 */
const findDuplicatesIndices = (list, keyFunction) => {
  const dictionarySet = {};
  let listOfIndex = [];

  for (let i = 0; i < list.length; i++) {
    const key = JSON.stringify(keyFunction(list[i]));
    if (dictionarySet[key]) {
      listOfIndex = [].concat(i).concat(listOfIndex);
    } else {
      dictionarySet[key] = true;
    }
  }
  return listOfIndex;
};

/**
 * Returns the list without the element present in the index Array.
 *
 * @param  {Array} list          The list of elements.
 * @param  {Array} listOfIndices The list of indices.
 * @return {Array}               The list without indice elements.
 */
const removeElementsFromArray = (list, listOfIndices) => {
  let newList = list;
  for (let i = 0; i < listOfIndices.length; i++) {
    newList = newList.slice(0, listOfIndices[i])
      .concat(newList.slice(listOfIndices[i] + 1));
  }
  return newList;
};

/**
 * Convert an array to a key-object-map based on the array in the arrayObj.
 * @param  {Array} arrayObj the array object
 * @param  {String} keyParam the name of the key used.
 * @return {Object}          Object based on the key.
 */
const getJSONObjFromArray = (arrayObj, keyParam) => {
  const obj = {};
  let arrObj;
  let key;
  let content;

  //  based on the component name the keys are generated.
  for (let index = 0; index < arrayObj.length; index++) {
    arrObj = arrayObj[index];
    key = arrObj[keyParam];
    content = arrObj.content;

    if ('json'.toUpperCase() === arrObj.datatype.toUpperCase()) {
      content = JSON.parse(content);
    }
    obj[key] = {...arrayObj[index],
      content
    };
  }
  return obj;
};


/**
 * * The function takes N-arguments and then check if the arguments are valid
 * by valid not empty or not null or not defined or an array with at-least one variable.
 *
 * @param  {Array} args the array of arguments
 * @return {boolean} if true then variable are valid.
 */
const checkStateValidity = (args) => {
  for (let i = 0; i < args.length; i++) {
    if (args[i] === undefined) {
      return false;
    }
    if (args[i] === null) {
      return false;
    }
    if (args[i] instanceof Array) {
      if (args[i].length === 0) {
        return false;
      }
    }
    if (args[i] instanceof Object) {
      if (Object.keys(args[i]).length === 0) {
        return false;
      }
    }
  }
  return true;
};

/**
 * The function takes dictionary, if a dictionary has a value which is not null
 * or not undefined or not false then it returned back as a list.
 *
 * @param  {Object} dictionary A boolean dictionary
 * @return {Array}            List of values in the dictionary.
 */
const convertBoolDictToList = (dictionary) => {
  return Object.keys(dictionary).reduce((prev, next) => {
    // if the previous object is not array then make an
    // array and return the key (if the value of the key is not false).
    let sum = prev instanceof Array ? prev : (() => {
      return dictionary[prev] ? [].concat(prev) : [];
    })();
    sum = dictionary[next] ? sum.concat(next) : sum;
    return sum;
  });
};

/**
 * The function return an object with a with a key and value as
 * dictionory who's value is true
 * @param  {Array} list    the list which is converted to an dictionary
 * @return {Object}        the actually dictionary
 */
const convertListToBoolDict = (list) => {
  const newList = list instanceof Array ? list : [].concat(list);
  return newList.length > 1 ? newList.reduce((prev, next) => {
    const accumulator = prev instanceof Object ? prev : {
      [prev]: true
    };
    return {...accumulator,
      ... {
        [next]: true
      }
    };
  }) : {
    [newList[0]]: true
  };
};

/**
 * Returns the month back for a given javascript dataObj.
 *
 * @param  {Object} date the javascript dataObj
 * @return {String}    the month
 */
const getMonth = (date) => {
  return date ? (['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()]) : null;
};

/**
 * The function takes N-arguments and then check if the arguments are valid
 * by valid not empty or not null or not defined or an array with at-least one variable.
 *
 * TODO: THIS NEED TO BE THOUGHT OFF.
 *
 * @param  {Array} args the array of arguments
 * @return {boolean} if true then variable are valid.
 */
const dataIntegrityValidity = (data, schema) => {
  // FIXME: This needs to be kicked.
  return checkStateValidity(data) && checkStateValidity(schema);
};

/**
 * Generate an array of with values between start & stop using step as increment.
 * @param  {Number} [start=0] If no Start value is provided then it starts-off
 * from 0..start
 * @param  {Number} stop      If stop is provied the array return [start..stop]
 * @param  {Number} [step=1]  if the step is provided then increment uses this.
 * @return {Array}           Array of elements between [start, stop]
 */
const range = (start, stop, step = 1) => {
  if (typeof stop === 'undefined') {
    return range(0, start, step);
  }

  const result = [];
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }
  return result;
};

/**
 * The function return a dictionary whose key = value(keyName) of the given
 * object in the list. and value = value(keyValue) of the given name.
 * @param  {String} keyName  the name of the key in the object list.
 * @param  {String} keyValue the value of the key in the object list.
 * @param  {List} list     the list of object where the object have the given keyName, keyValue
 * in them.
 *
 * @return {Object}          the dictionary with the key and values.
 */
const convertListToDictUsingKV = (keyName, keyValue, list) => {
  // if the list has more than one object then reduce it.
  return list.length > 1 ? list.reduce((prev, next, index) => {
    // Initial object for the list.
    if (index === 1) {
      const newObj = {};
      newObj[prev[keyName]] = prev[keyValue];
      newObj[next[keyName]] = next[keyValue];
      return newObj;
    }
    // Other objects for the list.
    prev[next[keyName]] = next[keyValue];
    return prev;
  }) : (() => {
    return list.length <= 0 ? {} : (() => {
      const newObj = {};
      newObj[list[0][keyName]] = list[0][keyValue];
      return newObj;
    })();
  })();
};

/**
 * Return a Date Object which is the ISO string format of the given string
 *
 * @param  {String} curDateStr the current dateTime in string.
 * @param  {Boolean} convertToISO if set to true then the string is first
 * stripped of time-zone & microseconds.
 *
 * @return {Date}            a Date object
 */
const convertStrToISODate = (curDateStr, convertToISO = true) => {
  return convertToISO ?
    new Date(new Date(curDateStr).toISOString().split('.')[0]) :
    new Date(curDateStr);
};

/**
 * Pad Digit will pad the given number input with the padCharacter. The max number
 * of padded character is determined by the padLegth
 * @param  {Number} number       the number which needs to padded
 * @param  {Character} padCharacter the character used for the padding.
 * @param  {Integer} padLength    the number of character in the paddedString
 * @return {String}              The digit in padded String
 */
const padDigit = (number, padCharacter, padLength) => {
  const str = '' + number;
  const pad = padCharacter.repeat(padLength);
  return pad.substr(0, pad.length - str.length) + str;
};

/**
 * Convert the string back to a postgres safe date-string.
 * @param  {String}  curDateStr          The current date in ISOString or and other Date complient string.
 * @param  {Boolean} [convertToISO=true] If the date is ISO then convert it to the correct date object.
 * @return {String}                      [description]
 */
const convertStrToPosgresDateStr = (curDateStr, convertToISO = true) => {
  const actualDate = convertToISO ?
    new Date(new Date(curDateStr).toISOString().split('.')[0]) :
    new Date(curDateStr);
  // 2016-11-29 04:19:24.000+05:30
  // 2016-09-28 00:49:21.980221+05:30
  return '' + actualDate.getFullYear() + '-' + padDigit((actualDate.getMonth() + 1), '0', 2) + '-'
    + padDigit(actualDate.getDate(), '0', 2) + 'T' + padDigit(actualDate.getHours(), '0', 2) + ':'
    + padDigit(actualDate.getMinutes(), '0', 2) + ':' + padDigit(actualDate.getSeconds(), '0', 2)
    + '.000000+05:30';
};

export {
  getJSONObjFromArray,
  convertStrToISODate,
  convertStrToPosgresDateStr,
  findDuplicatesIndices,
  removeElementsFromArray,
  convertListToDictUsingKV,
  range,
  getMonth,
  dataIntegrityValidity,
  checkStateValidity,
  convertBoolDictToList,
  convertListToBoolDict,
  breakArrayIntoMultipleArray
};

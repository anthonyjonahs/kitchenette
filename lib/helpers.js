const _ = require('lodash');

// A curried version of get to use in Array.map.
const getFrom = _.curry(_.get);

/**
 * Concatenates values into a string. Separates with a space.
 * @param {string[]} paths An list of paths to the values to be concatenated
 */

const concat = (...paths) => sourceObject => paths.map(getFrom(sourceObject)).join(' ');


/**
 * Hard-codes a value for key being created.
 * @param {*} value A value to be hardcoded as the value for the key.
 */

const hardCode = value => () => value;


/**
 * Takes the value found at the path and applies to the key in the new object.
 * @param {string} path A path to a value.
 */

const directMap = path => sourceObject => _.get(sourceObject, path);


/**
 * A wrapper that takes a function and gives it arguments that are picked from the source object.
 * @param {function} func The function that will transform the values found at the paths.
 * @param {string[]} paths The paths to the values to be provided to the function
 */

const custom = (func, ...paths) => (sourceObject) => {
  const args = paths.map(getFrom(sourceObject));
  return func(...args);
};

module.exports = {
  concat,
  hardCode,
  directMap,
  custom,
};
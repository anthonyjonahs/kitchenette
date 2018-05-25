const _ = require('lodash');

/**
 * Creates an array of [key, function] pairs. Keys are a lodash-style path.
 * @param   {object}  obj - The object we want to convert to flat array.
 * @returns {array}
 */
const toPairsDeep = (obj, pathToLeaf) => Object.entries(obj)
  .reduce((accumulator, [key, value]) => {
    const pathToValue = pathToLeaf ? `${pathToLeaf}.${key}` : key;
    
    if (_.isObjectLike(value)) {
      return [...accumulator, ...toPairsDeep(value, pathToValue)]
    };
    
    return [...accumulator, [pathToValue, value]];
  }, []);

/**
 * Concatenates values into a string. Separates with a space.
 * @param {string[]} paths An list of paths to the values to be concatenated
 */
const concat = (...paths) => sourceObject => paths.map(path => _.get(sourceObject, path)).join(' ');

/**
 * Hard-codes a value for key being created.
 * @param {*} value A value to be hardcoded as the value for the key.
 */
const hardCode = value => (sourceObject) => value;

/**
 * A wrapper that takes a function and gives it arguments that are picked from the source object.
 * @param {function} func The function that will transform the values found at the paths.
 * @param {string[]} paths The paths to the values to be provided to the function
 */
const custom = (func, ...paths) => (sourceObject) => {
  const args = paths.map(path => _.get(sourceObject, path));
  return func(...args);
}

/**
 * Takes the value found at the path and applies to the key in the new object.
 * @param {string} path A path to a value.
 */
const directMap = path => sourceObject => _.get(sourceObject, path);

const applyFunctionsToObject = (sourceObject, pathFuncPairs) => pathFuncPairs.map(([path, func]) => [path, func(sourceObject)]);

const rebuildObjectFromArrayMap = arrayMap => arrayMap.reduce((accumulator, [path, value]) => {
  return _.set(accumulator, path, value);
}, {});

/**
 * Loads the recipe into the kitchenette and returns a function that will serve as the transformer.
 * @param {object} recipe The recipe used to guide the cooking of the new object
 */
const createRecipe = (recipe) => (sourceObject) => {
  const flatRecipe = toPairsDeep(recipe);
  const flatTargetObject = applyFunctionsToObject(sourceObject, flatRecipe);
  return rebuildObjectFromArrayMap(flatTargetObject);
}

module.exports = {
  createRecipe,
  concat,
  hardCode,
  custom,
  directMap
}

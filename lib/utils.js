const _ = require('lodash');

/**
 * Creates an array of [path, function] pairs by flattening the recipe object. Paths are a lodash-style path, functions operate on
 * the values found at those paths in the source object.
 * @param   {object}  obj - The object we want to convert to flat array.
 * @returns {array[]} path/function pairs for all leaves in the tree.
 */

const createTreeMap = (obj, previousPath) => Object.entries(obj)
  .reduce((accumulator, [key, value]) => {
    const pathToValue = previousPath ? `${previousPath}.${key}` : key;
    
    if (_.isObjectLike(value)) {
      return [...accumulator, ...createTreeMap(value, pathToValue)]
    };
    
    return [...accumulator, [pathToValue, value]];
  }, []);


/**
 * Applies the function in each pathFuncPair to the sourceObject.
 * @param {object} sourceObject The object we want to transform into something tasty.
 * @param {[string, function]} pathFuncPairs The path to the value in source object, and the function that will
 * operate on that value to give a new value.
 * @returns {array[]} pathValue pairs to be reassembled into the target object.
 */

const evaluateTreeMap = (sourceObject, pathFuncPairs) => pathFuncPairs.map(([path, func]) => [path, func(sourceObject)]);



const rebuildObjectFromTreeMap = treeMap => treeMap.reduce((accumulator, [path, value]) => {
  return _.set(accumulator, path, value);
}, {});

module.exports = {
  createTreeMap,
  evaluateTreeMap,
  rebuildObjectFromTreeMap,
}
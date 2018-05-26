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



const applyFunctionsToObject = (sourceObject, pathFuncPairs) => pathFuncPairs.map(([path, func]) => [path, func(sourceObject)]);



const rebuildObjectFromArrayMap = arrayMap => arrayMap.reduce((accumulator, [path, value]) => {
  return _.set(accumulator, path, value);
}, {});

module.exports = {
  toPairsDeep,
  applyFunctionsToObject,
  rebuildObjectFromArrayMap,
}
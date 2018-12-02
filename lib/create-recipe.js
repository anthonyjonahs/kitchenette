const _ = require('lodash');
const { 
  createTreeMap,
  evaluateTreeMap,
  rebuildObjectFromTreeMap,
} = require('./utils');

/**
 * Loads the recipe into the kitchenette and returns a function that will serve as the transformer.
 * @param {object} recipe The recipe used to guide the cooking of the new object
 */
// const createRecipe = (recipe) => (sourceObject) => {
//   const flatRecipe = createTreeMap(recipe);
//   const treeMap = evaluateTreeMap(sourceObject, flatRecipe);
//   return rebuildObjectFromTreeMap(treeMap);
// }

const createRecipe = (recipe) => (sourceObject) => _.flow([
  createTreeMap,
  _.curry(evaluateTreeMap)(sourceObject),
  rebuildObjectFromTreeMap
])(recipe);

module.exports = createRecipe;
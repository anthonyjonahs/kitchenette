const { 
  toPairsDeep,
  applyFunctionsToObject,
  rebuildObjectFromArrayMap,
} = require('./utils');

/**
 * Loads the recipe into the kitchenette and returns a function that will serve as the transformer.
 * @param {object} recipe The recipe used to guide the cooking of the new object
 */
const createRecipe = (recipe) => (sourceObject) => {
  const flatRecipe = toPairsDeep(recipe);
  const flatTargetObject = applyFunctionsToObject(sourceObject, flatRecipe);
  return rebuildObjectFromArrayMap(flatTargetObject);
}

module.exports = createRecipe;
// Benchmark : https://jsben.ch/Vnal5

function checkSearchValidity(search) {
  return search.length > 3;
}

function searchByTitle(search, recipes) {
  const result = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    if (recipe.name.toLowerCase().includes(search.toLowerCase())) {
      result.push(recipe);
    }
  }
  return result;
}

function searchByIngredient(search, recipes) {
  const lowerSearch = search.toLowerCase();
  const result = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j];
      if (ingredient.ingredient.toLowerCase().includes(lowerSearch)) {
        result.push(recipe);
        break;
      }
    }
  }
  return result;
}

function searchByDescription(search, recipes) {
  const result = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    if (recipe.description.toLowerCase().includes(search.toLowerCase())) {
      result.push(recipe);
    }
  }
  return result;
}

function aggregateSearchResults(resultsArray) {
  const aggregatedResult = [];
  for (let i = 0; i < resultsArray.length; i++) {
    const result = resultsArray[i];
    for (let j = 0; j < result.length; j++) {
      const recipe = result[j];
      let found = false;
      for (let k = 0; k < aggregatedResult.length; k++) {
        if (aggregatedResult[k] === recipe) {
          found = true;
          break;
        }
      }
      if (!found) {
        aggregatedResult.push(recipe);
      }
    }
  }
  return aggregatedResult;
}

if (typeof module === 'object') {
  module.exports = {
    checkSearchValidity,
    searchByTitle,
    searchByIngredient,
    searchByDescription,
    aggregateSearchResults
  };
}



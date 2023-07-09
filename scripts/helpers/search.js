function checkSearchValidity(search) {
  return search.length > 3;
}

function searchByTitle(search, recipes) {
  let result = [];
  let i = 0;
  while (i < recipes.length) {
    let recipe = recipes[i];
    if (recipe.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
      result.push(recipe);
    }
    i++;
  }
  return result;
}

function searchByIngredient(search, recipes) {
  let lowerSearch = search.toLowerCase();
  let result = [];
  let i = 0;
  while (i < recipes.length) {
    let recipe = recipes[i];
    let j = 0;
    while (j < recipe.ingredients.length) {
      let ingredient = recipe.ingredients[j];
      if (ingredient.ingredient.toLowerCase().indexOf(lowerSearch) !== -1) {
        result.push(recipe);
        break;
      }
      j++;
    }
    i++;
  }
  return result;
}

function searchByDescription(search, recipes) {
  let result = [];
  let i = 0;
  while (i < recipes.length) {
    let recipe = recipes[i];
    if (recipe.description.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
      result.push(recipe);
    }
    i++;
  }
  return result;
}

function aggregateSearchResults(resultsArray) {
  let aggregatedResult = [];
  let i = 0;
  while (i < resultsArray.length) {
    let result = resultsArray[i];
    let j = 0;
    while (j < result.length) {
      let recipe = result[j];
      let found = false;
      let k = 0;
      while (k < aggregatedResult.length) {
        if (aggregatedResult[k] === recipe) {
          found = true;
          break;
        }
        k++;
      }
      if (!found) {
        aggregatedResult.push(recipe);
      }
      j++;
    }
    i++;
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

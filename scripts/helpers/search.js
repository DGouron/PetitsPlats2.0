const checkSearchValidity = (search) => {
  return search.length >= 3;
};

const searchByTitle = (search, recipes) => {
  const result = [];
  recipes.forEach((recipe) => {
    if (recipe.name.toLowerCase().includes(search.toLowerCase())) {
      result.push(recipe);
    }
  });
  return result;
};

const searchByIngredient = (search, recipes) => {
  const lowerSearch = search.toLowerCase();
  const result = [];
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      if (ingredient.ingredient.toLowerCase().includes(lowerSearch)) {
        result.push(recipe);
      }
    });
  });
  return result;
};

const searchByDescription = (search, recipes) => {
  const result = [];
  recipes.forEach((recipe) => {
    if (recipe.description.toLowerCase().includes(search.toLowerCase())) {
      result.push(recipe);
    }
  });
  return result;
};

const agregateSearchResults = (resultsArray) => {
  const agregatedResult = [];
  resultsArray.forEach((result) => {
    result.forEach((recipe) => {
      if (!agregatedResult.includes(recipe)) {
        agregatedResult.push(recipe);
      }
    });
  });
  return agregatedResult;
};

if (typeof module === 'object') {
  module.exports = {
    checkSearchValidity,
    searchByTitle,
    searchByIngredient,
    searchByDescription,
    agregateSearchResults
  };
}
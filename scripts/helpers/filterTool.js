const pushFilter = (filter, filterArray) => {
  switch (filter.type) {
    case 'ingredients':
      filterArray.ingredients.push(filter.name);
      removeDuplicates(filters.ingredients);
      break;
    case 'appliances':
      filterArray.appliances.push(filter.name);
      removeDuplicates(filters.appliances);
      break;
    case 'ustensils':
      filterArray.ustensils.push(filter.name);
      removeDuplicates(filters.ustensils);
      break;
    default:
      break;
  }
};

const removeFilter = (filter, filterArray) => {
  let arrayCopy = {
    ingredients: [...filterArray.ingredients],
    appliances: [...filterArray.appliances],
    ustensils: [...filterArray.ustensils]
  };
  let index = -1;
  switch (filter.type) {
    case 'ingredients':
      index = arrayCopy.ingredients.indexOf(filter.name);
      arrayCopy.ingredients.splice(index, 1);
      break;
    case 'appliances':
      index = arrayCopy.appliances.indexOf(filter.name);
      arrayCopy.appliances.splice(index, 1);
      break;
    case 'ustensils':
      index = arrayCopy.ustensils.indexOf(filter.name);
      arrayCopy.ustensils.splice(index, 1);
      break;
    default:
      break;
  }
  filterArray = arrayCopy;
  return filterArray;
};

const translateType = (typeToTranslate) => {
  switch (typeToTranslate) {
    case 'ingredients':
      return 'Ingrédients';
    case 'appliances':
      return 'Appareil';
    case 'ustensils':
      return 'Ustensiles';
    case 'test':
      return 'Test';
    default:
      return 'Non défini';
  }
};

const getFilterOptions = (recipes, type) => {
  switch (type) {
    case 'ingredients':
      return recipes.reduce((acc, recipe) => {
        recipe.ingredients.forEach(ingredient => {
          if (!acc.includes(ingredient.ingredient)) {
            acc.push(ingredient.ingredient);
          }
        });
        return acc;
      }
      , []);
    case 'appliances':
      return recipes.reduce((acc, recipe) => {
        if (!acc.includes(recipe.appliance)) {
          acc.push(recipe.appliance);
        }
        return acc;
      }
      , []);
    case 'ustensils':
      return recipes.reduce((acc, recipe) => {
        recipe.ustensils.forEach(ustensil => {
          if (!acc.includes(ustensil)) {
            acc.push(ustensil);
          }
        });
        return acc;
      }
      , []);
    default:
      return [];
  }
};

const applyFilters = (recipes, filters) => {
  const filteredRecipes = [...recipes];
  const { ingredients, appliances, ustensils } = filters;

  const shouldFilterIngredients = ingredients.length > 0;
  const shouldFilterAppliances = appliances.length > 0;
  const shouldFilterUstensils = ustensils.length > 0;

  // If shouldFilterIngredients, filter it and modify the array

  if (shouldFilterIngredients){
    ingredients.forEach(ingredient => {
      filteredRecipes.forEach(recipe => {
        const ingredientNames = recipe.ingredients.map(ingredient => ingredient.ingredient);
        if (!ingredientNames.includes(ingredient)) {
          const index = filteredRecipes.indexOf(recipe);
          filteredRecipes.splice(index, 1);
        }
      });
    });
  }

  // If shouldFilterAppliances, filter it and modify the array
  if (shouldFilterAppliances){
    appliances.forEach(appliance => {
      filteredRecipes.forEach(recipe => {
        if (recipe.appliance !== appliance) {
          const index = filteredRecipes.indexOf(recipe);
          filteredRecipes.splice(index, 1);
        }
      });
    });
  }
  // If shouldFilterUstensils, filter it and modify the array
  if (shouldFilterUstensils){
    ustensils.forEach(ustensil => {
      filteredRecipes.forEach(recipe => {
        const ustensilNames = recipe.ustensils;
        if (!ustensilNames.includes(ustensil)) {
          const index = filteredRecipes.indexOf(recipe);
          filteredRecipes.splice(index, 1);
        }
      });
    });
  }

  return filteredRecipes; 
};

const updateNumberOfRecipes = (recipes) => {
  const recipeCounter = document.querySelector('.recipe__counter');
  recipeCounter.textContent = `${recipes.length} recette(s)`;
};

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const removeDuplicates = (array) => {
  const capitalizeArray = array.map(item => capitalize(item));
  const uniqueArray = capitalizeArray.filter((item, index) => {
    return capitalizeArray.indexOf(item) === index;
  }
  );
  return uniqueArray;
};

const sortByAlphabeticalOrder = (array) => {
  const sortedArray = array.sort((a, b) => {
    return a.localeCompare(b);
  });
  return sortedArray;
};

const getFiltersUsingSearchBar = (filtersOptions, searchBarValue) => {
  const filteredFilters = filtersOptions.filter(filter => {
    return filter.toLowerCase().includes(searchBarValue.toLowerCase());
  });
  return filteredFilters;
};

if (typeof module === 'object') {
  module.exports = {
    getFilterOptions,
    translateType,
    removeDuplicates,
    sortByAlphabeticalOrder
  };
}
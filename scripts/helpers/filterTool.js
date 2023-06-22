const translateType = (typeToTranslate) => {
  switch (typeToTranslate) {
    case 'ingredients':
      return 'Ingrédients';
    case 'appliance':
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
    case 'appliance':
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

if (typeof module === 'object') {
  module.exports = {
    getFilterOptions,
    translateType
  };
}
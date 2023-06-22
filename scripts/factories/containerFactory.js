const constructHeader = (itemsToDisplay) => {
  const headerComponent = document.createElement('header');
  return headerComponent;
};

const constructVerticalContainer = (itemsToDisplay) => {
  const verticalContainer = document.createElement('article');
  verticalContainer.classList.add('vertical__container');
  itemsToDisplay.forEach(item => verticalContainer.appendChild(item));
  return verticalContainer;
};

const constructHorizontalContainer = (itemsToDisplay) => {
  const horizontalContainer = document.createElement('article');
  horizontalContainer.classList.add('horizontal__container');
  itemsToDisplay.forEach(item => horizontalContainer.appendChild(item));
  return horizontalContainer;
};

const constructRecipeWrapper = () => {
  const recipeContainer = document.createElement('section');
  recipeContainer.classList.add('recipe__wrapper');
  return recipeContainer;
};

const containerFactory = () => {
   return {
    constructHeader,
    constructVerticalContainer,
    constructHorizontalContainer,
    constructRecipeWrapper
  };
};
async function displayHeader(rootAnchor) {
  const component = componentFactory();
  const container = containerFactory();
  const brandComponent = component.constructBrand();
  const searchbarComponent = component.constructSearchbar();
  const titleComponent = component.constructTitle();
  const verticalContainer = container.constructVerticalContainer([titleComponent, searchbarComponent]);
  const header = container.constructHeader(recipes);
    header.appendChild(brandComponent);
    header.appendChild(verticalContainer);


  rootAnchor.appendChild(header);
};


async function displayFilters(rootAnchor) {
  const component = componentFactory();
  const container = containerFactory();
  const filterSection = document.createElement('section');
    filterSection.classList.add('filter__section');

  const advancedFiltersCategories = ['ingredients', 'appliance', 'ustensils'];
  const advancedFilters = document.createElement('div');
    advancedFilters.classList.add('filter__row');
    advancedFiltersCategories.forEach(advancedFilterCategory => {
      const advancedFiltersComponent = component.constructAdvancedFilterBlock(recipes, advancedFilterCategory);
      advancedFilters.appendChild(advancedFiltersComponent);
    });
  const recipeCounterComponent = component.constructRecipeCounter(recipes.length);
  const filterContainer = constructHorizontalContainer([advancedFilters, recipeCounterComponent]);
    filterSection.appendChild(filterContainer);
  rootAnchor.appendChild(filterSection);
};

async function displayRecipes(rootAnchor) {
  const component = componentFactory();
  const container = containerFactory();
  const recipeWrapper = container.constructRecipeWrapper();
  recipes.forEach(recipe => {
    const recipeComponent = component.constructRecipeCard(recipe);
    recipeWrapper.appendChild(recipeComponent);
  });
  rootAnchor.appendChild(recipeWrapper);
};

async function bindAdvancedFilterEvents() {
  const advancedFilters = document.querySelectorAll('.filters__advanced--container');
  advancedFilters.forEach(advancedFilter => {
    advancedFilter.addEventListener('click', (event) => {
      const target = event.target;
      if(target.classList.contains('filters__advanced--option')) return
      if(target.classList.contains('filters__advanced--searchbar')) return
      const advancedFilterList = advancedFilter.querySelector('.filters__advanced--list');
      const advancedFilterSearchbar = advancedFilter.querySelector('.filters__advanced--searchbar');
      advancedFilterList.classList.toggle('filters__advanced--list--active');
      const arrow = advancedFilter.querySelector('.filters__advanced--arrow');
      arrow.classList.toggle('filters__advanced--arrow--active');
      advancedFilterSearchbar.classList.toggle('filters__advanced--searchbar--active');
    });
  });
};
      

async function init() {
  const root = document.getElementById('root');
  await displayHeader(root);
  const main = document.createElement('main');
    root.appendChild(main);
  await displayFilters(main);
  await displayRecipes(main);
  await bindAdvancedFilterEvents();
};

document.addEventListener('DOMContentLoaded', init);

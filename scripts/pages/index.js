let mainFilter = "all";
let recipesWithMainFilter = [];
let filters = {
  ingredients: [],
  appliances: [],
  ustensils: []
};

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

  const advancedFiltersCategories = ['ingredients', 'appliances', 'ustensils'];
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

async function displayTagContainer(rootAnchor) {
  const component = componentFactory();
  const tagContainer = component.constructTagsContainer();
  rootAnchor.appendChild(tagContainer);
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



function bindAdvancedFilterEvents() {
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
      bindAdvancedFilterSearchbarEvents(advancedFilterSearchbar);
    });
  });
};

function bindAdvancedFilterOptionsEvents() {
  const advancedFilterOptions = document.querySelectorAll('.filters__advanced--option');
  advancedFilterOptions.forEach(advancedFilterOption => {
    advancedFilterOption.addEventListener('click', (event) => {
      const target = event.target;
      const advancedFilter = target.closest('.filters__advanced--container');
      const isSelected = target.dataset.selected;
      const filter = {type: advancedFilter.dataset.filtertype, name: target.dataset.filtername};

      let filtersBeforeRefresh = [];
      if(isSelected === 'true'){
        filtersBeforeRefresh = removeFilter(filter, filters);
        filters = filtersBeforeRefresh;
        console.log(filtersBeforeRefresh);
      } else {
        filtersBeforeRefresh = pushFilter(filter, filters);
      }

      const recipesFound = applyFilters(recipesWithMainFilter.length !== 0 ? recipesWithMainFilter : recipes, filters);
      refreshRecipesView(recipesFound);
      target.setAttribute('data-selected', isSelected === 'true' ? 'false' : 'true');
      target.classList.toggle('filters__advanced--option-selected');
      refreshTagsView(filters);
      bindCloseTagEvents();
    });
  });
};

const refreshTagsView = (filters) => {
  const component = componentFactory();
  const tagContainer = document.querySelector('.tags__container');
  while (tagContainer.firstChild) {
    tagContainer.removeChild(tagContainer.firstChild);
  }
  const tags = component.constructTags(filters, tagContainer);
  bindCloseTagEvents();
};

function refreshRecipesView(recipes) {
  if(recipes) {
    const component = componentFactory();
    const recipeWrapper = document.querySelector('.recipe__wrapper');

    while (recipeWrapper.firstChild) {
      recipeWrapper.removeChild(recipeWrapper.firstChild);
    }

    recipes.forEach(recipe => {
      const recipeComponent = component.constructRecipeCard(recipe);
      recipeWrapper.appendChild(recipeComponent);
    });

    updateNumberOfRecipes(recipes);
  }
};

function bindSearchbarEvents() {
  const searchbar = document.querySelector('.searchbar__input');
  searchbar.addEventListener('input', (event) => {
    const target = event.target;
    const search = target.value;

    if(checkSearchValidity(search)) {
      mainFilter = search;
      const searchByTitleResult = searchByTitle(mainFilter, recipes);
      const searchByIngredientResult = searchByIngredient(mainFilter, recipes);
      const searchByDescriptionResult = searchByDescription(mainFilter, recipes);
      let recipesFound = aggregateSearchResults([searchByTitleResult, searchByIngredientResult, searchByDescriptionResult]);
      recipesWithMainFilter = recipesFound ? recipesFound : [];
      recipesFound = applyFilters(recipesWithMainFilter, filters);

      refreshRecipesView(recipesFound);
      return;
    }
    refreshRecipesView(recipes);
  });
};

const bindCloseTagEvents = () => {
  const closeTags = document.querySelectorAll('.tag__close-icon');
  closeTags.forEach(closeTag => {
    closeTag.removeEventListener('click', (event) => {});
  });
  closeTags.forEach(closeTag => {
    closeTag.addEventListener('click', (event) => {
      const target = event.target;
      const tag = target.closest('.tag');
      const filter = {type: tag.dataset.filtertype, name: tag.dataset.filtername};

      // Remove filter of the container and refresh view
      const filterArrayModified = removeFilter(filter, filters);
      const recipesFound = applyFilters(recipesWithMainFilter.length !== 0 ? recipesWithMainFilter : recipes, filterArrayModified);
      refreshRecipesView(recipesFound);
      filters = filterArrayModified;
      refreshTagsView(filterArrayModified);

      // Reset filter item in the list
      const advancedFilterOptions = document.querySelectorAll('.filters__advanced--option');
      advancedFilterOptions.forEach(advancedFilterOption => {
        if(advancedFilterOption.dataset.filtername === filter.name) {
          advancedFilterOption.setAttribute('data-selected', 'false');
          advancedFilterOption.classList.remove('filters__advanced--option-selected');
        }
      });
    });
  });
};

const bindAdvancedFilterSearchbarEvents = (searchBarToBind) => {
  searchBarToBind.removeEventListener('input', (event) => {});

  searchBarToBind.addEventListener('input', (event) => {
    const target = event.target;
    const search = target.value;
    const filtersContainer = target.closest('.filters__advanced--container');
    const advancedFilterOptions = filtersContainer.querySelectorAll('.filters__advanced--option');

    advancedFilterOptions.forEach(advancedFilterOption => {
      const filterName = advancedFilterOption.dataset.filtername;
      if(filterName.toLowerCase().includes(search.toLowerCase())) {
        advancedFilterOption.classList.remove('filters__advanced--option-hidden');
      } else {
        advancedFilterOption.classList.add('filters__advanced--option-hidden');
      }
    });
  });
};

async function init() {
  const root = document.getElementById('root');
  await displayHeader(root);
  const main = document.createElement('main');
    root.appendChild(main);
  await displayFilters(main);
  await displayTagContainer(main);
  await displayRecipes(main);
  bindAdvancedFilterEvents();
  bindAdvancedFilterOptionsEvents();
  bindSearchbarEvents();
};

document.addEventListener('DOMContentLoaded', init);

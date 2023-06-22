  const constructBrand = () => {
    const brand = document.createElement('div');
    brand.classList.add('brand');
  
    return brand;
  };
  
  const constructSearchbar = () => {
    const searchBar = document.createElement('div');
      searchBar.classList.add('searchbar');
    const searchIcon = document.createElement('img');
      searchIcon.setAttribute('src', 'assets/icons/search.svg');
      searchIcon.setAttribute('alt', 'search icon');
      searchIcon.classList.add('searchbar__icon');
    searchBar.appendChild(searchIcon);
    const searchInput = document.createElement('input');
      searchInput.classList.add('searchbar__input');
      searchInput.setAttribute('type', 'search');
      searchInput.setAttribute('placeholder', 'Rechercher une recette, un ingrédient,...');
      searchInput.setAttribute('aria-label', 'Rechercher une recette, un ingrédient,...');
      searchInput.setAttribute('autocorrect', 'on');
      searchInput.setAttribute('minlength', '3');
    searchBar.appendChild(searchInput);
    return searchBar;
  };
  
  const constructTitle = () => {
    const title = document.createElement('h1');
    title.innerText = 'CHERCHEZ PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN,SIMPLES ET DÉLICIEUSES'
    return title;
  };

  const constructRecipeCounter = (numberOfRecipes) => {
    const recipeCounter = document.createElement('aside');
    recipeCounter.classList.add('recipe__counter');
    recipeCounter.innerText = `${numberOfRecipes} recettes`;
    return recipeCounter;
  };

  const constructAvancedFilterSearchbar = () => {
    const filterSearchbar = document.createElement('input');
    filterSearchbar.setAttribute('type', 'search');
    filterSearchbar.classList.add('filters__advanced--searchbar');
    filterSearchbar.setAttribute('placeholder', 'Rechercher un filtre');
    return filterSearchbar;
  };

  const constructAdvancedFilterList = (filters) => {
    const filtersList = document.createElement('ul');
    filtersList.classList.add('filters__advanced--list');
    filters.forEach(filter => {
      const filterItem = document.createElement('li');
      filterItem.classList.add('filters__advanced--option');
      filterItem.innerText = filter;
      filtersList.appendChild(filterItem);
    });
    return filtersList;
  };

  const constructAdvancedFilterHeader = (type) => {
    const advancedFilterHeader = document.createElement('div');
      advancedFilterHeader.classList.add('filters__advanced--header');
    const advancedFilterTitle = document.createElement('h2');
      advancedFilterTitle.classList.add('filters__advanced--title');
    const title = translateType(type);
      advancedFilterTitle.innerText = title;
      advancedFilterHeader.appendChild(advancedFilterTitle);
    const dropdownArrow = document.createElement('img');
      dropdownArrow.setAttribute('src', '/assets/icons/arrow.svg');
      dropdownArrow.setAttribute('alt', 'arrow icon');
      dropdownArrow.classList.add('filters__advanced--arrow');
    advancedFilterHeader.appendChild(dropdownArrow);
    return advancedFilterHeader;
  };

  const constructAdvancedFilterBlock = (arrayToPickOptions, category) => {
    const  advancedFilters = document.createElement('section');
      advancedFilters.classList.add('filters__advanced--container');
    if(category !== undefined && category !== null) {
      const advancedFiltersHeader = constructAdvancedFilterHeader(category);
      advancedFilters.appendChild(advancedFiltersHeader);
    }
    const advancedFiltersSearchbar = constructAvancedFilterSearchbar();
      advancedFilters.appendChild(advancedFiltersSearchbar);
    const filtersToShow = getFilterOptions(arrayToPickOptions, category);
    const advancedFiltersList = constructAdvancedFilterList(filtersToShow);
      advancedFilters.appendChild(advancedFiltersList);
    return advancedFilters;
  };

  const constructSearchIcon = () => {
    const searchIcon = document.createElement('img');
      searchIcon.setAttribute('src', 'assets/icons/search.svg');
      searchIcon.setAttribute('alt', 'search icon');
      searchIcon.classList.add('icon__search');
    return searchIcon;
  };

  const constructRecipeCard = (recipe) => {
    const recipeCard = document.createElement('article');
      recipeCard.classList.add('recipe__card--container');
      recipeCard.innerText = recipe.name;
    return recipeCard;
  };

const componentFactory = () => {  
  return {
    constructBrand,
    constructSearchbar,
    constructTitle,
    constructRecipeCounter,
    constructAvancedFilterSearchbar,
    constructAdvancedFilterBlock,
    constructAdvancedFilterList,
    constructAdvancedFilterHeader,
    constructSearchIcon,
    constructRecipeCard
  };
};

if (typeof module === 'object') {
  module.exports = {
    componentFactory
  };
}
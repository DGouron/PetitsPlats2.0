  const BASE_THUMBNAIL_URL = 'assets/recipesThumb/';

  const constructBrand = () => {
    const brand = document.createElement('div');
    brand.classList.add('brand');
  
    return brand;
  };
  
  const constructSearchbar = () => {
    const searchBar = document.createElement('div');
      searchBar.classList.add('searchbar');
      searchBar.setAttribute('role', 'search');
      searchBar.setAttribute('aria-label', 'Rechercher une recette, un ingrédient,...');
      searchBar.setAttribute('aria-controls', 'recipes');
      searchBar.setAttribute('aria-autocomplete', 'list');
      searchBar.setAttribute('data-minlength', '3');
      searchBar.setAttribute('data-searchValue', '');
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
    let filtersToShow = [...filters];
    filtersToShow = removeDuplicates(filtersToShow);
    filtersToShow = sortByAlphabeticalOrder(filtersToShow);

    filtersToShow.forEach(filter => {
      const filterItem = document.createElement('li');
      filterItem.classList.add('filters__advanced--option');
      filterItem.innerText = filter;
      filterItem.setAttribute('data-filtername', filter);
      filterItem.setAttribute('data-selected', 'false');
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
      advancedFilters.setAttribute('data-filtertype', category);
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
    
    const recipeCardThumbnail = constructRecipeCardThumbnail(recipe);
      recipeCard.appendChild(recipeCardThumbnail);
    
    const recipeCardTime = constructRecipeCardTime(recipe);
      recipeCard.appendChild(recipeCardTime);

    const recipeCardTitle = constructRecipeCardTitle(recipe);
      recipeCard.appendChild(recipeCardTitle);
    
    const recipeCardContentWrapper = document.createElement('div');
      recipeCardContentWrapper.classList.add('recipe__card--content-wrapper');
    
    
    const recipeCardContent = constructRecipeCardContent(recipe);
    const recipeCardContentSubtitle = document.createElement('h4');
      recipeCardContentSubtitle.classList.add('recipe__card--subtitle');
      recipeCardContentSubtitle.innerText = 'RECETTE';
      recipeCardContentWrapper.appendChild(recipeCardContentSubtitle);
      recipeCardContentWrapper.appendChild(recipeCardContent);
      recipeCard.appendChild(recipeCardContentWrapper);    
    const recipeCardIngredientsWrapper = document.createElement('div');
    recipeCardIngredientsWrapper.classList.add('recipe__card--ingredients-wrapper');
  
    const ingredients = recipe.ingredients;
    const recipeCardIngretientsSubtitle = document.createElement('h4');
      recipeCardIngretientsSubtitle.classList.add('recipe__card--subtitle');
      recipeCardIngretientsSubtitle.innerText = 'INGRÉDIENTS';
    const recipeCardIngredients = document.createElement('div');
      recipeCardIngredients.classList.add('recipe__card--ingredients');
    ingredients.forEach(ingredient => {
      const recipeCardIngredient = constructRecipeCardIngredient(ingredient);
      recipeCardIngredients.appendChild(recipeCardIngredient);
    });
      recipeCardIngredientsWrapper.appendChild(recipeCardIngretientsSubtitle);
      recipeCardIngredientsWrapper.appendChild(recipeCardIngredients);
      recipeCard.appendChild(recipeCardIngredientsWrapper);
    
     return recipeCard;
  };

  const constructRecipeCardThumbnail = (recipe) => {
    const recipeCardThumbnail = document.createElement('img');
      recipeCardThumbnail.setAttribute('src', `${BASE_THUMBNAIL_URL}${recipe.image}`);
      recipeCardThumbnail.setAttribute('alt', `Recette ${recipe.name}`);
      recipeCardThumbnail.classList.add('recipe__card--thumbnail');
    return recipeCardThumbnail;
  };

  const constructRecipeCardTitle = (recipe) => {
    const recipeCardTitle = document.createElement('h3');
      recipeCardTitle.classList.add('recipe__card--title');
      recipeCardTitle.innerText = recipe.name;
    return recipeCardTitle;
  };

  const constructRecipeCardContent = (recipe) => {
    const recipeCardContent = document.createElement('div');
      recipeCardContent.classList.add('recipe__card--content');
      recipeCardContent.innerText = recipe.description;
    return recipeCardContent;
  };

  const constructRecipeCardTime = (recipe) => {
    const recipeCardTime = document.createElement('aside');
      recipeCardTime.classList.add('recipe__card--time');
    const recipeCardTimeIcon = document.createElement('img');
      recipeCardTimeIcon.setAttribute('src', 'assets/icons/time.svg');
      recipeCardTimeIcon.setAttribute('alt', 'Durée de la recette');
      recipeCardTimeIcon.classList.add('recipe__card--time-icon');
      recipeCardTime.appendChild(recipeCardTimeIcon);
    const recipeCardTimeText = document.createElement('p');
      recipeCardTimeText.classList.add('recipe__card--time-text');
      recipeCardTimeText.innerText = `${recipe.time} min`;
      recipeCardTime.appendChild(recipeCardTimeText);
    return recipeCardTime;
  };

  const constructRecipeCardIngredient = (ingredientData) => {
    const recipeCardIngredient = document.createElement('div');
      recipeCardIngredient.classList.add('recipe__card--ingredient');
    const recipeCardIngredientTitle = document.createElement('h4');
      recipeCardIngredientTitle.classList.add('recipe__card--ingredient-title');
      recipeCardIngredientTitle.innerText = ingredientData.ingredient;
      recipeCardIngredient.appendChild(recipeCardIngredientTitle);
;
    const recipeCardIngredientQuantity = document.createElement('p');
      recipeCardIngredientQuantity.classList.add('recipe__card--ingredient-quantity');
      recipeCardIngredientQuantity.innerText = 
      ingredientData.quantity === undefined ? '-' :
      ingredientData.quantity + (ingredientData.unit ? ingredientData.unit : '');
      recipeCardIngredient.appendChild(recipeCardIngredientQuantity); 

    return recipeCardIngredient;
  };

  const constructTagsContainer = (tags) => {
    const tagContainer = document.createElement('div');
    tagContainer.classList.add('tags__container');
      return tagContainer;
  };

  const constructTags = (tags, container) => {
    tags.ingredients.forEach(ingredient => {
      const tag = constructTag(ingredient, 'ingredients');
      container.appendChild(tag);
    });
    tags.appliances.forEach(appliance => {
      const tag = constructTag(appliance, 'appliances');
      container.appendChild(tag);
    });
    tags.ustensils.forEach(ustensil => {
      const tag = constructTag(ustensil, 'ustensils');
      container.appendChild(tag);
    });
  };   

  const constructTag = (tagName, type) => {
    const tag = document.createElement('span');
    tag.classList.add('tag');
    tag.innerText = tagName;
    tag.setAttribute('data-filtertype', type);
    tag.setAttribute('data-filtername', tagName);
    const closeIcon = document.createElement('img');
    closeIcon.setAttribute('src', 'assets/icons/cross.svg');
    closeIcon.setAttribute('alt', 'Supprimer le filtre');
    closeIcon.classList.add('tag__close-icon');
    tag.appendChild(closeIcon);
    return tag;
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
    constructRecipeCard,
    constructRecipeCardThumbnail,
    constructRecipeCardTitle,
    constructRecipeCardContent,
    constructRecipeCardTime,
    constructRecipeCardIngredient,
    constructTagsContainer,
    constructTags,
    constructTag
  };
};

if (typeof module === 'object') {
  module.exports = {
    componentFactory
  };
}
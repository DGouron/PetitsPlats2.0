const { describe, test } = require("node:test");
const { componentFactory } = require("../scripts/factories/componentFactory");

const BASE_THUMBNAIL_URL = 'assets/recipesThumb/';

const EXEMPLE_RECIPES = [
  {
      "id": 1,
      "image": "Recette01.jpg",
      "name" : "Limonade de Coco",
      "servings" : 1,
      "ingredients": [           
          {
              "ingredient" : "Sucre",
              "quantity" : 30,
              "unit" : "grammes"
          },
          {
              "ingredient": "Glaçons"
          }
      ],
      "time": 10,
      "description": "Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée",
      "appliance": "Blender",
      "ustensils": ["cuillère à Soupe", "verres", "presse citron" ]
  },
  {
      "id": 2,
      "image": "Recette02.jpg",
      "name" : "Poisson Cru à la tahitienne",
      "servings": 2,
      "ingredients": [
          {
              "ingredient" : "Tomate",
              "quantity" : 2
          },
          {
              "ingredient" : "Carotte",
              "quantity" : 1
          },
      ],
      "time": 60,
      "description": "Découper le thon en dés, mettre dans un plat et recouvrir de jus de citron vert (mieux vaut prendre un plat large et peu profond). Laisser reposer au réfrigérateur au moins 2 heures. (Si possible faites-le le soir pour le lendemain. Après avoir laissé mariner le poisson, coupez le concombre en fines rondelles sans la peau et les tomates en prenant soin de retirer les pépins. Rayer la carotte. Ajouter les légumes au poissons avec le citron cette fois ci dans un Saladier. Ajouter le lait de coco. Pour ajouter un peu plus de saveur vous pouvez ajouter 1 à 2 cuillères à soupe de Crème de coco",
      "appliance": "Saladier",
      "ustensils": ["presse citron"]
  }
];

const factory = componentFactory();

describe('Generic components', () => {

  it('should construct a brand component', () => {
    const brand = factory.constructBrand();
      expect(brand.tagName).toBe('DIV');
      expect(brand.classList.contains('brand')).toBe(true);
  });

  it('should construct a searchbar component', () => {
    const searchBar = factory.constructSearchbar();
      expect(searchBar.tagName).toBe('DIV');
      expect(searchBar.classList.contains('searchbar')).toBe(true);

    const searchIcon = searchBar.querySelector('.searchbar__icon');
      expect(searchIcon).toBeTruthy();
      expect(searchIcon.tagName).toBe('IMG');
      expect(searchIcon.getAttribute('src')).toBe('assets/icons/search.svg');
      expect(searchIcon.getAttribute('alt')).toBe('search icon');
      expect(searchIcon.classList.contains('searchbar__icon')).toBe(true);

    const searchInput = searchBar.querySelector('.searchbar__input');
      expect(searchInput).toBeTruthy();
      expect(searchInput.tagName).toBe('INPUT');
      expect(searchInput.getAttribute('type')).toBe('search');
      expect(searchInput.getAttribute('placeholder')).toBe('Rechercher une recette, un ingrédient,...');
      expect(searchInput.getAttribute('aria-label')).toBe('Rechercher une recette, un ingrédient,...');
      expect(searchInput.getAttribute('autocorrect')).toBe('on');
      expect(searchInput.getAttribute('minlength')).toBe('3');
  });

  it('should construct a title component', () => {
    const title = factory.constructTitle();
      expect(title.tagName).toBe('H1');
      expect(title.innerText).toBe('CHERCHEZ PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN,SIMPLES ET DÉLICIEUSES');
  });
});

describe('Advanced filters components', () => {

  it('should construct an advanced filter list component', () => {
    const filterList = factory.constructAdvancedFilterList(['test1', 'test2']);
      expect(filterList.tagName).toBe('UL');
      expect(filterList.classList.contains('filters__advanced--list')).toBe(true);
    const filterListItems = filterList.querySelectorAll('.filters__advanced--option');
      expect(filterListItems.length).toBe(2);
      expect(filterListItems[0].tagName).toBe('LI');
      expect(filterListItems[0].innerText).toBe('test1');
      expect(filterListItems[1].innerText).toBe('test2');
  });
  
  it('should construct a filter searchbar component', () => {
    const filterSearchbar = factory.constructAvancedFilterSearchbar();
      expect(filterSearchbar.tagName).toBe('INPUT');
      expect(filterSearchbar.classList.contains('filters__advanced--searchbar')).toBe(true);
  });

  it('should construct an advanced filter header component', () => {
    const filterHeader = factory.constructAdvancedFilterHeader('test');
      expect(filterHeader).toBeTruthy();
      expect(filterHeader.tagName).toBe('DIV');
      expect(filterHeader.classList.contains('filters__advanced--header')).toBe(true);
    const filterHeaderTitle = filterHeader.querySelector('.filters__advanced--title');
      expect(filterHeaderTitle).toBeTruthy();
      expect(filterHeaderTitle.tagName).toBe('H2');
      expect(filterHeaderTitle.innerText).toBe('Test');
    const filterHeaderIcon = filterHeader.querySelector('.filters__advanced--icon');
      expect(filterHeaderIcon).toBeTruthy();
      expect(filterHeaderIcon.tagName).toBe('IMG');
  });
});

describe('Recipe components', () => {

  it('should construct a recipe counter component', () => {
    const recipeCounter = factory.constructRecipeCounter(1500);
      expect(recipeCounter.tagName).toBe('ASIDE');
      expect(recipeCounter.classList.contains('recipe__counter')).toBe(true);
      expect(recipeCounter.innerText).toBe('1500 recettes');
  });

  it('should construct a recipe card component', () => {
    const recipeCard = factory.constructRecipeCard(EXEMPLE_RECIPES[0]);
      expect(recipeCard.tagName).toBe('ARTICLE');
      expect(recipeCard.classList.contains('recipe__card--container')).toBe(true);
    const recipeCardThumbnail = recipeCard.querySelector('.recipe__card--thumbnail');
      expect(recipeCardThumbnail).toBeTruthy();
    const recipeCardTitle = recipeCard.querySelector('.recipe__card--title');  
      expect(recipeCardTitle).toBeTruthy();
    const recipeCardDetails = recipeCard.querySelector('.recipe__card--details');
      expect(recipeCardDetails).toBeTruthy();
    const recipeCardDetailsTime = recipeCardDetails.querySelector('.recipe__card--time');
      expect(recipeCardDetailsTime).toBeTruthy();
  });

  it('should construct a recipe card thumbnail component', () => {
    const recipeCardThumbnail = factory.constructRecipeCardThumbnail(EXEMPLE_RECIPES[0]);
      expect(recipeCardThumbnail.tagName).toBe('IMG');
      expect(recipeCardThumbnail.classList.contains('recipe__card--thumbnail')).toBe(true);
      expect(recipeCardThumbnail.getAttribute('src')).toBe(`${BASE_THUMBNAIL_URL}${EXEMPLE_RECIPES[0].image}`);
      expect(recipeCardThumbnail.getAttribute('alt')).toBe(`Recette ${EXEMPLE_RECIPES[0].name}`);
  });

  it('should construct a recipe card title component', () => {
    const recipeCardTitle = factory.constructRecipeCardTitle(EXEMPLE_RECIPES[0]);
      expect(recipeCardTitle.tagName).toBe('H3');
      expect(recipeCardTitle.classList.contains('recipe__card--title')).toBe(true);
      expect(recipeCardTitle.innerText).toBe(EXEMPLE_RECIPES[0].name);
  });

  it('should construct a recipe card content component', () => {
    const recipeCardDetails = factory.constructRecipeCardContent(EXEMPLE_RECIPES[0]);
      expect(recipeCardDetails.tagName).toBe('DIV');
      expect(recipeCardDetails.classList.contains('recipe__card--content')).toBe(true);
      expect(recipeCardDetails.innerText).toBe(EXEMPLE_RECIPES[0].description);
  });

  it('should construct a recipe card time encart component', () => {
    const recipeCardTime = factory.constructRecipeCardTime(EXEMPLE_RECIPES[0]);
      expect(recipeCardTime.tagName).toBe('ASIDE');
      expect(recipeCardTime.classList.contains('recipe__card--time')).toBe(true);
    const recipeCardTimeIcon = recipeCardTime.querySelector('.recipe__card--time-icon');
      expect(recipeCardTimeIcon).toBeTruthy();
      expect(recipeCardTimeIcon.tagName).toBe('IMG');
      expect(recipeCardTimeIcon.getAttribute('src')).toBe('assets/icons/time.svg');
      expect(recipeCardTimeIcon.getAttribute('alt')).toBe('Durée de la recette');
    const recipeCardTimeText = recipeCardTime.querySelector('.recipe__card--time-text');
      expect(recipeCardTimeText).toBeTruthy();
      expect(recipeCardTimeText.tagName).toBe('P');
      expect(recipeCardTimeText.innerText).toBe(`${EXEMPLE_RECIPES[0].time}min`);
  });

  it('should construct a recipe card ingredient component', () => {
    const recipeCardIngredients = factory.constructRecipeCardIngredient(EXEMPLE_RECIPES[0].ingredients[0]);
      expect(recipeCardIngredients.tagName).toBe('DIV');
      expect(recipeCardIngredients.classList.contains('recipe__card--ingredient')).toBe(true);
    const recipeCardIngredientTitle = recipeCardIngredients.querySelector('.recipe__card--ingredient-title');
      expect(recipeCardIngredientTitle).toBeTruthy();
      expect(recipeCardIngredientTitle.tagName).toBe('H4');
      expect(recipeCardIngredientTitle.innerText).toBe('Sucre');
    const recipeCardIngredientQuantity = recipeCardIngredients.querySelector('.recipe__card--ingredient-quantity');
      expect(recipeCardIngredientQuantity).toBeTruthy();
      expect(recipeCardIngredientQuantity.tagName).toBe('P');
      expect(recipeCardIngredientQuantity.innerText).toBe('30grammes');
  });
});




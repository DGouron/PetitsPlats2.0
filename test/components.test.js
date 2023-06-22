const { describe, test } = require("node:test");
const { componentFactory } = require("../scripts/factories/componentFactory");

const recipes = [
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
    const recipeCard = factory.constructRecipeCard(recipes[0]);
      expect(recipeCard.tagName).toBe('ARTICLE');
      expect(recipeCard.classList.contains('recipe__card--container')).toBe(true);
  });
});




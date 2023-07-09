const { describe, test } = require("node:test");
const { getFilterOptions, removeDuplicates, sortByAlphabeticalOrder } = require("../scripts/helpers/filterTool");

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

describe('Filters tool testing', () => {
  it('should return a list of ingredients', () => {
    const ingredients = getFilterOptions(recipes, 'ingredients');
    expect(ingredients).toEqual([
      'Sucre',
      'Glaçons',
      'Tomate',
      'Carotte',
    ]);
  });

  it('should return a list of appliances', () => {
    const appliances = getFilterOptions(recipes, 'appliances');
    expect(appliances).toEqual([
      'Blender',
      'Saladier',
    ]);
  });

  it('should return a list of ustensils', () => {
    const ustensils = getFilterOptions(recipes, 'ustensils');
    expect(ustensils).toEqual([
      'cuillère à Soupe',
      'verres',
      'presse citron',
    ]);
  });

  it('should remove duplicates', () => {
    const filterListWithDuplicates = [
      'Sucre',
      'Glaçons',
      'tomate',
      'Carotte',
      'tomate'
    ];
    const filterListWithoutDuplicates = [
      'Sucre',
      'Glaçons',
      'Tomate',
      'Carotte',
    ];
    const ingredients = removeDuplicates(filterListWithDuplicates);
    expect(ingredients).toEqual(filterListWithoutDuplicates);
  });

  it('should sort by alphabetical order', () => {
    const filtersToSort = [
      'Sucre',
      'Glaçons',
      'Carotte',
      'Tomate'
    ];
    const filterSortByOrder = [
      'Carotte',
      'Glaçons',
      'Sucre',
      'Tomate',
    ];
    const ingredients = sortByAlphabeticalOrder(filtersToSort);
    expect(ingredients).toEqual(filterSortByOrder);
  });
});
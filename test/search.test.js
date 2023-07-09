const { checkSearchValidity, searchByTitle, searchByIngredient, searchByDescription, agregateSearchResults } = require('../scripts/helpers/search');
const { recipes } = require('../scripts/data/recipes');

describe('Test all search functions', () => {

  it('it should be return true if the search length is greater than 3', () => {
      const word = 'test';
      expect(checkSearchValidity(word)).toBe(true);
      const word2 = 'te';
      expect(checkSearchValidity(word2)).toBe(false);
    }
  );

  it('it should found a recipe by his the title', () => {
    const title = 'Smoothie';
    const result = searchByTitle(title, recipes);
    expect(result.length).toEqual(3);
  }
  );

  it('it should found recipes who contain this ingredient', () => {
    const title = 'Citron';
    const result = searchByIngredient(title, recipes);
    expect(result.length).toEqual(9);
  }
  );

  it('it should found recipes who contain this word in his description', () => {
    const title = 'citron';
    const result = searchByDescription(title, recipes);
    expect(result.length).toEqual(9);
  }
  );

  it('it should agregated all recipes found into one array', () => {
    const title = 'pomme';
    const result = searchByDescription(title, recipes);
    console.log(result.length);
    const result2 = searchByIngredient(title, recipes);
    console.log(result2.length);
    const agregatedResult = agregateSearchResults([result, result2]);
    expect(agregatedResult.length).toEqual(10);
    const result3 = searchByTitle(title, recipes);
    const agregatedResult2 = agregateSearchResults([result, result2, result3]);
    expect(agregatedResult2.length).toEqual(10);
  }
  );
});
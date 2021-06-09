const { Recipe, conn } = require('../../src/db.js');
const { expect, assert, to, have, lengthOf } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('title and summary', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid title')))
          .catch(() => done());
      });
      it('should not allow a recipe without a summary', (done) => {
        Recipe.create({ title: 'Tortilla de papa'})
        .then(() => done(new Error('Recipe requires a summary')))
        .catch(() => done());
      });
    });  
    it('should work when its a valid title', () => {
      Recipe.create({ title: 'Milanesa a la napolitana' });
    });
    it('error with an invalid score', function(done) {
      Recipe.create({
        title: 'Milanesas',
        summary: 'Milanesa napolitana con puré',
        spoonacularScore: 'this is an invalid score'
      })
        .then(() => done('Should not work with an invalid score.'))
        .catch(() => done());
    });
    describe('Hooks', function () {
      it('sets title with the appropiate capital letters', function() {
        return Recipe.create({
          title: 'flan con dulce de leche',
          summary: 'flan con ddl y crema casera',
        })
          .then(recipe => {
            expect(recipe.title).to.equal('Flan Con Dulce De Leche');
          })
      });
    });
  });
});

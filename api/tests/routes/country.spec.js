/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  title: 'Milanea napolitana',
  summary: 'Milanesas a caballo',
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/').expect(200)
    );
  });

  describe('GET /:idReceta', function () {
    it('responds with a 200 when the recipe exists', function(){
      return agent.get('/recipes/1')
        .expect(200);
    });
    it('finds recipes from the API', function() {
      return agent.get('/recipes/-4')
        .expect(200);
    });
    it('responds with 404 when the recipe does not exist', function() {
      return agent.get('/recipes/999999999')
        .expect(404);
    });

  });

  describe('POST /recipe', function () {
    it('responds with 200', function(){
      return agent.post('/recipe')
        .send({
          title: 'Helado',
          summary: 'helado de vainilla y chocolate',
          spoonacularScore: 99,
        })
        .expect(200);
    });
    it('creates a new recipe in the database', function(){
      return agent.post('/recipe')
        .send({
          title: 'Tallarines con bolognesa',
          summary: 'pasta italiana con albondigas',
          spoonacularScore: 22,
        })
        .then(() => {
          return Recipe.findOne({
            where: {
              title: 'Tallarines Con Bolognesa'
            }
          });
        })
        .then(recipe => {
          expect(recipe).to.exist;
        });
    });
  });
});

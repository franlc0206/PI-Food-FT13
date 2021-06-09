//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Diet } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001');

    let gluten = Diet.findOrCreate({
      where: {
        name: 'gluten free',
      },
    });
    let keto = Diet.findOrCreate({
      where: {
        name: 'ketogenic',
      },
    });
    let dairy = Diet.findOrCreate({
      where: {
        name: 'dairy free',
      },
    });
    let veggie = Diet.findOrCreate({
      where: {
        name: 'lacto ovo vegetarian',
      },
    });
    let fodmap = Diet.findOrCreate({
      where: {
        name: 'fodmap friendly',
      },
    });
    let vegan = Diet.findOrCreate({
      where: {
        name: 'vegan',
      },
    });
    let pescatarian = Diet.findOrCreate({
      where: {
        name: 'pescatarian',
      },
    });
    let paleo = Diet.findOrCreate({
      where: {
        name: 'paleolithic',
      },
    });
    let primal = Diet.findOrCreate({
      where: {
        name: 'primal',
      },
    });
    let whole = Diet.findOrCreate({
      where: {
        name: 'whole 30',
      },
    });
    let vegetarian = Diet.findOrCreate({
      where: {
        name: 'vegetarian',
      },
    });

    Promise.all([
      vegetarian,
      gluten,
      keto,
      dairy,
      veggie,
      fodmap,
      vegan,
      pescatarian,
      paleo,
      primal,
      whole,
    ]).then(() => {
      console.log('Types cargados');
    });
  });

});

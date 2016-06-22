
const Promise = require('bluebird');

const redis = Promise.promisifyAll(require('redis'));
const redisClient = redis.createClient();

const request = require('superagent');

const getDataForProduct = (upc, callback) => {
  console.log(upc);
  request
    .get(`http://world.openfoodfacts.org/api/v0/product/${upc}.json`)
    .end((err, res) => {
      const product = {};
      if (res.body.status === 0) {
        callback('product doesn\'t exist');
      } else {
        const productData = res.body.product;
        product.upc = upc;
        product.name = productData.product_name;
        product.brand = productData.brands;
        product.categories = productData.categories_hierarchy;
        for (var i = 0; i < product.categories.length; i++) {
          product.categories[i] = product.categories[i].slice(3);
        }
        product.tags = productData._keywords;
        product.ingredients = productData.ingredients_tags;

        const productNutriments = res.body.product.nutriments;
        product.energy = productNutriments.energy_100g;
        product.fat = productNutriments.fat_100g;
        product.saturatedfat = productNutriments.saturatedfat_100g;
        product.monounsaturatedfat = productNutriments.monounsaturatedfat_100g;
        product.polyunsaturatedfat = productNutriments.polyunsaturatedfat_100g;
        product.omega3fat = productNutriments.omega3fat_100g;
        product.transfat = productNutriments.transfat_100g;
        product.cholesterol = productNutriments.cholesterol_100g;
        product.carbohydrates = productNutriments.carbohydrates_100g;
        product.sugar = productNutriments.sugars_100g;
        product.starch = productNutriments.starch_100g;
        product.polyols = productNutriments.polyols_100g;
        product.fiber = productNutriments.fiber_100g;
        product.protein = productNutriments.proteins_100g;
        product.salt = productNutriments.salt_100g;
        product.sodium = productNutriments.sodium_100g;
        product.alcohol = productNutriments.alcohol_100g;
        product.vitamina = productNutriments.vitamina_100g;
        product.vitamind = productNutriments.vitamind_100g;
        product.vitamine = productNutriments.vitamine_100g;
        product.vitamink = productNutriments.vitamink_100g;
        product.vitaminb1 = productNutriments.vitaminb1_100g;
        product.vitaminb2 = productNutriments.vitaminb2_100g;
        product.vitaminpp = productNutriments.vitaminpp_100g;
        product.vitaminb6 = productNutriments.vitaminb6_100g;
        product.vitaminb9 = productNutriments.vitaminb9_100g;
        product.vitaminb12 = productNutriments.vitaminb12_100g;
        product.biotin = productNutriments.biotin_100g;
        product.pantothenicacid = productNutriments.pantothenicacid_100g;
        product.potassium = productNutriments.potassium_100g;
        product.calcium = productNutriments.calcium_100g;
        product.phosphorus = productNutriments.phosphorus_100g;
        product.iron = productNutriments.iron_100g;
        product.magnesium = productNutriments.magnesium_100g;
        product.zinc = productNutriments.zinc_100g;
        product.copper = productNutriments.copper_100g;
        product.manganese = productNutriments.manganese_100g;
        product.selenium = productNutriments.selenium_100g;
        product.chromium = productNutriments.chromium_100g;
        product.molybdenum = productNutriments.molybdenum_100g;
        product.iodine = productNutriments.iodine_100g;
        product.caffeine = productNutriments.caffeine_100g;
        product.taurine = productNutriments.taurine_100g;
        callback(null, product);
      }
    });
};

const getDataForProductAsync = Promise.promisify(getDataForProduct);

const workerJob = () => {
  process.on('message', (message) => {
    console.log('recieved message from the master', message);
  });

  const workerLoop = () => {
    redisClient.llenAsync('addProduct')
      .then((length) => {
        if (length === 0) {
          setTimeout(workerLoop, 1000);
        } else {
          redisClient.rpopAsync('addProduct')
            .then((upc) => {
              getDataForProductAsync(upc)
                .then((productData) => {
                  console.log('sending product data to database',
                    JSON.stringify(productData));
                  // request
                  //   .post('')
                  //   .type('form')
                  //   .send({})
                  //   .end((err, res) => {
                  //     console.log(res);
                  //   });
                  workerLoop();
                })
                .catch((err) => {
                  console.error(err);
                  workerLoop();
                });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  workerLoop();
};

// start the worker
workerJob();


// const Car = require('../models/car.model');

// exports.getCars = function(req, res) {
//     Car.find(function(err, cars) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(cars);
//         }
//     });
// };

// exports.getMakes = function(req, res) {
//   try {
//         const makes = Car.distinct('make');
//         // const cars = makes.map(make => ({ name: make }));
//         this.res.send(makes);
//       } catch (err) {
//         console.error(err);
//         this.res.send({ status: 500, message: err });
//       }
// };

// exports.getModelsByMake = function(req, res) {
//     const make = req.params.make;
//     Car.find({ make: make }).distinct('model', function(err, models) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(models);
//         }
//     });
// };

// exports.getYearsByMakeAndModel = function(req, res) {
//     const make = req.params.make;
//     const model = req.params.model;
//     Car.find({ make: make, model: model }).distinct('year', function(err, years) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.json(years);
//         }
//     });
// };

// exports.getTrimsAndEnginesByCar = function(req, res) {
//     const make = req.params.make;
//     const model = req.params.model;
//     const year = req.params.year;
//     Car.find({ make: make, model: model, year: year }, function(err, cars) {
//         if (err) {
//             console.log(err);
//         } else {
//             const trims = cars.map(car => car.trim);
//             const engines = cars.map(car => car.engine);
//             res.json({ trims: trims, engines: engines });
//         }
//     });
// };


const Controller = require('./base.controller');
const Car = require('../models/car.model');
class CarController extends Controller {
  constructor() {
    super();
}
async getMakes() {
  try {
    const makes = await Car.distinct('make');
    // const cars = makes.map(make => ({ name: make }));
    // this.res.status(500).send({ status: 500, message: err });

    this.res.send(makes);
  } catch (err) {
    console.error(err);
    this.res.status(500).send({ status: 500, message: err });
  }
}

  async getModels() {
    try {
      const { make } = this.req.params;
      const models = await Car.distinct('model', { make });
      this.res.json(models);
    } catch (err) {
      console.error(err);
      this.res.status(500).send('Internal Server Error');
    }
  }

  async getYears() {
    try {
      const { make, model } = this.req.params;
      const years = await Car.distinct('year', { make, model });
      this.res.json(years);
    } catch (err) {
      console.error(err);
      this.res.status(500).send('Internal Server Error');
    }
  }

 async getTrims() {
    try {
      const { make, model, year } = this.req.body;
      const cars = await Car.find({ make, model, year: { $in: year } }, { trim: 1, engine: 1, year: 1});
      
      const trimsByYear = {};
      cars.forEach(car => {
        if (!trimsByYear[car.year]) {
          trimsByYear[car.year] = [];
        }
        trimsByYear[car.year].push({ id: car._id, trim: car.trim, engine: car.engine });
      });
      
      const response = Object.keys(trimsByYear).map(year => ({
        make,
        model,
        year,
        value: trimsByYear[year]
      }));
      
      this.res.json(response);
    } catch (err) {
      console.error(err);
      this.res.status(500).send('Internal Server Error');
    }
  }

  
  
  

  async getEngines() {
    try {
      const { make, model, year, trim } = this.req.params;
      const engines = await Car.distinct('engine', { make, model, year, trim });
      this.res.json(engines);
    } catch (err) {
      console.error(err);
      this.res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = CarController;

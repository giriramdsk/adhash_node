const Controller = require('./base.controller');
const Car = require('../models/car.model');
const Cache = require('../utils/cache.util');

class CarController extends Controller {
  constructor() {
    super();
    this.cache = new Cache();
  }

  async getMakes() {
    try {
      const cachedData = await this.cache.get('makes');
      if (cachedData) {
        return this.res.json(cachedData);
      }
      const makes = await Car.distinct('make');
      await this.cache.set('makes', makes);
      this.res.json(makes);
    } catch (err) {
      console.error(err);
      this.res.status(500).send({ status: 500, message: err });
    }
  }

  async getModels() {
    try {
      const { make } = this.req.params;
      const cachedData = await this.cache.get(`models-${make}`);
      if (cachedData) {
        return this.res.json(cachedData);
      }
      const models = await Car.distinct('model', { make });
      await this.cache.set(`models-${make}`, models);
      this.res.json(models);
    } catch (err) {
      console.error(err);
      this.res.status(500).send('Internal Server Error');
    }
  }

  async getYears() {
    try {
      const { make, model } = this.req.params;
      const cachedData = await this.cache.get(`years-${make}-${model}`);
      if (cachedData) {
        return this.res.json(cachedData);
      }
      const years = await Car.distinct('year', { make, model });
      await this.cache.set(`years-${make}-${model}`, years);
      this.res.json(years);
    } catch (err) {
      console.error(err);
      this.res.status(500).send('Internal Server Error');
    }
  }

  async getTrims() {
    try {
      const { make, model, year } = this.req.body;
      const cachedData = await this.cache.get(`trims-${make}-${model}-${year}`);
      if (cachedData) {
        return this.res.json(cachedData);
      }
      const cars = await Car.find({ make, model, year: { $in: year } }, { trim: 1, engine: 1, year: 1 });

      const trimsByYear = {};
      cars.forEach((car) => {
        if (!trimsByYear[car.year]) {
          trimsByYear[car.year] = [];
        }
        trimsByYear[car.year].push({ id: car._id, trim: car.trim, engine: car.engine });
      });

      const response = Object.keys(trimsByYear).map((year) => ({
        make,
        model,
        year,
        value: trimsByYear[year],
      }));

      await this.cache.set(`trims-${make}-${model}-${year}`, response);
      this.res.json(response);
    } catch (err) {
      console.error(err);
      this.res.status(500).send('Internal Server Error');
    }
  }

  async getEngines() {
    try {
      const { make, model, year, trim } = this.req.params;
      const cachedData = await this.cache.get(`engines-${make}-${model}-${year}-${trim}`);
      if (cachedData) {
        return this.res.json(cachedData);
      }
      const engines = await Car.distinct('engine', { make, model, year, trim });
      await this.cache.set(`engines-${make}-${model}-${year}-${trim}`, engines);
      this.res.json(engines);
    } catch (err) {
      console.error(err);
      this.res.status(500).send('Internal Server Error');
    }
  }
  
}

module.exports = CarController;

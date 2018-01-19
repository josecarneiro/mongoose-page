'use strict';

const Database = require('./database');
const database = new Database({ url: process.env.MONGODB_URI || 'mongodb://127.0.0.1/mongoose-page-test' });

const mongoose = require('mongoose');
const mongoosePage = require('./../.');

const { expect } = require('chai');

describe('Page Plugin tests', () => {
  before(async () => database.open());
  after(async () => {
    await database.cleanUp();
    await database.close();
  });

  beforeEach(async () => database.cleanUp());

  // Define sample Model for tests
  // and plug mongoose-page
  const Schema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    }
  });
  Schema.plugin(mongoosePage);
  const Model = mongoose.model('ModelA', Schema);

  it('Should paginate search results', async () => {
    try {
      /* eslint-disable no-unused-vars */
      for (let index of new Array(12)) {
        await new Model({ name: 'John' }).save();
      }
      expect(await Model.find().page({ page: 1, limit: 5 }).exec())
      .to.be.an('array').of.length(5);
      expect(await Model.find().page({ page: 2, limit: 8 }).exec())
      .to.be.an('array').of.length(4);
      expect(await Model.find().page({ page: 4, limit: 5 }).exec())
      .to.be.an('array').of.length(0);
    } catch (error) {
      throw error;
    }
  });
});

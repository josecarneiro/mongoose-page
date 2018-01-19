'use strict';

// CONNECT TO THE DATABASE

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
if (mongoose.pluralize && typeof mongoose.pluralize === 'function') mongoose.pluralize(null);

module.exports = class Database {
  constructor (options) {
    this._defaults = {};
    this._options = { ...this._defaults, ...options };
  }

  async open () {
    try {
      await mongoose.connect(this._options.url, {});
    } catch (error) {
      throw error;
    }
  }

  async close () {
    if (this.state === 0) return;
    try {
      await this.connection.close();
    } catch (error) {
      throw error;
    }
  }

  async cleanUp () {
    try {
      if (this.state === 0) await this.open();
      await this.connection.dropDatabase();
    } catch (error) {
      throw error;
    }
  };

  async cleanCollection (collection) {
    if (!this.connection.collections[`${ collection }s`]) return;
    try {
      await this.connection.collections[`${ collection }s`].drop();
    } catch (error) {
      throw error;
    }
  };

  get connection () {
    return mongoose.connection;
  }

  get state () {
    return mongoose.connection.readyState;
  }
};

'use strict';

module.exports = (schema, options = {}) => {
  const defaults = { name: 'page' };
  options = Object.assign(defaults, options);
  schema.query[options.name] = function ({ page, limit }) {
    page = typeof page === 'number' && page > 0 ? page : 1;
    return this
    .skip((page - 1) * limit)
    .limit(limit);
  };
};

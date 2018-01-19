# Mongoose-Page

Small plugin to paginate Mongoose MongoDB queries.

## Installation

    $ yarn add mongoose-page

or, using npm

    $ npm install mongoose-page

### Usage

Simply plug `mongoose-page` into a model of your choice, or plug it globally into mongoose (so it can be used across models).

```js
const mongoosePage = require('mongoose-page');

const BookSchema = new mongoose.Schema({ ... });

BookSchema.plugin(mongoosePage);

const Book = mongoose.model('Book', BookSchema);
```

or, globally

```js
const mongoosePage = require('mongoose-page');
mongoose.plugin(mongoosePage);
```

Then, to use `mongoose-page` in a query, just append it into your query chain:

```js
const getBooks = async function () {
  return Book.find({ ... }).page({ page: 4, limit: 10 }).exec();
};
```

In the example above, we're querying for the 4th page of books, given that each page might include at most 10 results.

### Compatibility

Compatibility hasn't been thoroughly tested with older versions of mongoose, but it's safe to assume the plugin will work in the following versions:

    Node.js: > 4.x.x

    Mongoose: >= 2.x

    MongoDB: any

### Testing

To run tests, simply execute the command `npm run test`. Make sure you have a MongoDB process running.

## Author

[José Carneiro](https://josecarnei.ro) - Full-stack developer, living in sunny Lisbon, Portugal.

## License

The plugin `mongoose-page` is licensed under the MIT License, meaning it's free to be used for any purpose.
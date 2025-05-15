const categories = require('../data/categories.json');
const suppliers = require('../data/suppliers.json');

exports.handler = async function(event, context) {
  const path = event.path.replace('/.netlify/functions/api/', '');

  try {
    switch (path) {
      case 'categories':
        return {
          statusCode: 200,
          body: JSON.stringify(categories)
        };

      case 'suppliers':
        return {
          statusCode: 200,
          body: JSON.stringify(suppliers)
        };

      default:
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'Not Found' })
        };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to execute request' })
    };
  }
};

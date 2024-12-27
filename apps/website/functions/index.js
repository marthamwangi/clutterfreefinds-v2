const { https } = require('firebase-functions');
exports.universal = https.onRequest((request, response) => {
  require(`${process.cwd()}/public/server/main`).app()(request, response);
});

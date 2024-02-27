const { https } = require("firebase-functions");
const mainJSFile = require( "../public/server/main");
exports.cffv2WebsiteMfessr = https.onRequest(mainJSFile.app());
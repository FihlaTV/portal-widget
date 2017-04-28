var express = require('express');
var router = express.Router();
var pjson = require('../package.json');
var utils = require('./utils');

var title = 'Voxbone Widget Generator v' + pjson.version;

// Required for auto Let's Encrypt cert generation
// https://github.com/dmathieu/sabayon
router.get('/.well-known/acme-challenge/:acmeToken', function(req, res, next) {
  var acmeToken = req.params.acmeToken;
  var acmeKey;

  if (process.env.ACME_KEY && process.env.ACME_TOKEN) {
    if (acmeToken === process.env.ACME_TOKEN) {
      acmeKey = process.env.ACME_KEY;
    }
  }

  for (var key in process.env) {
    if (key.startsWith('ACME_TOKEN_')) {
      var num = key.split('ACME_TOKEN_')[1];
      if (acmeToken === process.env['ACME_TOKEN_' + num]) {
        acmeKey = process.env['ACME_KEY_' + num];
      }
    }
  }

  if (acmeKey) res.send(acmeKey);
  else res.status(404).send();
});

// This is indented to get the latest version always
router.get(utils.click2voxJsFileName, function(req, res) {
  res.redirect(process.env.APP_URL + '/javascripts/click2vox-2.3.0.js');
});

// FAQ & Known issues documents
router.get('/faq', function (req, res, next) {
  res.render('faq');
});

router.get('/known-issues', function (req, res, next) {
  res.render('known_issues');
});

router.get('/ping', function(req, res, next){
  res.json({ 'ping': Date.now(), 'version': pjson.version });
});

module.exports = router;

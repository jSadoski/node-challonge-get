const assert = require('chai').assert;
const challonge = require('../challongeAPI.js');
const credentials = require('./.credentials.json');

describe('Tests retrieve', function () {
  var api;

  before(function () {
    api = new challonge.API(credentials.key);
  });

  describe('Tests tournaments', function () {
    it('Tests tournaments.index', function () {
      api
        .tournaments()
        .index()
        .then((tournaments) => assert.isArray(tournaments));
    });

    it('Tests tournaments.show', function () {
      const url = 'reggiesroughriders';
      api
        .tournaments()
        .show(url)
        .then((tournament) => assert.equal(tournament.url, url));
    });
  });

  describe('Tests participants', function () {});
  describe('Tests matches', function () {});
  describe('Tests matchAttachments', function () {});
});

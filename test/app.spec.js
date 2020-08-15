const assert = require('chai').assert;
const expect = require('chai').expect;
const challonge = require('../challongeAPI.js');
const credentials = require('./.credentials.json');

debugger;

describe('Tests retrieve', function () {
  var api;

  before(function () {
    api = new challonge.API(credentials.key);
  });

  it('Tests tournaments.index', function () {
    let tournaments = api.tournaments().index();
    expect(tournaments).to.exist;
  });
});

const assert = require("chai").assert;
const expect = require("chai").expect;
const challonge = require("../challongeAPI.js");
const credentials = require("./.credentials.json");

describe("Tests retrieve", function () {
  var api;

  before(function () {
    api = new challonge.API(credentials.user, credentials.key);
  });

  it("Tests tournaments", function () {
    let tournaments = api.tournaments();
    expect(tournaments).to.exist;
  });
});

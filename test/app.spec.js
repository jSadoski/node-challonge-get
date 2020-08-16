const assert = require('chai').assert;
const challonge = require('../challongeAPI.js');
const credentials = require('./.credentials.json');

describe('API', function () {
  var api;

  before(function () {
    api = new challonge.API(credentials.key);
  });

  describe('tournaments()', function () {
    describe('tournaments().index()', function () {
      it('correctly returns tournaments', async function () {
        let tournaments = await api
          .tournaments()
          .index()
          .then((tournaments) => tournaments);
        assert.isArray(tournaments);
      });

      let states = [
        { state: 'all' },
        { state: 'pending' },
        { state: 'in_progress' },
        { state: 'ended' },
      ];
      states.forEach(function (states) {
        it(`correctly returns tournaments of state:${states.state}`, async function () {
          let tournaments = await api
            .tournaments()
            .index(states.state)
            .then((tournaments) => tournaments);
          assert.isArray(tournaments);
        });
      });

      let t_types = [
        { t_type: 'single_elimination', expect: 'single elimination' },
        { t_type: 'double_elimination', expect: 'double elimination' },
        { t_type: 'round_robin', expect: 'round robin' },
        { t_type: 'swiss', expect: 'swiss' },
      ];
      t_types.forEach(function (t_types) {
        it(`correctly returns tournaments of type:${t_types.t_type}`, async function () {
          let tournaments = await api
            .tournaments()
            .index(t_types.t_type)
            .then((tournaments) => tournaments);
          assert.isArray(tournaments);
        });
      });

      it('correctly return tournaments of a subdomain', async function () {
        let tournaments = await api
          .tournaments()
          .index((subdomain = 'reggiesroughriders'));
        assert.isArray(tournaments);
      });
    });

    it('.show() returns a tournamennt', async () => {
      const url = 'reggiesroughriders';
      const tournament = await api.tournaments().show(url);
      assert.equal(tournament.url, url);
    });
  });

  describe('participants()', () => {
    it('.index() returns participants', async () => {
      const tournamentID = '5514195';
      const participants = await api.participants(tournamentID).index();
      assert.isArray(participants);
      assert.equal(participants[0].participant.tournament_id, tournamentID);
    });

    it('.show() returns a participant', async () => {
      const participantID = '90619162';
      const tournamentID = '5514195';
      const participant = await api
        .participants(tournamentID)
        .show(participantID);
      assert.equal(participant.id, participantID);
    });
  });

  describe('Tests matches', function () {});
  describe('Tests matchAttachments', function () {});
});

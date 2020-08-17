const assert = require('chai').assert;
const challonge = require('../challongeAPI.js');
const credentials = require('./.credentials.json');

describe('API', function () {
  var api;

  before(function () {
    api = new challonge.API(credentials.key);
  });

  describe('.tournaments', function () {
    describe('.index()', function () {
      it('returns tournaments', async () => {
        let tournaments = await api.tournaments.index();
        assert.isArray(tournaments);
      });

      let states = [
        { state: 'all' },
        { state: 'pending' },
        { state: 'in_progress' },
        { state: 'ended' },
      ];
      states.forEach(function (states) {
        it(`returns tournaments of state:${states.state}`, async function () {
          let tournaments = await api.tournaments.index(states.state);
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
        it(`returns tournaments of type:${t_types.t_type}`, async function () {
          let tournaments = await api.tournaments.index(t_types.t_type);
          assert.isArray(tournaments);
        });
      });

      it('returns tournaments of a subdomain', async function () {
        let tournaments = await api.tournaments.index(
          (subdomain = 'reggiesroughriders')
        );
        assert.isArray(tournaments);
      });
    });

    it('.show() returns a tournamennt', async () => {
      const url = 'reggiesroughriders';
      const tournament = await api.tournaments.show(url);
      assert.equal(tournament.url, url);
    });
  });

  describe('participants()', () => {
    it('.index() returns participants', async () => {
      const tournamentID = '5514195';
      const participants = await api.participants.index(tournamentID);
      assert.isArray(participants);
      assert.equal(participants[0].participant.tournament_id, tournamentID);
    });

    it('.show() returns a participant', async () => {
      const participantID = '90619162';
      const tournamentID = '5514195';
      const participant = await api.participants.show(
        tournamentID,
        participantID
      );
      assert.equal(participant.id, participantID);
    });
  });

  describe('.matches()', () => {
    const tournamentID = '5514195';
    it('.index() returns matches', async () => {
      const matches = await api.matches.index(tournamentID);
      assert.isArray(matches);
      assert.equal(matches[0].matches.tournament_id, tournamentID);
    });

    it('.show() returns a match', async () => {
      const matchID = '149005150';
      const match = await api.matches.show(tournamentID, matchID);
      assert.equal(match.tournament_id, tournamentID);
    });
  });

  // TODO Create/find test tournament with attachments to test
  describe('.matchAttachments()', () => {
    const tournamentID = '5514195';
    const matchID = '149005150';
    it('.index() returns attachments', async () => {
      const attachments = await api.matchAttachments.index(
        tournamentID,
        matchID
      );
      assert.isArray(attachments);

      it('.show() returns an attachment', async () => {
        // const attachment = await api.matchAttachments(tournamentID, matchID).show()
      });
    });
  });
});

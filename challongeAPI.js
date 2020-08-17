/**
 * @file Endpoint for every GET method of Challonge API v1.
 * See https://api.challonge.com/v1 for methods and parameters.
 * @author Joe Sadoski <jdsadoski@gmail.com>
 *
 * @requires node-fetch
 * @exports Class API
 *
 * @license GPL-3.0-or-later
 */

const fetch = require('node-fetch');

const apiUrl = 'https://api.challonge.com/v1/';

/**
 * Base class for Challonge API.
 */
class API {
  /**
   * Creates an instance of API.
   *
   * @param {String} key The API key.
   *
   * @constructs
   */
  constructor(key) {
    this.key = key;
  }

  /**
   * Retrieves the API endpoint for a given method.
   *
   * @param {String} method The Challonge API method that comes
   *  after the base URL
   * @param {Map} [params=[]] The parameters to be passed to the
   *  method (passed as a query string parameter)
   *
   * @returns {Promise} A Promise containing the response object,
   *  typically an Array of object types.
   */
  retrieve = async (method, params = []) => {
    let url = `${apiUrl}${method}.json?api_key=${this.key}&${params.forEach(
      (value, key) => key + '=' + value
    )}`;

    return await fetch(url, { method: 'GET' })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log(`'${url}' returned: ${res.status}: ${res.statusText}`);
          return [];
        }
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
  };

  /**
   * Gets a tournament or tournaments. Use .index() or .show()
   *
   * @returns {Object} methods containing .index() and .show()
   */
  get tournaments() {
    class tourn {
      constructor() {}
    }
    /**
     * Retrieves a set of tournaments created by the account
     * which owns the API key.
     *
     * @param {String} state all, pending, in_progress, ended
     * @param {String} t_type	single_elimination, double_elimination,
     *  round_robin, swiss
     * @param {Date} created_after	!NOT IMPLEMENTED YET! YYYY-MM-DD
     * @todo Implement created_after
     * @param created_before	!NOT IMPLEMENTED YET! YYYY-MM-DD
     * @todo Implement created_before
     * @param subdomain	A Challonge subdomain you've published
     *  tournaments to.
     *
     * @returns {Promise} A Promise which will contain an Array
     *  of tournament objects (JSON)
     *
     * @alias tournaments.index
     * @memberof API
     */
    tourn.index = async (
      state = null,
      t_type = null,
      created_after = null,
      created_before = null,
      subdomain = null
    ) => {
      const method = 'tournaments';
      const params = new Map();
      if (state !== null) {
        params.set('state', state);
      }
      if (t_type !== null) {
        params.set('type', t_type);
      }
      if (created_after !== null) {
        params.set('created_after', created_after);
      }
      if (created_before !== null) {
        params.set('created_before', created_before);
      }
      if (subdomain !== null) {
        params.set('subdomain', subdomain);
      }

      return await this.retrieve(method, params);
    };
    /**
     * Retrieves a tournament.
     *
     * @param {String} tournament Tournament ID (e.g. 10230) or
     *  URL (e.g. 'single_elim' for challonge.com/single_elim).
     * @param {boolean} include_participants	Includes an array of
     *  associated participant records
     * @param {boolean} include_matches	Includes an array of
     *  associated match records
     *
     * @returns {Promise} A Promise which will have
     *  the tournament object (JSON)
     *
     */
    tourn.show = async (
      tournament,
      include_participants = false,
      include_matches = false
    ) => {
      const method = `tournaments/${tournament}`;
      const params = new Map();
      if (include_participants !== null) {
        params.set('include_participants', include_participants);
      }
      if (include_matches !== null) {
        params.set('include_matches', include_matches);
      }

      const response = await this.retrieve(method);

      // Challonge API returns an anonymous object
      // containing the tournament object
      return response.tournament;
    };
    return tourn;
  }

  /**
   * Gets participants of the given tournament.
   * Use .index()) or .show()
   *
   * @param {String} tournament Tournament ID (e.g. 10230) or
   *  URL (e.g. 'single_elim' for challonge.com/single_elim).
   * @return {Object} An object containing .index() and .show()
   */
  get participants() {
    class part {
      constructor() {}
    }
    /**
     * Returns all the participants of the given tournament.
     *
     * @returns {Promise} A Promise which will contain an Array
     *  of participant objects (JSON)
     *
     */
    part.index = async (tournament) => {
      const method = `tournaments/${tournament}/participants`;
      const response = await this.retrieve(method);
      return response;
    };
    /**
     * Returns a participant at the given ID
     *
     * @param {String} participant_id The participant's unique ID
     * @returns {Promise} A promise which will contain a
     *  participant object (JSON)
     *
     */
    part.show = async (tournament, participant_id) => {
      const method = `tournaments/${tournament}/participants/${participant_id}`;
      const response = await this.retrieve(method);

      // Challonge API returns an anonymous object
      // containing the tournament object
      return response.participant;
    };
    return part;
  }

  /**
   * Gets matches for a given tournament.
   * Use .index() and .show()
   *
   * @param {String} tournament Tournament ID (e.g. 10230) or
   *  URL (e.g. 'single_elim' for challonge.com/single_elim)
   * @returns {Object} an object containing .index() and .show()
   */
  get match() {
    class m {
      constructor() {}
    }
    /**
     * Returns all the matches for the given tournament.
     *
     * @returns {Promise} Will contain an Array containing
     *  match objects (JSON).
     *
     */
    m.index = async (tournament) => {
      const method = `tournaments/${tournament}/matches`;
      const response = await this.retrieve(method);
      return response;
    };
    /**
     * Returns a match for the given tournament and match_id
     *
     * @param {String} match_id The match's unique ID
     * @todo add include_attachments parameter
     * @returns {Promise} Will contain a match object (JSON)
     *
     */
    m.show = async (tournament, match_id) => {
      const method = `tournaments/${tournament}/matches/${match_id}`;
      const response = await this.retrieve(method);
      return response.match;
    };
    return m;
  }

  /**
   * Gets match attachments.
   * Use .index() and .show()
   *
   * @param {String} tournament Tournament ID (e.g. 10230) or
   * URL (e.g. 'single_elim' for challonge.com/single_elim).
   * @param {String} match
   * @returns {Object} An object containing .index() and .show() methods
   *
   * @todo Create/find test tournament with attachments to test
   */
  get matchAttachments() {
    class Att {
      constructor() {}
    }
    /**
     * Retrieve a match's attachments.
     *
     * @returns {Promise} A Promise containing an Array with
     * attachment objects (JSON)
     *
     */
    Att.index = async (tournament, match) => {
      const method = `tournaments/${tournament}/matches/${match}/attachments`;
      const response = await this.retrieve(method);
      return response;
    };
    /**
     * Retrieve a match's attachments.
     *
     * @param {String} attachment_id The match's unique ID
     * @returns {Promise} A Promise containing the attachment (JSON)
     *
     */
    Att.show = async (tournament, attachment_id) => {
      const method = `tournaments/${tournament}/matches/${match}/attachments/${attachment_id}`;
      const response = await this.retrieve(method);
      return response.attachment;
    };
    return Att;
  }
}

exports.API = API;

const fetch = require('node-fetch');
const util = require('util');

/** @type {String} */
const apiUrl = 'https://api.challonge.com/v1/'; // This needs to be HTTPS

/**
 * Base class for Challonge API.
 *
 * @class API
 */
class API {
  /**
   * Creates an instance of API.
   * @param {String} key The API key
   * @memberof API
   */
  constructor(key) {
    this.key = key;
  }

  /**
   * Retrieves the API endpoint for a given method.
   *
   * @param {String} method
   * @param {Map} [params=[]]
   *
   * @returns {Promise}
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
  tournaments = () => {
    return {
      /**
       * Retrieve a set of tournaments created with your account.
       *
       * @param {String} state all, pending, in_progress, ended
       * @param {String} t_type	single_elimination, double_elimination, round_robin, swiss
       * @param {Date} created_after	YYYY-MM-DD
       * @param created_before	YYYY-MM-DD
       * @param subdomain	A Challonge subdomain you've published tournaments to.
       *
       * @returns {Promise}   A Promise which will contain an Array of JSON tournament objects
       */
      index: (
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

        return this.retrieve(method, params)
          .then((tournaments) => tournaments)
          .catch((err) => console.log(err));
      },
      /**
       * Retrieve a single tournament record created with your account.
       * @param {String} tournament (in URL string)	Tournament ID (e.g. 10230) or URL (e.g. 'single_elim' for challonge.com/single_elim). If assigned to a subdomain, URL format must be :subdomain-:tournament_url (e.g. 'test-mytourney' for test.challonge.com/mytourney)
       * @param {boolean} include_participants	Includes an array of associated participant records
       * @param {boolean} include_matches	Includes an array of associated match records
       *
       * @returns {Object} The JSON object response.
       */
      show: async (
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
        return response.tournament;
      },
    };
  };

  /**
   * Gets participants (.index()) or participant (.show()).
   *
   * @param {String} tournament
   * @return {Object} Contains .index() and .show()
   */
  participants = (tournament) => {
    return {
      /**
       * Returns all the participants of the given tournament.
       *
       * @returns {Array} An array of participant JSON objects.
       */
      index: async () => {
        const method = `tournaments/${tournament}/participants`;
        const response = await this.retrieve(method);
        return response;
      },
      /**
       * Returns a participant at the given ID
       *
       * @param {String} participant_id The participant's ID
       * @returns {Object} The participant's JSON object
       */
      show: async (participant_id) => {
        const method = `tournaments/${tournament}/participants/${participant_id}`;
        const response = await this.retrieve(method);
        return response.participant;
      },
    };
  };

  /**
   * Namespace for .index() and .show() for matches
   *
   * @param {String} tournament Tournament ID (e.g. 10230) or URL (e.g. 'single_elim' for challonge.com/single_elim)
   * @memberof API
   * @returns an object containing .index() and .show()
   */
  match = (tournament) => {
    return {
      index: async () => {
        const method = `tournaments/${tournament}/matches`;
        const response = await this.retrieve(method);
        return response;
      },
      show: async (match_id) => {
        const method = `tournaments/${tournament}/matches/${match_id}`;
        const response = await this.retrieve(method);
        return response.match;
      },
    };
  };

  /**
   * Namespace for .index() and .show() for matchAttachments
   *
   * @param {String} tournament Tournament ID (e.g. 10230) or URL (e.g. 'single_elim' for challonge.com/single_elim).
   * @param {String} match
   * @memberof API
   * @returns {Object} An object containing .index() and .show() methods
   *
   * @todo Create/find test tournament with attachments to test
   */
  matchAttachments = (tournament, match) => {
    return {
      /**
       * Retrieve a match's attachments.
       *
       * @returns {Promise} A Promise containing an Array with attachments
       */
      index: async () => {
        const method = `tournaments/${tournament}/matches/${match}/attachments`;
        const response = await this.retrieve(method);
        return response;
      },
      /**
       * Retrieve a match's attachments.
       *
       * @param {String} attachment_id The match's unique ID
       * @returns {Promise} A Promise containing the attachment
       */
      show: async (attachment_id) => {
        const method = `tournaments/${tournament}/matches/${match}/attachments/${attachment_id}`;
        const response = await this.retrieve(method);
        return response.attachment;
      },
    };
  };
}

exports.API = API;

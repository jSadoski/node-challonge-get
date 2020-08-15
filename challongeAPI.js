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
   * @param {*} key The API key
   * @memberof API
   */
  constructor(key) {
    this.key = key;
  }

  /**
   * Retrieves the API endpoint for a given method.
   *
   * @param {*} method
   * @param {*} [params=[]]
   *
   * @returns {Promise}
   */
  retrieve = async (method, params = []) => {
    return await fetch(`${apiUrl}${method}.json?api_key=${this.key}`, {
      method: 'GET',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .catch((err) => {
        throw err;
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
       * @param {String} type	single_elimination, double_elimination, round_robin, swiss
       * @param {Date} created_after	YYYY-MM-DD
       * @param created_before	YYYY-MM-DD
       * @param subdomain	A Challonge subdomain you've published tournaments to.
       *
       * @returns {Promise}   A Promise which will contain an Array of JSON tournament objects
       */
      index: (
        state = null,
        type = null,
        created_after = null,
        created_before = null,
        subdomain = null
      ) => {
        const method = 'tournaments';
        const params = new Map();
        if (state !== null) {
          params.set('state', state);
        }
        if (type !== null) {
          params.set('type', type);
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
          .catch((err) => err);
      },
      /**
       * Retrieve a single tournament record created with your account.
       * @param {String} tournament (in URL string)	Tournament ID (e.g. 10230) or URL (e.g. 'single_elim' for challonge.com/single_elim). If assigned to a subdomain, URL format must be :subdomain-:tournament_url (e.g. 'test-mytourney' for test.challonge.com/mytourney)
       * @param {boolean} include_participants	Includes an array of associated participant records
       * @param {boolean} include_matches	Includes an array of associated match records
       *
       * @returns {Object} The JSON object response.
       */
      show: (
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

        return this.retrieve(method)
          .then((json) => json)
          .catch((err) => err);
      },
    };
  };

  participants = () => {
    return {
      index: () => {},
      show: () => {},
    };
  };

  matches = () => {
    return {
      index: () => {},
      show: () => {},
    };
  };

  matchAttachments = () => {
    return {
      index: () => {},
      show: () => {},
    };
  };
}

exports.API = API;

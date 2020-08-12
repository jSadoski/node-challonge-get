const fetch = require("node-fetch");

const apiUrl = "api.challonge.com/v1/";

// async function retrieve(method) {
//   const response = await fetch(
//     `https://${user}:${key}@${apiUrl}${method}.json`
//   );

//   return await response.json();
// }

class API {
  constructor(user, key) {
    this.user = user;
    this.key = key;
  }

  async retrieve(method) {
    const response = await fetch(
      `https://${this.user}:${this.key}@${apiUrl}${method}.json`
    );

    return await response.json();
  }

  tournaments() {
    return this.retrieve("tournaments");
  }
}

exports.API = API;

const remoteURL = "http://localhost:5002";

export default {
  searchUsers(query) {
    return fetch(`${remoteURL}/users?q=${query}`).then(e => e.json());
  }
}
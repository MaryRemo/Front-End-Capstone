const remoteURL = "http://localhost:5002";

export default {
    getAll(id) {
      return fetch(`${remoteURL}/followers?currentUserId=${id}&_expand=user`).then(e => e.json());
      },

  postNewFollower(friendObj) {
    return fetch(`${remoteURL}/followers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(friendObj)
    }).then(data => data.json());
  }
};


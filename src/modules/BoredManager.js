
const remoteURL = "http://localhost:5002"

export default {
  get(id) {
    return fetch(`${remoteURL}/activities/${id}`).then(e => e.json())
  },
  getAll() {
    return fetch(`${remoteURL}/activities`).then(e => e.json())
  },
  post(newActivity) {
    return fetch(`${remoteURL}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newActivity)
    }).then(data => data.json())
  },
  put(activityId, existingActivity) {
    return fetch(`${remoteURL}/activities/${activityId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/JSON"
      },
      body: JSON.stringify(existingActivity)
    }).then(data => data.json())
  },

  getAllSharedActivities(activityId, existingActivity) {
    return fetch(`${remoteURL}/activities/${activityId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/JSON"
      },
      body: JSON.stringify(existingActivity)
    }).then(data => data.json())
  },

  api() {
    return fetch(`http://www.boredapi.com/api/activity/`).then(e => e.json())
  },

  sharedActivities() {
    return fetch(`http://localhost:5002/activities?shared=true`).then(e => e.json())
  }
}
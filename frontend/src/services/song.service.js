import http from "../api";

class SongDataService {
  getAll() {
    return http.get("/songs");
  }

  getStats() {
    return http.get("/stats");
  }

  get(id) {
    return http.get(`/song/${id}`);
  }

  create(data) {
    return http.post("/song", data);
  }

  update(id, data) {
    return http.put(`/song/${id}`, data);
  }

  delete(id) {
    console.log(id)
    return http.delete(`/song/${id}`);
  }

}

export default new SongDataService();
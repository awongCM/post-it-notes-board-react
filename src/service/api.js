//NotesBoard API Server
import axios from 'axios';

export const BASE_URL_API = 'https://post-it-notes-board-api.herokuapp.com/v1/notes';

export default class NotesBoardAPI {

  static getRequest() {
    return axios.get(BASE_URL_API);
  }
  
  static putRequest(data, id) {
    return axios.put(`${BASE_URL_API}/${id}`, data);
  }
  
  static patchRequest(data, id) {
    return axios.patch(BASE_URL_API, data);
  }
  
  static postRequest(data) {
    return axios.post(BASE_URL_API, data);
  }
  
  static deleteRequest(id) {
    return axios.delete(`${BASE_URL_API}/${id}`);
  }

}
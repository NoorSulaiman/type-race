import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios
        .post("/api/auth", { credentials })
        .then(res => res.data.user),
    signup: user =>
      axios
        .post("/api/users", { user })
        .then(res => res.data.user),
    confirm: token =>
      axios
        .post("/api/auth/confirmation", { token })
        .then(res => res.data.user),
    reconfirm: email =>
      axios.post('/api/users/reconfirm', { email }),
    resetPasswordRequest: email =>
      axios.post('/api/auth/reset_password_request', { email }),
    validateToken: token =>
      axios.post('/api/auth/validate_token', { token }),
    updatePassword: data =>
      axios.post('/api/auth/update_password', { data })
  },
  game: {
    savePoints: data => axios.post('/api/users/points', { data }),
    getPoints: () => axios.get('/api/users').then(res => res.data.users)
  }
};

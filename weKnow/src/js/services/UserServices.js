const axios = require('axios');
const Helpers = require('../others/Helpers');
const config = require('../others/Config');

class UserServices {
    constructor() {
        this.baseUrl = `${config.API_URL}/user`;
    }

    async getById(id) {
        const request = Helpers.getRequestWithHeader();
        const url = `${this.baseUrl}/${id}`;
        return await axios.get(url, request);
    }

    async recoverPasswordByEmail(email) {
        const url = `https://we-know-backend.herokuapp.com/recoverpassword`;
        return await axios.post(url, { email: email });
    }

    async saveNewPassword(email, password, token) {
        const payload = {
            email: email, password: password, token: token
        };
        const url = `https://we-know-backend.herokuapp.com/changepassword`;
        return await axios.post(url, payload);
    }

    async getUsers() {
        const request = Helpers.getRequestWithHeader();
        return await axios.get(this.baseUrl, request);
    }

    async findByEmail(email) {
        const request = Helpers.getRequestWithHeader();
        const url = `${this.baseUrl}/email?value=${email}`;
        return await axios.get(url, request);
    }

    async update(payload) {
        const request = Helpers.getRequestWithHeader();
        return await axios.put(this.baseUrl, payload, request);
    }

    async insert(payload) {
        const request = Helpers.getRequestWithHeader();
        return await axios.post(this.baseUrl, payload, request);
    }
}

module.exports = new UserServices();
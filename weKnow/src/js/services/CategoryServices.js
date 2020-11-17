const axios = require('axios');
const Helpers = require('../others/Helpers');
const config = require('../others/Config');

class CategoryServices {
    constructor() {
        this.baseUrl = `${config.API_URL}/category`;
    }

    async insert(object) {
        const request = Helpers.getRequestWithHeader();
        return await axios.post(this.baseUrl, object, request);
    }

    async update(object) {
        const request = Helpers.getRequestWithHeader();
        return await axios.put(this.baseUrl, object, request);
    }

    async getById(id) {
        const request = Helpers.getRequestWithHeader();
        const url = `${this.baseUrl}/${id}`;
        return await axios.get(url, request);
    }

    async getCategories() {
        const request = Helpers.getRequestWithHeader();
        return await axios.get(this.baseUrl, request);
    }

    async remove(id) {
        const request = Helpers.getRequestWithHeader();
        const url = `${this.baseUrl}/${id}`;
        return await axios.delete(url, request);
    }
}

module.exports = new CategoryServices();
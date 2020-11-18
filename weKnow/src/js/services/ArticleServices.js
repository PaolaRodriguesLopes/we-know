const axios = require('axios');
const Helpers = require('../others/Helpers');
const config = require('../others/Config');

class ArticleServices {
    constructor() {
        this.baseUrl = `${config.API_URL}/article`;
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

    async getArticles() {
        const request = Helpers.getRequestWithHeader();
        return await axios.get(this.baseUrl, request);
    }

    async findByAuthor(authorId) {
        const payload = { authorId };
        const request = Helpers.getRequestWithHeader();
        const url = `${this.baseUrl}/author`;
        return await axios.get(url, payload, request);
    }

    async findByValueAndCriteria(value, criteria) {
        const request = Helpers.getRequestWithHeader();
        const url = `${this.baseUrl}/custom`;
        const params = { value: value, criteria :criteria };
        return await axios.get(url, { params: params }, request);
    }

    async remove(id) {
        const request = Helpers.getRequestWithHeader();
        const url = `${this.baseUrl}/${id}`;
        return await axios.delete(url, request);
    }

    async updateStatus(object) {
        const request = Helpers.getRequestWithHeader();
        const url = `${this.baseUrl}/status`;
        return await axios.put(url, object, request);
    }

    async updateComments(object) {
        const request = Helpers.getRequestWithHeader();
        const url = `${this.baseUrl}/comments`;
        return await axios.put(url, object, request);
    }
}

module.exports = new ArticleServices();

class Helpers {
    static getRequestWithHeader() {
        const token = localStorage.getItem('token');
        const request = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        return request;
    }
}

module.exports = Helpers;

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

    static getSessionUser() {
        let sessionUser = localStorage.getItem('sessionUser');
        if (sessionUser) {
            return JSON.parse(sessionUser);
        }

        return null;
    }
}

module.exports = Helpers;
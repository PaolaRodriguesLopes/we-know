
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

    static resetSessionUser () {
        localStorage.setItem('sessionUser', null);
        localStorage.setItem('token', null);
    }
}

module.exports = Helpers;
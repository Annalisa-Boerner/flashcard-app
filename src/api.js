import axios from "axios";

const BASE_URL = "http://localhost:3001";

class BackendApi {
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${BackendApi.token}` };
        const params = method === "get" ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async getCurrentUser(username) {
        // console.log("username inside getCurrentUser in api.js", username);
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    static async signup(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    }

    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    static async addDeck(data) {
        let res = await this.request("decks", data, "post");
        return res;
    }

    static async addCard(data) {
        let res = await this.request("cards", data, "post");
        //or res.data if it's ugly
        return res;
    }
}

export default BackendApi;

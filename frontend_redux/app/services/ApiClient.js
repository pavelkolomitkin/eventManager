import axios from 'axios';

const ApiClient = class {

    constructor()
    {
        this.baseUrl = '';
        this.authToken = '';
    }

    setBaseUrl(baseUrl)
    {
        this.baseUrl = baseUrl;
    }

    getBaseUrl()
    {
        return this.baseUrl;
    }

    setAuthToken(authToken)
    {
        this.authToken = authToken;
    }

    getAuthToken()
    {
        return this.authToken;
    }

    getRequestHeaders()
    {
        return {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getAuthToken()
        };
    }

    getAbsoluteUrl(path, params = {})
    {
        let result = this.getBaseUrl() + path;

        if (Object.keys(params).length > 0)
        {
            let queryParams = [];
            for (let param in params)
            {
                queryParams.push(param + '=' + params[param]);
            }

            result += '?' + queryParams.join('&');
        }

        return result;
    }

    makeRequest(method, url, data, successCallback, errorCallback)
    {
        axios({
            method: method,
            url: url,
            headers: this.getRequestHeaders(),
            data: data,
        }).then((response) => {
            successCallback(response);
        }).catch((error) => {
            errorCallback(error);
        });
    }

    login(username, password, successCallback, errorCallback)
    {
        this.makeRequest(
            'POST',
            this.getAbsoluteUrl('/login'),
            {
                username: username,
                password: password
            },
            successCallback,
            errorCallback
        );
    }

    register(username, email, password, passwordRepeat, successCallback, errorCallback)
    {
        this.makeRequest(
            'POST',
            this.getAbsoluteUrl('/register'),
            {
                email: email,
                username: username,
                plainPassword: {
                    first: password,
                    second: passwordRepeat
                }
            },
            successCallback,
            errorCallback
        );
    }

    loadUserProfile(successCallback, errorCallback)
    {
        this.makeRequest(
            'GET',
            this.getAbsoluteUrl('/profile'),
            {},
            successCallback,
            errorCallback
        );
    }

    loadEvents(page = 1, date = null, successCallback, errorCallback)
    {
        let url = this.getBaseUrl();
        if (page > 1)
        {
            url += '/page' + page;
        }
        if (date)
        {
            url += '/date' + date;
        }

        axios({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.getAuthToken()
            }
        }).then((response) => {
            successCallback(response.events, response.total)
        }).catch((error) => {
            errorCallback(error);
        });
    }

};

ApiClient.instance = null;

ApiClient.getInstance = function () {

    if (ApiClient.instance === null)
    {
        ApiClient.instance = new ApiClient();
    }

    return ApiClient.instance;
};


export default ApiClient;
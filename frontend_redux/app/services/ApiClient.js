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
        let params = {
            page: page
        };

        if (date)
        {
            params.date = date;
        }

        this.makeRequest(
            'GET',
            this.getAbsoluteUrl('/event/list', params),
            {},
            (result) => {

                result.data.events = result.data.events.map(function(event, index){
                    event.timeStart = new Date(event.timeStart);
                    event.timeEnd = new Date(event.timeEnd);

                    return event;
                });

                successCallback(result);
            },
            errorCallback
        );
    }

    loadEvent(id, successCallback, errorCallback)
    {
        this.makeRequest(
            'GET',
            this.getAbsoluteUrl('/event/' + id),
            {},
            (result) => {
                let event = result.data;
                event.timeStart = new Date(event.timeStart);
                event.timeEnd = new Date(event.timeEnd);

                successCallback(result);
            },
            errorCallback
        );
    }

    deleteEvent(id, successCallback, errorCallback)
    {
        this.makeRequest(
            'DELETE',
            this.getAbsoluteUrl('/event/' + id),
            {},
            successCallback,
            errorCallback
        )
    }

    createEvent(title, description, timeStart, timeEnd, priority, successCallback, errorCallback)
    {
        this.makeRequest(
            'POST',
            this.getAbsoluteUrl('/event'),
            {
                title: title,
                description: description,
                timeStart: timeStart,
                timeEnd: timeEnd,
                priority: priority
            },
            successCallback,
            errorCallback
        );
    }

    updateEvent(id, title, description, timeStart, timeEnd, priority, status, successCallback, errorCallback)
    {
        this.makeRequest(
            'PUT',
            this.getAbsoluteUrl('/event/' + id),
            {
                title: title,
                description: description,
                timeStart: timeStart,
                timeEnd: timeEnd,
                priority: priority
            },
            successCallback,
            errorCallback
        );
    }

    loadEventPriorities(successCallback, errorCallback)
    {
        this.makeRequest(
            'GET',
            this.getAbsoluteUrl('/priority/list'),
            {},
            successCallback,
            errorCallback
        );
    }

    loadStatuses(successCallback, errorCallback)
    {
        this.makeRequest(
            'GET',
            this.getAbsoluteUrl('/status/list'),
            {},
            successCallback,
            errorCallback
        )
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
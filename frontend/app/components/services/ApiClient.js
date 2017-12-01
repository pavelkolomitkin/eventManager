import Marionette from 'backbone.marionette';

// TODO move it config file out
const API_BASE_URL = 'http://127.0.0.1:8000/api';

const ApiClient = Marionette.Object.extend({
    login(username, password, callbackSuccess, callbackError)
    {
        var self = this;

        $.ajax({
            type: "POST",
            url: API_BASE_URL + '/login',
            data: JSON.stringify({
                username: username,
                password: password
            }),
            contentType: ApiClient.Headers.ContentType,
            dataType: 'json',
            crossDomain: true,
            success: function(data)
            {
                self.triggerMethod(ApiClient.Events.LOGIN_SUCCESS, data);
                if (callbackSuccess)
                {
                    callbackSuccess(data);
                }
            },
            error()
            {
                self.triggerMethod(ApiClient.Events.LOGIN_ERROR, arguments);
                if (callbackError)
                {
                    callbackError(arguments);
                }
            }
        });
    },

    register(username, email, password, callbackSuccess, callbackError)
    {
        var self = this;

        $.ajax({
            type: "POST",
            url: API_BASE_URL + '/register',
            data: {
                email: email,
                username: username,
                plainPassword:
                    {
                        first: password,
                        second: password
                    }
            },
            contentType: ApiClient.Headers.ContentType,
            dataType: 'json',
            crossDomain: true,
            success: function(data)
            {
                self.triggerMethod(ApiClient.Events.REGISTER_SUCCESS, data);
                callbackSuccess(data);
            },
            error()
            {
                self.triggerMethod(ApiClient.Events.REGISTER_ERROR, arguments);
                callbackError(arguments);
            }
        });
    }
});

ApiClient.Events = {
    LOGIN_SUCCESS: 'login:success',
    LOGIN_ERROR: 'login:error',
    REGISTER_SUCCESS: 'register:success',
    REGISTER_ERROR: 'register:error'

};

ApiClient.Headers = {
    ContentType: 'application/json; charset=utf-8'
};

ApiClient.instance = null;
ApiClient.getInstance = function () {
  if (!ApiClient.instance)
  {
      ApiClient.instance = new ApiClient();
  }

  return ApiClient.instance;
};

export default ApiClient;
import Backbone from 'backbone';
import SessionManager from './components/services/SessionManager';

// TODO move it config file out
const API_BASE_URL = 'http://127.0.0.1:8000/api';

var originalSync = Backbone.sync;
Backbone.sync = function(method, model, options)
{
    options = options || {};


    options.headers = options.headers || {};

    let sessionManager = SessionManager.getInstance();
    _.extend(options.headers, { 'Authorization': 'Bearer ' + sessionManager.getAuthToken() });


    let url = _.isFunction(model.url) ? model.url() : model.url;
    options.url = API_BASE_URL + url;


    originalSync.call(model, method, model, options);
};

import Marionette from 'backbone.marionette';
import JWT from 'jwt-client';

const SessionManager = Marionette.Object.extend({

    getAuthToken()
    {
        return JWT.get();
    },

    isTokenValid()
    {
        return JWT.validate(JWT.get());
    },

    getSessionData()
    {
        let result = null;

        let data = JWT.remember();
        if (data)
        {
            result = data.claim;
        }

        return result;
    },

    keepAuthToken(token)
    {
        if (JWT.validate(token))
        {
            let isSessionChanged = (token != this.getAuthToken());

            JWT.keep(token);

            if (isSessionChanged)
            {
                this.triggerMethod(SessionManager.Events.SESSION_CHANGE, this.getSessionData());
            }
        }
        else
        {
            this.logout();
        }
    },

    logout()
    {
        let isSessionChanged = this.isTokenValid();

        JWT.forget();

        if (isSessionChanged)
        {
            this.triggerMethod(SessionManager.Events.SESSION_CHANGE, null);
        }
    },
});

SessionManager.Events = {
    SESSION_CHANGE: 'session:change'
};

SessionManager.instance = null;
SessionManager.getInstance = function ()
{
    if (!SessionManager.instance)
    {
        SessionManager.instance = new SessionManager();
    }

    return SessionManager.instance;
};

export default SessionManager;
import JWT from 'jwt-client';

const SessionManager = class {
    getAuthToken()
    {
        return JWT.get();
    }

    isTokenValid()
    {
        return JWT.validate(JWT.get());
    }

    getSessionData()
    {
        let result = null;

        let data = JWT.remember();
        if (data)
        {
            result = data.claim;
        }

        return result;
    }

    keepAuthToken(token)
    {
        if (JWT.validate(token))
        {
            JWT.keep(token);
        }
        else
        {
            this.logout();
        }
    }

    logout()
    {
        let isSessionChanged = this.isTokenValid();

        JWT.forget();

        return isSessionChanged;
    }
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
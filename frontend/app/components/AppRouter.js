import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import SessionManager from './services/SessionManager';
import User from './models/User';
import ApplicationView from './views/ApplicationView';


export default Marionette.AppRouter.extend({

    routes: {
        '': 'mainPage',
        'login': 'loginPage',
        'register': 'registrationPage',
        'profile': 'profilePage',
        'events': 'eventsPage',
        'event/create': 'createEventPage',
        'event/:id': 'eventPage',
        'event/:id/edit': 'editEventPage',
        'notfound': 'notFoundPage'
    },

    initialize(application, options)
    {
        this.application = application;
        this.applicationView = application.getView();
        Backbone.history.start();

        const session = SessionManager.getInstance();
        session.on(SessionManager.Events.SESSION_CHANGE, this.onUserSessionChangeHandler, this);
    },

    onUserSessionChangeHandler(userData)
    {
        if (!userData)
        {
            this.navigateWithTrigger('/login');
        }
    },

    navigateWithTrigger(route)
    {
        this.navigate(route, {trigger: true});
    },

    mainPage()
    {
        if (!SessionManager.getInstance().isTokenValid())
        {
            this.navigateWithTrigger('/login');
        }
        else
        {
            this.navigateWithTrigger('/profile');
        }
    },

    loginPage()
    {
        this.applicationView.off(ApplicationView.Events.USER_LOGIN_SUCCESS);

        const router = this;
        this.applicationView.on(ApplicationView.Events.USER_LOGIN_SUCCESS,
            function (result) {
                SessionManager.getInstance().keepAuthToken(result.token);
                router.navigateWithTrigger('/profile');
            },
            this);

        this.applicationView.showLogin();
    },

    registrationPage()
    {
        this.applicationView.showRegistration();
    },

    profilePage()
    {
        if (!SessionManager.getInstance().isTokenValid())
        {
            this.navigateWithTrigger('/login');
            return;
        }

        const self = this;

        let user = new User();
        user.fetch({
            success: function (model) {
                self.applicationView.showProfile(model);
            },
            error: function () {
                self.navigateWithTrigger('/login');
            }
        });
    },

    eventsPage()
    {
        this.applicationView.showEventList();
    },

    eventPage(id)
    {
        this.applicationView.showEvent(id);
    },

    createEventPage()
    {
        this.applicationView.showCreateEvent();
    },

    editEventPage(id)
    {
        this.applicationView.showEditEvent(id);
    },

    notFoundPage()
    {
        let error = {
            message: 'This is message for page not found page'
        };

        this.applicationView.showNotFound(error);
    }

});
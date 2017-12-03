import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import SessionManager from './services/SessionManager';
import User from './models/User';
import Event from './models/Event';
import ApplicationView from './views/ApplicationView';

const MAIN_PAGE_ROUTE = '';
const LOGIN_ROUTE = 'login';
const REGISTER_ROUTE = 'register';
const PROFILE_ROUTE = 'profile';
const EVENTS_ROUTE = 'events(/page:page)(/date:date)';
const EVENT_CREATE_ROUTE = 'event/create';
const EVENT_DETAILS_ROUTE = 'event/:id';
const EVENT_EDIT_ROUTE = 'event/:id/edit';
const NOT_FOUND_ROUTE = 'notfound';

const LOGIN_ROUTE_NAME = 'loginPage';
const REGISTER_ROUTE_NAME = 'registrationPage';


const AppRouter = Marionette.AppRouter.extend({

    routes: {
        '': 'mainPage',
        'login': 'loginPage',
        'register': 'registrationPage',
        'profile': 'profilePage',
        'events(/page:page)(/date:date)': 'eventsPage',
        'event/create': 'createEventPage',
        'event/:id': 'eventPage',
        'event/:id/edit': 'editEventPage',
        'notfound': 'notFoundPage'
    },

    init(application)
    {
        this.application = application;
        this.applicationView = application.getView();
        Backbone.history.start();

        const session = SessionManager.getInstance();
        session.on(SessionManager.Events.SESSION_CHANGE, this.onUserSessionChangeHandler, this);
    },

    onRoute(name, path, args) {
        if ((name !== LOGIN_ROUTE_NAME) && (name !== REGISTER_ROUTE_NAME))
        {
            this.checkAuth();
        }
    },

    generatePath(name, params)
    {
        let result = name;
        params = params || {};

        let parametersInPatternExpression = new RegExp("\:([a-z]+)", 'g');
        let parametersInPattern = result.match(parametersInPatternExpression);

        result = result.replace(new RegExp('\\(', 'g'), '');
        result = result.replace(new RegExp('\\)', 'g'), '');


        for (let i = 0; i < parametersInPattern.length; i++)
        {
            let parameter = parametersInPattern[i].substr(1);
            let value = params[parameter] ? params[parameter] : 'null';

            result = result.replace(':' + parameter, value);
        }

        return result;
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

    checkAuth()
    {
        if (!SessionManager.getInstance().isTokenValid())
        {
            this.navigateWithTrigger('/login');
        }
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
        this.applicationView.off(ApplicationView.Events.USER_REGISTER_SUCCESS);

        const router = this;
        this.applicationView.on(ApplicationView.Events.USER_REGISTER_SUCCESS, function(result) {
            SessionManager.getInstance().keepAuthToken(result.token);
            router.navigateWithTrigger('/profile');
        },
        this);

        this.applicationView.showRegistration();
    },

    profilePage()
    {
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

    eventsPage(page, date)
    {
        let currentPage = page || 1;
        let selectedDate = null;

        if (date)
        {
            selectedDate = isNaN(Date.parse(date)) ? null : (new Date(date));
        }

        this.applicationView.showEventList(currentPage, selectedDate);
    },

    eventPage(id)
    {
        const router = this;

        let event = new Event({id: id});
        event.fetch({
            success: function (model) {
                router.applicationView.showEvent(model);
            },
            error: function (response) {
                router.navigateWithTrigger('notfound');
            }
        });
    },

    createEventPage()
    {
        this.applicationView.off(ApplicationView.Events.EVENT_CREATED_SUCCESS);

        const self = this;
        this.applicationView.on(ApplicationView.Events.EVENT_CREATED_SUCCESS, function(model) {
            self.navigateWithTrigger(self.generatePath(AppRouter.Routes.EVENT_DETAILS, {id: model.get('id')}));
        });

        this.applicationView.showCreateEvent();
    },

    editEventPage(id)
    {
        const router = this;

        let event = new Event({id: id});
        event.fetch({
            success: function (model) {

                router.applicationView.showEditEvent(model);

                router.applicationView.on(ApplicationView.Events.EVENT_EDITED_SUCCESS, function(model) {
                    router.navigateWithTrigger(router.generatePath(AppRouter.Routes.EVENT_DETAILS, {id: model.get('id')}));
                });
            },
            error: function (response) {
                router.navigateWithTrigger('notfound');
            }
        });
    },

    notFoundPage()
    {
        let error = {
            message: 'This is message for page not found page'
        };

        this.applicationView.showNotFound(error);
    }

});

AppRouter.instance = null;

AppRouter.getInstance = function () {

    if (!AppRouter.instance)
    {
        AppRouter.instance = new AppRouter();
    }

    return AppRouter.instance;
};

AppRouter.Routes = {
    MAIN_PAGE: MAIN_PAGE_ROUTE,
    LOGIN: LOGIN_ROUTE,
    REGISTER: REGISTER_ROUTE,
    PROFILE: PROFILE_ROUTE,
    EVENTS: EVENTS_ROUTE,
    EVENT_CREATE: EVENT_CREATE_ROUTE,
    EVENT_DETAILS: EVENT_DETAILS_ROUTE,
    EVENT_EDIT: EVENT_EDIT_ROUTE,
    NOT_FOUND: NOT_FOUND_ROUTE
};



export default AppRouter;
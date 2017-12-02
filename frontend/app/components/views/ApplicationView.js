import Marionette from 'backbone.marionette';
import HeaderView from './components/HeaderView';
import LoginView from './pages/LoginView';
import RegistrationView from './pages/RegistrationView';
import ProfileView from './pages/ProfileView';
import EventListView from './pages/EventListView';
import EventDetailsView from './pages/EventDetailsView';
import CreateEventView from './pages/CreateEventView';
import EditEventView from './pages/EditEventView';
import NotFoundView from './pages/NotFoundPageView';
import SessionManager from '../services/SessionManager';



import template from '../../templates/application.jst';

const ApplicationView = Marionette.View.extend({
    template: template,

    regions: {
        'header': '#header-container',
        'content': '#content-container'
    },

    initialize() {
        const session = SessionManager.getInstance();
        session.on(SessionManager.Events.SESSION_CHANGE, this.updateHeaderState, this);
    },


    onRender()
    {
        this.showChildView('header', new HeaderView());

        const session = SessionManager.getInstance();
        this.updateHeaderState(session.getSessionData());
    },

    updateHeaderState(userData)
    {
        let headerView = this.getChildView('header');
        headerView.updateUserState(userData);
    },

    onChildviewUserLogout() {
        const session = SessionManager.getInstance();
        session.logout();
    },

    updateContentView(view)
    {
        this.getRegion('content').empty();
        this.showChildView('content', view);
    },

    showLogin()
    {
        let loginView = new LoginView();

        const self = this;
        this.listenTo(loginView, LoginView.Events.LOGIN_SUCCESS, function (result) {
            self.triggerMethod(ApplicationView.Events.USER_LOGIN_SUCCESS, result);
        });

        this.updateContentView(loginView);
    },

    showRegistration()
    {
        let registerView = new RegistrationView();

        const self = this;
        this.listenTo(registerView, RegistrationView.Events.REGISTER_SUCCESS, function(result) {
            self.triggerMethod(ApplicationView.Events.USER_REGISTER_SUCCESS, result);
        });

        this.updateContentView(registerView);
    },

    showProfile(user)
    {
        this.updateContentView(new ProfileView({user: user}));
    },

    showEventList()
    {
        this.updateContentView(new EventListView());
    },

    showEvent(id)
    {
        this.updateContentView(new EventDetailsView({id: id}))
    },

    showCreateEvent()
    {
        let view = new CreateEventView();

        const self = this;
        this.listenTo(view, CreateEventView.Events.EVENT_CREATED_SUCCESS, function(model) {
            self.triggerMethod(ApplicationView.Events.EVENT_CREATED_SUCCESS, model);
        });

        this.updateContentView(view);
    },

    showEditEvent(id)
    {
        this.updateContentView(new EditEventView({id: id}));
    },

    showNotFound(error)
    {
        this.updateContentView(new NotFoundView({error: error}));
    }
});

ApplicationView.Events = {
    USER_LOGIN_SUCCESS: 'user:login:success',
    USER_REGISTER_SUCCESS: 'user:register:success',
    EVENT_CREATED_SUCCESS: 'event:create:success'
};

export default ApplicationView;
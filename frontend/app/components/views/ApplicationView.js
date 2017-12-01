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

        let self = this;
        this.listenTo(loginView, LoginView.Events.LOGIN_SUCCESS, function (result) {
            self.triggerMethod(ApplicationView.Events.USER_LOGIN_SUCCESS, result);
        });

        this.updateContentView(loginView);
    },

    showRegistration()
    {
        this.updateContentView(new RegistrationView());
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
        this.updateContentView(new CreateEventView());
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
    USER_LOGIN_SUCCESS: 'user:login:success'
};

export default ApplicationView;
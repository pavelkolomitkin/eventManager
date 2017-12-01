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



import template from '../../templates/application.jst';

export default Marionette.View.extend({
    template: template,

    regions: {
        'header': '#header-container',
        'content': '#content-container'
    },

    onRender()
    {
        this.showChildView('header', new HeaderView());
    },

    updateContentView(view)
    {
        this.getRegion('content').empty();
        this.showChildView('content', view);
    },

    showLogin()
    {
        this.updateContentView(new LoginView());
    },

    showRegistration()
    {
        this.updateContentView(new RegistrationView());
    },

    showProfile()
    {
        this.updateContentView(new ProfileView());
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
import Marionette from 'backbone.marionette';
import AppRouter from './AppRouter';
import ApplicationView from './views/ApplicationView';

export default Marionette.Application.extend({
    region: '#app',

    onStart() {
        this.showView(new ApplicationView());

        this.router = new AppRouter(this, {});
    },

    /**
     * Call when is
     */
    showLoadingProgress()
    {

    },

    showLoginPage()
    {
        this.getView().showLogin();
    },

    showRegistrationPage()
    {
        this.getView().showRegistration();
    },

    showProfilePage()
    {
        this.getView().showProfile();
    },

    showEventsPage()
    {
        this.getView().showEventList();
    },

    showEventPage(id)
    {
        this.getView().showEvent(id);
    },

    showCreateEventPage()
    {
        this.getView().showCreateEvent();
    },

    showEditEventPage(id)
    {
        this.getView().showEditEvent(id);
    },

    showNotFoundPage(error)
    {
        this.getView().showNotFound(error);
    }
});

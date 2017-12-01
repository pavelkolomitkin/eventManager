import Marionette from 'backbone.marionette';
import Backbone from 'backbone';

export default Marionette.AppRouter.extend({

    routes: {
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
        Backbone.history.start();
    },

    loginPage()
    {
        console.log('Show login page');
        this.application.showLoginPage();
    },

    registrationPage()
    {
        console.log('Show registration page');
        this.application.showRegistrationPage();
    },

    profilePage()
    {
        // инициализируем модель и запрашиваем с сервера
            // при успешном ответе отобразить страницу с профилем
            // в случае возникновении ошибки авторизации перенаправить на страницу авторизации
            // в случае непредвиденной ошибки отобразить специальную страницу

        this.application.showProfilePage();
    },

    eventsPage()
    {
        this.application.showEventsPage();
    },

    eventPage(id)
    {
        this.application.showEventPage(id);
    },

    createEventPage()
    {
        this.application.showCreateEventPage();
    },

    editEventPage(id)
    {
        this.application.showEditEventPage(id);
    },

    notFoundPage()
    {
        let error = {
            message: 'This is message for page not found page'
        };

        this.application.showNotFoundPage(error);
    }

});
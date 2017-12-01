import Marionette from 'backbone.marionette';
import AppRouter from './AppRouter';
import ApplicationView from './views/ApplicationView';

export default Marionette.Application.extend({
    region: '#app',

    onStart() {
        this.showView(new ApplicationView());

        this.router = new AppRouter(this, {});
    }
});

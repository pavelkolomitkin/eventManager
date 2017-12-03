import Marionette from 'backbone.marionette';
import AppRouter from '../../AppRouter';

import template from '../../../templates/components/eventPager.jst';

export default Marionette.View.extend({
    template: template,

    serializeData: function ()
    {
        let countPages = Math.ceil(this.collection.state.totalRecords / this.collection.state.pageSize);
        let router = AppRouter.getInstance();
        let eventRouterName = AppRouter.Routes.EVENTS;

        return {
            page: this.options.page ? this.options.page : 1,
            countPages: countPages,
            router: router,
            routeName: eventRouterName,
            selectedDate: (this.options.selectedDate ? this.options.selectedDate.toLocaleDateString('sv-SE') : null)
        }
    }
});

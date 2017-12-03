import ContentView from './ContentView';
import EventListFilterView from '../components/EventListFilterView';
import EventListView from '../components/EventListView';
import AppRouter from '../../AppRouter';

import template from '../../../templates/pages/eventList.jst';

export default ContentView.extend({
    template: template,

    regions: {
        'filter': {
            el: '#event-filter-container',
            replaceElement: true
        },
        'list': {
            el: '#event-list-container',
            replaceElement: true
        }
    },

    onRender()
    {
        let filterView = new EventListFilterView({
            date: this.options.date
        });
        let eventListView = new EventListView({
                page: this.options.page ? this.options.page : 1,
                date: this.options.date
            }
        );

        this.showChildView('filter', filterView);
        this.showChildView('list', eventListView);

        const router = AppRouter.getInstance();
        this.listenTo(filterView, EventListFilterView.Events.DATE_CHAGED, function (date) {

            router.navigateWithTrigger(router.generatePath(AppRouter.Routes.EVENTS, {
                date: (date ? date.toLocaleDateString('sv-SE') : null),
                page: 1
            }))

        });
    }
});
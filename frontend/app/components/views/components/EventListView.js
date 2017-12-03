import Marionette from 'backbone.marionette';
import EventItemsView from './EventItemsView';
import EventPagerView from './EventPagerView';
import EventPaginatableCollection from '../../collections/EventPaginatableCollection';

import template from '../../../templates/components/eventList.jst';

export default Marionette.View.extend({
    template: template,
    className: 'event-list',

    regions: {
        'eventItems': '#event-list-container',
        'eventPages': '#event-pages-container'
    },

    initialize(options)
    {
        this.events = new EventPaginatableCollection({
            page: options.page,
            date: options.date ? options.date.toLocaleDateString() : null
        });
    },

    onRender()
    {
        const self = this;

        this.events.fetch({
            success: function () {
                let itemsView = new EventItemsView({collection: self.events, sort: false});
                let pagerView = new EventPagerView({
                    collection: self.events,
                    selectedDate: self.options.date,
                    page: self.options.page
                });


                self.showChildView('eventItems', itemsView);
                self.showChildView('eventPages', pagerView);
            }
        });
    },

    setDate(date)
    {
        if (this.date !== date)
        {
            this.date = date;
            this.page = 1;

            this.updateList();
        }
    },

    updateList()
    {

    }
});
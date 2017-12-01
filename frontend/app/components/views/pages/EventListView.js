import EventList from '../../collections/EventCollection';
import Event from '../../models/Event';

import ContentView from './ContentView';
import EventListFilterView from '../components/EventListFilterView';
import EventListView from '../components/EventListView';

import template from '../../../templates/pages/eventList.jst';

export default ContentView.extend({
    template: template,

    regions: {
        'filter': '#event-filter-container',
        'list': '#event-list-container'
    },

    initialize()
    {
        this.events = new EventList([
            new Event({title: 'Hello', description: 'First event', timeStart: new Date('2017-05-12 15:30'), timeEnd: new Date('2017-05-12 16:30') }),
            new Event({title: 'New Event', description: 'Go to the school', timeStart: new Date('2017-05-13 14:30'), timeEnd: new Date('2017-05-13 16:30') }),
            new Event({title: 'New Event', description: 'Go to the school', timeStart: new Date('2017-05-13 14:30'), timeEnd: new Date('2017-05-13 16:30') }),
            new Event({title: 'New Event', description: 'Go to the school', timeStart: new Date('2017-05-13 14:30'), timeEnd: new Date('2017-05-13 16:30') }),
            new Event({title: 'New Event', description: 'Go to the school', timeStart: new Date('2017-05-13 14:30'), timeEnd: new Date('2017-05-13 16:30') }),
            new Event({title: 'New Event', description: 'Go to the school', timeStart: new Date('2017-05-13 14:30'), timeEnd: new Date('2017-05-13 16:30') }),
            new Event({title: 'New Event', description: 'Go to the school', timeStart: new Date('2017-05-13 14:30'), timeEnd: new Date('2017-05-13 16:30') }),
            new Event({title: 'New Event', description: 'Go to the school', timeStart: new Date('2017-05-13 14:30'), timeEnd: new Date('2017-05-13 16:30') }),
            new Event({title: 'New Event', description: 'Go to the school', timeStart: new Date('2017-05-13 14:30'), timeEnd: new Date('2017-05-13 16:30') }),
            new Event({title: 'New Event', description: 'Go to the school', timeStart: new Date('2017-05-13 14:30'), timeEnd: new Date('2017-05-13 16:30') }),
            new Event({title: 'New Event', description: 'Go to the school', timeStart: new Date('2017-05-13 14:30'), timeEnd: new Date('2017-05-13 16:30') }),
            new Event({title: 'New Event', description: 'Go to the school', timeStart: new Date('2017-05-13 14:30'), timeEnd: new Date('2017-05-13 16:30') }),
            new Event({title: 'New Event', description: 'Go to the school', timeStart: new Date('2017-05-13 14:30'), timeEnd: new Date('2017-05-13 16:30') }),
            new Event({title: 'New Event', description: 'Go to the school', timeStart: new Date('2017-05-13 14:30'), timeEnd: new Date('2017-05-13 16:30') })
        ]);
    },

    onRender()
    {
        this.showChildView('filter', new EventListFilterView());
        this.showChildView('list', new EventListView({collection: this.events}));
    }
});
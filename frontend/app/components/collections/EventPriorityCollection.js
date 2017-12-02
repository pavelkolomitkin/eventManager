import Backbone from 'backbone';
import EventPriority from '../models/EventPriority';

export default Backbone.Collection.extend({
    url: '/priority/list',
    model: EventPriority
});

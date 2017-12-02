import Backbone from 'backbone';
import EventStatus from '../models/EventStatus';

export default Backbone.Collection.extend({
    url: '/status/list',
    model: EventStatus
});

import Marionette from 'backbone.marionette';
import EventPriority from '../../models/EventPriority';

export default Marionette.View.extend({

    model: EventPriority,

    template: _.template('<%- title %>'),

    tagName: 'option',

    attributes: function () {
        return {
            'value': this.model.get('id')
        };
    }

});

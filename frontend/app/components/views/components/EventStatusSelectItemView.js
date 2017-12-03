import Marionette from 'backbone.marionette';
import EventStatus from '../../models/EventStatus';

export default Marionette.View.extend({

    model: EventStatus,

    template: _.template('<%- title %>'),

    tagName: 'option',

    attributes: function () {

        let result = {
            'value': this.model.get('id')
        };

        if (this.options.selected)
        {
            result['selected'] = 'selected';
        }

        return result;
    }

});

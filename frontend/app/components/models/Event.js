import Backbone from 'backbone';

export default Backbone.Model.extend({
    url: '/event',
    defaults: {
        title: '',
        description: '',
        timeStart: '',
        timeEnd: ''
    },
    parse: function (data)
    {
        if (_.isObject(data.event))
        {
            return data.event;
        }

        return data;
    }
});
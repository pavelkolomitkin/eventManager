import Backbone from 'backbone';

export default Backbone.Model.extend({
    urlRoot: '/event',
    defaults: {
        title: '',
        description: '',
        timeStart: '',
        timeEnd: ''
    },
    parse: function (data)
    {
        let result = data;

        if (_.isObject(result.event)) {
            result = result.event;
        }

        result = this.prepareDateFields(result);

        return result;
    },

    prepareDateFields(attributes)
    {
        let dateFields = ['timeStart', 'timeEnd'];

        for (let field of dateFields)
        {
            if (attributes[field].constructor !== Date.constructor)
            {
                attributes[field] = new Date(attributes[field] * 1000);
            }
        }

        return attributes;
    }
});
import Backbone from 'backbone';

export default Backbone.Model.extend({
    defaults: {
        title: '',
        value: 0,
        code: ''
    }
});

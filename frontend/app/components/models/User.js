import Backbone from 'backbone';

export default Backbone.Model.extend({
    url: '/profile',
    defaults: {
        id: 0,
        username: '',
        email: ''
    }
});
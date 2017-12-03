import Backbone from 'backbone';
import BackbonePaginator from 'backbone.paginator';
import Event from '../models/Event';

export default BackbonePaginator.extend({

    model: Event,

    url: '/event/list',

    initialize(options) {
        this.state.currentPage = options.page;
        this.date = options.date;
    },

    queryParams: {
        pageSize: null,
        currentPage: 'page',
        date: function () {
            return this.date;
        },

    },

    parse: function (response)
    {
        this.state.totalRecords = response.total;
        return response.events;
    }
});
import Marionette from 'backbone.marionette';
import EventStatusCollection from '../../collections/EventStatusCollection';
import EventStatusSelectItemView from './EventStatusSelectItemView';

export default Marionette.CollectionView.extend({
    template: _.noop,
    collection: EventStatusCollection,
    tagName: 'select',
    className: 'form-control',

    initialize(options)
    {
        this.selectedId = options.selectedId ? options.selectedId : 0;

        this.collection = new EventStatusCollection();
        this.collection.fetch();
    },

    childViewOptions(model, index)
    {
        return {
            selected: (model.get('id') === this.selectedId)
        };
    },

    childView: EventStatusSelectItemView
});

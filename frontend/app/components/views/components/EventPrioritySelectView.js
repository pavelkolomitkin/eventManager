import Marionette from 'backbone.marionette';
import EventPriorityCollection from '../../collections/EventPriorityCollection';
import EventPrioritySelectItemView from './EventPrioritySelectItemView';


export default Marionette.CollectionView.extend({
    template: _.noop,
    collection: EventPriorityCollection,
    tagName: 'select',
    className: 'form-control',

    initialize(options)
    {
        this.selectedId = options.selectedId ? options.selectedId : 0;

        this.collection = new EventPriorityCollection();
        this.collection.fetch();
    },

    childView: EventPrioritySelectItemView
});

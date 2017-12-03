import Marionette from 'backbone.marionette';
import EventPaginatableCollection from '../../collections/EventPaginatableCollection';
import EventItemView from './EventItemView';
import EmptyEventListView from './EmptyEventListView';
import template from '../../../templates/components/eventItems.jst';

export default Marionette.CollectionView.extend({

    collection: EventPaginatableCollection,

    template: template,

    childView: EventItemView,

    emptyView: EmptyEventListView

});

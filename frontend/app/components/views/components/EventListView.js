import Marionette from 'backbone.marionette';
import EventItemView from '../components/EventItemView';

export default Marionette.CollectionView.extend({
    template: _.noop,
    className: 'event-list',
    childView: EventItemView
});
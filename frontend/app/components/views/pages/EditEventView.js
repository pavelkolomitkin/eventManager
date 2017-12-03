import ContentView from './ContentView';
import Event from '../../models/Event';
import template from '../../../templates/pages/editEvent.jst';

export default ContentView.extend({
    model: Event,
    template: template
});
import ContentView from './ContentView';
import template from '../../../templates/pages/notFoundPage.jst';

export default ContentView.extend({
    template: template,
    serializeData()
    {
        return this.options.error;
    }
});
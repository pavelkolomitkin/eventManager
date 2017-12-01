import ContentView from './ContentView';
import template from '../../../templates/pages/profileView.jst';

export default ContentView.extend({
    template: template,
    initialize(options)
    {
        this.model = options.user;
    }
});

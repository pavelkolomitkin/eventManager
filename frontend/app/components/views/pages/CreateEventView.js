import ContentView from './ContentView';
import template from '../../../templates/pages/createEvent.jst';

export default ContentView.extend({
    template: template,

    initialize()
    {

    },

    onDomRefresh()
    {
        this.$('#dateTimeStart').datetimepicker();
        this.$('#dateTimeEnd').datetimepicker();
    }
});
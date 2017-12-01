import ContentView from './ContentView';
import Event from '../../models/Event';
import template from '../../../templates/pages/editEvent.jst';

export default ContentView.extend({
    model: Event,
    template: template,
    initialize(options)
    {
        this.model = new Event({
            id: 12,
            title: 'Hello event',
            description: 'О прекращении телевещания канала в связи со сменой формата в конце ноября объявила Национальная ассоциация телевещателей (НАТ). Как сообщалось на сайте "Царьграда", планируется продолжить вещание в интернете.',
            timeStart: new Date('2017-05-13 14:30'),
            timeEnd: new Date('2017-05-13 16:30')
        });
    }
});
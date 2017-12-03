import ContentView from './ContentView';
import Event from '../../models/Event';
import template from '../../../templates/pages/eventDetails.jst';
import AppRouter from '../../AppRouter';

export default ContentView.extend({
    model: Event,
    template: template,
    triggers: {
        'click #delete-button': 'delete:event'
    },

    onDeleteEvent()
    {
        if (confirm('Вы действительно хотите удалить событие?'))
        {
            this.model.destroy({
                success: function(model, response){
                    const router = AppRouter.getInstance();
                    router.navigateWithTrigger(router.generatePath(AppRouter.Routes.EVENTS));
                },
                error: function(model, response){
                    alert('Ошибка удаления события!');

                    const router = AppRouter.getInstance();
                    router.navigateWithTrigger(router.generatePath(AppRouter.Routes.EVENTS));
                }
            })
        }
    }

});
import ContentView from './ContentView';
import template from '../../../templates/pages/createEvent.jst';
import EventPrioritySelectView from '../components/EventPrioritySelectView';
import Event from '../../models/Event';

const CreateEventView = ContentView.extend({
    template: template,

    ui: {
        'form': 'form',
        'title': 'input[name="title"]',
        'description': 'textarea[name="description"]',
        'dateTimeStart': '#dateTimeStartInput',
        'dateTimeEnd': '#dateTimeEndInput'
    },

    triggers: {
        'submit @ui.form': 'form:submit'
    },

    regions: {
        'priorities': {
            el: '#event-priority-region',
            replaceElement: true
        }
    },

    initialize()
    {

    },

    onRender()
    {
        this.showChildView('priorities', new EventPrioritySelectView())
    },

    onDomRefresh()
    {
        this.$('#dateTimeStart').datetimepicker({
            date: new Date()
        });
        this.$('#dateTimeEnd').datetimepicker({
            date: new Date()
        });
    },

    onFormSubmit()
    {
        this.hideErrors();

        const title = this.ui.title.val();
        const description = this.ui.description.val();
        const timeStart = this.ui.dateTimeStart.val();
        const timeEnd = this.ui.dateTimeEnd.val();
        const priority = this.getChildView('priorities').$el.val();

        let event = new Event({
            title: title,
            description: description,
            timeStart: timeStart,
            timeEnd: timeEnd,
            priority: priority
        });

        const self = this;
        event.save(null, {
            success: function (model, response) {
                self.triggerMethod(CreateEventView.Events.EVENT_CREATED_SUCCESS, model);
            },
            error: function (model, response) {
                self.showErrors(response.responseJSON.children);
            }
        });
    },

    showErrors(errors)
    {
        for (var field in errors)
        {
            if (errors[field].errors && (errors[field].errors.length > 0))
            {
                this.$('#' + field + '-error').html(errors[field].errors[0]).show();
            }
        }
    },

    hideErrors()
    {
        this.$('.form-error').hide();
    }
});

CreateEventView.Events = {
    EVENT_CREATED_SUCCESS: 'event:created:success'
};


export default CreateEventView;
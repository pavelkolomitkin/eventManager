import ContentView from './ContentView';
import Event from '../../models/Event';
import EventPrioritySelectView from '../components/EventPrioritySelectView';
import EventStatusSelectView from '../components/EventStatusSelectView';
import template from '../../../templates/pages/editEvent.jst';

const EditEventView = ContentView.extend({
    model: Event,
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
        },
        'statuses': {
            el: '#event-status-region',
            replaceElement: true
        }
    },

    onRender()
    {
        this.showChildView('priorities', new EventPrioritySelectView({selectedId: this.model.get('priority').id}));
        this.showChildView('statuses', new EventStatusSelectView({selectedId: this.model.get('status').id}));
    },


    onDomRefresh()
    {
        this.$('#dateTimeStart').datetimepicker({
            date: this.model.get('timeStart')
        });
        this.$('#dateTimeEnd').datetimepicker({
            date: this.model.get('timeEnd')
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
        const status = this.getChildView('statuses').$el.val();

        this.model.set({
            title: title,
            description: description,
            timeStart: timeStart,
            timeEnd: timeEnd,
            priority: priority,
            status: status
        });

        const self = this;
        this.model.save(null, {
            success: function (model, response) {
                self.triggerMethod(EditEventView.Events.EVENT_EDITED_SUCCESS, model);
            },
            error: function (model, response) {
                self.showErrors(response.responseJSON.children);
            }
        });
    },

    showErrors(errors)
    {
        for (const field in errors)
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

EditEventView.Events = {
    EVENT_EDITED_SUCCESS: 'event:edited:success'
};

export default EditEventView;
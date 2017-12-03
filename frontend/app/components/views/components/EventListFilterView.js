import Marionette from 'backbone.marionette';
import template from '../../../templates/components/eventFilterList.jst'

const EventListFilterView = Marionette.View.extend({
    template: template,

    className: 'container',

    initialize(options) {
        this.selectedDate = options.date;
    },

    serializeData: function () {
        return {
            date: this.selectedDate
        };
    },

    ui: {
        'allTimeFlag': '#for-all-time',
        'datePicker': '#datePicker'
    },

    triggers: {
        'change @ui.allTimeFlag': 'allTimeFlag:change'
    },

    onAllTimeFlagChange()
    {
        let datePicker = this.ui.datePicker.data("DateTimePicker");

        if (!this.isForAllTimeChecked())
        {
            this.selectedDate = this.selectedDate ? this.selectedDate : new Date();

            datePicker.enable();
            datePicker.date(this.selectedDate);
            this.triggerMethod(EventListFilterView.Events.DATE_CHAGED, this.selectedDate);
        }
        else
        {
            datePicker.disable();
            this.triggerMethod(EventListFilterView.Events.DATE_CHAGED, null);
        }
    },

    onDomRefresh()
    {
        this.ui.datePicker.datetimepicker({
            date: this.selectedDate,
            format: 'YYYY-MM-DD'
        });

        const self = this;
        this.ui.datePicker.on('dp.change', function (event) {
            self.selectedDate = event.date.toDate();
            if (!self.isForAllTimeChecked()) {
                self.triggerMethod(EventListFilterView.Events.DATE_CHAGED, self.selectedDate);
            }
        });
    },

    isForAllTimeChecked()
    {
        if (!this.ui.allTimeFlag.is)
        {
            return false;
        }

        return this.ui.allTimeFlag.is(':checked');
    },

    getSelectedDate()
    {
        let result = null;

        if (!this.isForAllTimeChecked()) {
            result = this.selectedDate;
        }

        return result;
    }
});

EventListFilterView.Events = {
    DATE_CHAGED: 'date:changed'
};

export default EventListFilterView;
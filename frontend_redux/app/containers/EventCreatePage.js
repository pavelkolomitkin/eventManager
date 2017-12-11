import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import EventCreatePageView from '../components/EventCreatePage';
import FormPage from './FormPage';
import * as priorityActions from '../actions/priorityActions';
import * as eventActions from '../actions/eventActions';
import moment from 'moment';

class EventCreatePage extends FormPage {
    constructor(props, context) {
        super(props, context);

        this.state = {
            title: '',
            description: '',
            priorityOptions: [],
            timeStart: moment().format('DD.MM.YYYY h:mm a'),
            timeEnd: moment().format('DD.MM.YYYY h:mm a'),
            priority: 0
        };

        this.onPriorityChange = this.onPriorityChange.bind(this);
        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onEndDateChange = this.onEndDateChange.bind(this);

        this.props.priorityActions.loadPriorities();
    }

    onPriorityChange(priorityId)
    {
        let state = this.state;
        state.priority = priorityId;

        this.setState(state);
    }

    onStartDateChange(date)
    {
        let state = this.state;
        state.timeStart = date;

        this.setState(state);
    }

    onEndDateChange(date)
    {
        let state = this.state;
        state.timeEnd = date;

        this.setState(state);
    }

    submitHandler(event)
    {
        this.props.eventActions.createEvent(
            this.state.title,
            this.state.description,
            this.state.timeStart,
            this.state.timeEnd,
            this.state.priority,
            (event) => {
                this.props.history.push('/event/' + event.id);
            }
        );
    }

    render() {

        return (
            <EventCreatePageView
                onChange={this.onFieldChange}
                onPriorityChange={this.onPriorityChange}
                onStartDateChange={this.onStartDateChange}
                onEndDateChange={this.onEndDateChange}
                onSubmit={this.onSubmit}
                errors={this.props.errors}
                priorityOptions={this.props.priorityOptions}
                titleValue={this.state.title}
                descriptionValue={this.state.description}
                timeStartValue={this.state.timeStart}
                timeEndValue={this.state.timeEnd}
                priorityValue={this.state.priority}
            />
        );
    }
}

EventCreatePage.propTypes = {};

function mapStateToProps(state, ownProps)
{
    let priorityOptions = state.priorities.map((priority, index) => {
            return {
                value: priority.id,
                label: priority.title
            }
        });

    return {
        priorityOptions: priorityOptions,
        errors: state.events.eventCreateErrors ? state.events.eventCreateErrors : {}
    }
}

function mapDispatchToProps(dispatch) {
    return {
        priorityActions: bindActionCreators(priorityActions, dispatch),
        eventActions: bindActionCreators(eventActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCreatePage);
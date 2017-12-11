import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import EventEditPageView from '../components/EventEditPage';
import FormPage from './FormPage';
import moment from 'moment';

import * as priorityActions from '../actions/priorityActions';
import * as statusActions from '../actions/statusActions';
import * as eventActions from '../actions/eventActions';


class EventEditPage extends FormPage {
    constructor(props, context) {
        super(props, context);

        this.state = {
            title: '',
            description: '',
            priorityOptions: [],
            timeStart: '',
            timeEnd: '',
            priority: 0,
            status: 0,
            eventLoaded: false
        };

        this.onPriorityChange = this.onPriorityChange.bind(this);
        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onEndDateChange = this.onEndDateChange.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);

        this.props.priorityActions.loadPriorities();
        this.props.statusActions.loadStatuses();

        this.props.eventActions.loadEvent(
            this.props.id,
            (event) => {
                this.updateStateFromEvent(event);
            },
            (error) => {
                this.props.history.push('/notfound');
            });
    }

    updateStateFromEvent(event)
    {
        let state = this.state;

        state.eventLoaded = true;

        state.title = event.title;
        state.description = event.description;
        state.timeStart = moment(event.timeStart).format('DD.MM.YYYY h:mm a');
        state.timeEnd = moment(event.timeEnd).format('DD.MM.YYYY h:mm a');
        state.priority = event.priority.id;
        state.status = event.status.id;


        this.setState(state);
    }

    onPriorityChange(priorityId)
    {
        let state = this.state;
        state.priority = priorityId;

        this.setState(state);
    }

    onStatusChange(statusId)
    {
        let state = this.state;
        state.status = statusId;

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
        this.props.eventActions.updateEvent(
            this.props.id,
            this.state.title,
            this.state.description,
            this.state.timeStart,
            this.state.timeEnd,
            this.state.priority,
            this.state.status,
            (event) => {
                this.props.history.push('/event/' + event.id);
            }
        );
    }

    render() {
        return (
            <EventEditPageView
                eventLoaded={this.state.eventLoaded}
                statusOptions={this.props.statusOptions}
                errors={this.props.errors}
                priorityValue={this.state.priority}
                statusValue={this.state.status}
                timeEndValue={this.state.timeEnd}
                timeStartValue={this.state.timeStart}
                descriptionValue={this.state.description}
                titleValue={this.state.title}
                onSubmit={this.onSubmit}
                onEndDateChange={this.onEndDateChange}
                onStartDateChange={this.onStartDateChange}
                onStatusChange={this.onStatusChange}
                priorityOptions={this.props.priorityOptions}
                onPriorityChange={this.onPriorityChange}
                onChange={this.onFieldChange}

            />
        );
    }
}

EventEditPage.propTypes = {};

function mapStateToProps(state, ownProps) {

    let priorityOptions = state.priorities.map((priority, index) => {
        return {
            value: priority.id,
            label: priority.title
        }
    });
//    debugger;

    let statusOptions = state.statuses.map((status, index) => {
        return {
            value: status.id,
            label: status.title
        };
    });

    return {
        priorityOptions: priorityOptions,
        statusOptions: statusOptions,
        errors: state.events.eventUpdateErrors ? state.events.eventUpdateErrors : {},
        id: ownProps.match.params.id
    }
}

function mapDispatchToProps(dispatch) {
    return {
        priorityActions: bindActionCreators(priorityActions, dispatch),
        statusActions: bindActionCreators(statusActions, dispatch),
        eventActions: bindActionCreators(eventActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditPage);
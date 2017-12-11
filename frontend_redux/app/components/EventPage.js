import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

const EventPage = ({event, onDelete}) => {
    return (
        <div>
            <div className="jumbotron">
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <p>
                    <span className="text-muted">From {event.timeStart && event.timeStart.toString()} till {event.timeEnd && event.timeEnd.toString() }</span>
                </p>
            </div>
            <p className="alert alert-info">Status: { event.status && event.status.title }</p>
            <p className="alert alert-info">Priority: { event.priority && event.priority.title }</p>
            <div>
                <Link className="btn btn-primary" to={`/event/${event.id}/edit`}>Edit</Link>
                <span id="delete-button" className="btn btn-danger" onClick={onDelete}>Delete</span>
            </div>

        </div>
    );
}

EventPage.propTypes = {
    event: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default EventPage;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';


const EventListItem = ({event}) => {
    return (
        <div className="event-item">
            <h2><Link to={`/event/${event.id}`}>{event.title}</Link></h2>
            <div className="event-item-description text">{event.description}</div>
            <div className="text-muted"><b>From</b>{event.timeStart.toString()} <b>Till</b> <Moment date={ event.timeEnd.toString() } /></div>
            <div>
                <span>Status: </span><kbd className="bg-primary">{ event.status.title }</kbd>&nbsp;&nbsp;
                <span>Priority: </span><kbd>{ event.priority.title } </kbd>
            </div>
        </div>
    );
}

EventListItem.propTypes = {
    event: PropTypes.object.isRequired
};

export default EventListItem;

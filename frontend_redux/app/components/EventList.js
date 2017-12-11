import React from 'react';
import PropTypes from 'prop-types';
import ListItemView from './EventListItem';

const EventList = ({events}) => {
    return (
        <div>
            {events.map((event) =>
                <ListItemView key={event.id} event={event} />
            )}
        </div>

    );
}

EventList.propTypes = {
    events: PropTypes.array.isRequired
};

export default EventList;

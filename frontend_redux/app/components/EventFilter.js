import React from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-bootstrap-datetimepicker';

const EventFilter = ({date, forAllStatus, onDateChange, onForAllTimeChange}) => {
    return (
        <div>
            <Datetime onChange={onDateChange} dateTime={date} mode="date" defaultText="None" format="DD.MM.YYYY" inputFormat="DD.MM.YYYY" showToday={false} /> <br/>
            <label><input type="checkbox" onChange={onForAllTimeChange} checked={forAllStatus} />За всё время</label>
        </div>
    );
};

EventFilter.propTypes = {
    onDateChange: PropTypes.func.isRequired,
    onForAllTimeChange: PropTypes.func.isRequired
};

export default EventFilter;

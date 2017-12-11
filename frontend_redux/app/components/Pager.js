import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Pager extends React.Component {

    getItem(key, page)
    {
        if (page === this.props.currentPage)
        {
            return (
                <li key={key} className="active"><Link to={this.props.routeBuilder(page)}>{page}</Link></li>
            );
        }
        else
        {
            return (
                <li key={key}><Link to={this.props.routeBuilder(page)}>{page}</Link></li>
            );
        }
    }

    render()
    {
        const { totalItems, pageSize } = this.props;
        const countPages = Math.ceil(totalItems / pageSize);

        let pages = [];
        for (let page = 1; page <= countPages; page++)
        {
            pages.push(this.getItem('page_' + page, page));
        }

        return (
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {pages}
                </ul>
            </nav>
        );
    }
}

Pager.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    routeBuilder: PropTypes.func.isRequired
};

export default Pager;

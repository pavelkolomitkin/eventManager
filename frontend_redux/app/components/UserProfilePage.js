import React from 'react';
import PropTypes from 'prop-types';

const UserProfilePage = ({userProfile}) => {
    return (
        <div>
        {
            userProfile &&
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <td>
                            User name:
                        </td>
                        <td>
                            {userProfile.username}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Email:
                        </td>
                        <td>
                            {userProfile.email}
                        </td>
                    </tr>
                </tbody>
            </table>
        }
        </div>
    );
}

UserProfilePage.propTypes = {
    userProfile: PropTypes.object
};

export default UserProfilePage;

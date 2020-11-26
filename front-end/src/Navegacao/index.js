import React from 'react';
import {Link} from 'react-router-dom';

export default () => {
    return(
        <div>
            <Link to="/drop1">DROP 1</Link> |
            <Link to="/drop2">DROP 2</Link> |
        </div>
    );
}
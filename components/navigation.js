import React from 'react';
import template from '../templates/navigation.rt';
import {Router, Route, browserHistory,IndexRoute, Link, hashHistory, IndexRedirect} from 'react-router';

var ReactPropTypes = React.PropTypes;

module.exports = React.createClass({
    propTypes      : {
        loggedInUsername: ReactPropTypes.string,
        activeClass     : ReactPropTypes.object
    },
    getInitialState: function ()
    {
        return {
            authorities: authorities

        }
    },
    render         : template
});

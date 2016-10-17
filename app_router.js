import React from 'react';
import ReactDOM from 'react-dom';
import AuthenticatedApp from './components/AuthenticatedApp.jsx';
import {Router, Route, IndexRoute, Link, hashHistory, IndexRedirect} from 'react-router';
import CampaignsProperties from './components/campaign/campaignProperties.js';
import DeliveryTargets from './components/campaign/deliveryTargets.js';
import Dynamic from './components/campaign/dynamic.js';
import ChannelsContent from './components/campaign/channelsContent.js';
import Campaigns from './components/campaign/campaigns.js';
import Users from './components/users/Users.js';
import Admin from './components/admin/Admin.js';
import RoleLists from './components/role/RoleList.js';
import AddRole from './components/role/AddRole.js';
import UpdateRole from './components/role/UpdateRole.js';
import AddUser from './components/users/AddUser.js';
import AddCustomer from './components/customers/AddCustomers.js';
import UpdateUser from './components/users/UpdateUser.js';
import ViewUser from './components/users/ViewUserDetail.js';
import ListUsers from './components/users/ListUsers.js';
import sample from './components/sample.js';
import PreviewCampaign from './components/campaign/PreviewCampaigns.js';
import ResultMeasurement from './components/campaign/ResultMeasurement.js';
import ResultMeasurementDemographic from './components/campaign/Demographic.js';
import DayOfWeek from './components/campaign/DayOfWeek.js';
import TimeOfDay from './components/campaign/TimeOfDay.js';
import PreviewCurrentCampaign from './components/campaign/PreviewCurrentCampaigns.js';
import AllCampaigns from './components/campaign/allCampaignsPage.js';
import Customers from './components/customers/Customers.js';
import ListCustomers from './components/customers/ListCustomers.js';
import ViewCustomer from './components/customers/ViewCustomers.js';
import UpdateCustomer from './components/customers/UpdateCustomers.js';
import SummaryByArea from './components/campaign/SummaryByArea.js';
import SummaryByDistance from './components/campaign/SummaryByDistance.js';
import ReactBarChartComponent from './components/charts/ReactBarChartComponent.js';
import Targets from './components/targets/TargetLists.js';
import AddTargets from './components/targets/AddTargetLists.js'


export default class AppRouter extends React.Component {
    constructor()
    {
        super();
    }

    render()
    {
        var authoritiesLength = authorities.length,
            role = authorities[authoritiesLength - 1],
			path = "admin";

			if (authorities.indexOf("ROLE_viewCustomers") !== -1)
			{
				path = "customers";
			}
			
        return (
            <Router history={hashHistory}>
                <Route name="Home" path="/" handler={AuthenticatedApp} component={AuthenticatedApp}>
                    <IndexRedirect to={path} activeClassName="active" />
                    <Route path="new_campaigns" name="Campaigns" component={Campaigns} activeClassName="active">
                        <IndexRoute name="Create New Campaigns" component={CampaignsProperties}
                                    activeClassName="active" />
                        <Route path="/campaigns" name="Campaign Properties" component={CampaignsProperties}
                               activeClassName="active" />
                        <Route path="/all_campaigns" name="All Campaigns" component={AllCampaigns}
                               activeClassName="active" />
                        <Route path="/delivery_targets" name="Delivery Targets" component={DeliveryTargets}
                               activeClassName="active" />
                        <Route path="/channels_content" name="Channels and Content" component={ChannelsContent}
                               activeClassName="active" />
                        <Route path="/result_measurement" name="Result Measurement Summary" component={ResultMeasurement}
                               activeClassName="active" />
                        <Route path="/demographic" name="Result Measurement Demographic" component={ResultMeasurementDemographic}
                               activeClassName="active" />
                        <Route path="/day_of_week" name="Day of Week" component={DayOfWeek}
                               activeClassName="active" />
                        <Route path="/time_of_day" name="Time of Day" component={TimeOfDay}
                               activeClassName="active" />
                        <Route path="/Summary_By_Area" name="Summary By Area" component={SummaryByArea}
                               activeClassName="active" />
                        <Route path="/Summary_By_Distance" name="Summary By Distance" component={SummaryByDistance}
                               activeClassName="active" />

                    </Route>
                    <Route path="admin" name="Admin" component={Admin}>
                        <IndexRoute component={ListUsers} />
                        <Route path="/roles_list" name="Role List" component={RoleLists} />
                        <Route path="/add_role" name="Add Role" component={AddRole} />
                        <Route path="/update_role" name="Update Role" component={UpdateRole} />
                        <Route path="/targets" name="Targets" component={Targets} />
                        <Route path="/add_targets" name="Targets" component={AddTargets} />
                    </Route>
                    <Route path="users" name="Users" component={Users}>
                        <IndexRoute component={ListUsers} />
                        <Route path="/add_user" name="Add" component={AddUser} />
                        <Route path="/update_user" name="Update" component={UpdateUser} />
                        <Route path="/view_user" name="Update" component={ViewUser} />
                    </Route>
                    <Route path="customers" name="Customers" component={Customers}>
                        <IndexRoute component={ListCustomers} />
                        <Route path="/add_customer" name="Add" component={AddCustomer} />
                        <Route path="/view_customer" name="View" component={ViewCustomer} />
                        <Route path="/update_customer" name="Update" component={UpdateCustomer} />
                    </Route>
                    <Route path="/preview_campaign" name="Preview Campaign" component={PreviewCampaign} />
                    <Route path="/sample" name="Preview Campaign" component={Dynamic} />
                    <Route path="/preview_current_campaign" name="Preview Campaign" component={PreviewCurrentCampaign} />
                    <Route path="/react_bar_chart_test" name="React Bar Chart" component={ReactBarChartComponent} />

                </Route>
            </Router>
        );
    }
}

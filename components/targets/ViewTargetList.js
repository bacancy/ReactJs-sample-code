import React from 'react';
import template from '../../templates/targets/view_target_list.rt';
import Griddle from 'griddle-react';
import Modal from 'react-modal';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import TargetStore from '../../stores/TargetStore.js';
import TargetService from '../../services/TargetService.js';
import {validateTargetList} from '../../constants/TargetConstants.js';
import ReactTooltip from 'react-tooltip';

module.exports = React.createClass({
    mixins                   : [LinkedStateMixin],
    getInitialState()
    {
        return {
            targetList             : this.getTargetList(),
            authorities            : authorities,
            columns                : ["firstName", "lastName", "address", "gender", "dateOfBirth", "phoneNumber"],
            "isViewListOpen"       : false,
            target_list_name       : "",
            target_list_description: "Not available",
            totalRecords           : 0,
            customColumnMetadata   : [
                {
                    "columnName" : "firstName",
                    "order"      : 1,
                    "locked"     : false,
                    "visible"    : true,
                    "displayName": "First Name"

                },
                {
                    "columnName" : "lastName",
                    "order"      : 2,
                    "locked"     : false,
                    "visible"    : true,
                    "displayName": "Last Name"
                },
                {
                    "columnName"     : "address",
                    "order"          : 3,
                    "locked"         : false,
                    "visible"        : true,
                    "cssClassName"   : "campaign-name",
                    "customComponent": AddressComponent,
                    "displayName"    : "Address"

                }, {
                    "columnName" : "gender",
                    "order"      : 4,
                    "locked"     : false,
                    "visible"    : true,
                    "displayName": "Gender"

                },
                {
                    "columnName" : "dateOfBirth",
                    "order"      : 5,
                    "locked"     : false,
                    "visible"    : true,
                    "displayName": "DOB"
                },
                {
                    "columnName" : "phoneNumber",
                    "order"      : 6,
                    "locked"     : false,
                    "visible"    : true,
                    "displayName": "Phone Number"

                }
            ]
        };
    },
    componentWillReceiveProps: function (nextProps)
    {
        this.setState({isViewListOpen: nextProps.isTargetAdd});
    },

    componentWillMount()
    {
        TargetStore.addChangeListener(this._onChangeTarget);
    },

    componentWillUnmount()
    {
        TargetStore.removeChangeListener(this._onChangeTarget);
    },
    _onChangeTarget()
    {
        var recordsCount = this.getRecordCount();

        this.setState({
            targetList             : this.getTargetList(),
            totalRecords           : recordsCount.totalRecords,
            target_list_name       : recordsCount.list_name,
            target_list_description: recordsCount.description
        });
    },
    onCancel(){
        this.setState({isViewListOpen: false});
        this.props.onUpdate(false);
    },
    getRecordCount()
    {
        var storeData = TargetStore.getTargetDetail, data = {};
        var excelData = null;

        if (storeData.length == 0)
        {
            data = {

                totalRecords: 0,
            };

            return data;
        }
        else
        {
            excelData = storeData;

        }

        data = {
            totalRecords: excelData.totalCount || 0,
            list_name   : excelData.name,
            description : excelData.description == "" || excelData.description == null ? "Not available" : excelData.description
        };

        return data;
    },

    getTargetList()
    {
        var storeData = TargetStore.getTargetDetail, data = [];
        var excelData = null;

        if (storeData.length == 0)
        {
            return data;
        }
        else
        {
            excelData = storeData.excelData;

        }

        if (excelData != null || excelData != undefined)
        {
            for (var i = 0, l = excelData.length; i < l; i++)
            {

                data.push({
                    "firstName"  : excelData[i].firstName,
                    "lastName"   : excelData[i].lastName,
                    "address"    : excelData[i].address,
                    "gender"     : excelData[i].gender,
                    "dateOfBirth": excelData[i].dateOfBirth,
                    "phoneNumber": excelData[i].primaryMobileNumber
                });
            }
        }

        return data;
    },

    render: template
});

var AddressComponent = React.createClass({

    mixins: [LinkedStateMixin],
    render()
    {
        var address = this.props.rowData.address;
        if (address.length > 40)
        {
            var res = address.substring(0, 40) + "...";
        }
        else
        {
            res = address;
        }

        return (<div>
                <span data-tip={this.props.rowData.address}>
                    {res}
                </span>
                <ReactTooltip offset={{top: 30, left: 100}} class="tool-tip" place="top" type="info" effect="float"></ReactTooltip>

            </div>
        );
    }
});

import React from 'react';
import template from '../../templates/targets/add_target_lists.rt';
import Griddle from 'griddle-react';
import Modal from 'react-modal';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import TargetStore from '../../stores/TargetStore.js';
import TargetService from '../../services/TargetService.js';
import {validateTargetList} from '../../constants/TargetConstants.js';

module.exports = React.createClass({
    mixins                   : [LinkedStateMixin],
    getInitialState()
    {
        return {
            targetList             : this.getTargetList(),
            authorities            : authorities,
            columns                : ["firstName", "lastName", "address", "gender", "dateOfBirth", "phoneNumber"],
            "isOpen"               : false,
            "closePopup"           : false,
            target_list_name       : "",
            target_list_description: "",
            uploadFileName         : "",
            totalRecords           : 0,
            totalInvalidRecords    : 0,
            totalValidRecords      : 0,
            totalDuplicateRecords  : 0,
            uniqueFileId           : "",
            isDisabled             : true,
            "isLoadingIcon"        : false,
            "isDataLoaded"         : false,
            "isUploadingIcon"      : false,
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
                    "columnName" : "address",
                    "order"      : 3,
                    "locked"     : false,
                    "visible"    : true,
                    "displayName": "Address"

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
        this.setState({isOpen: nextProps.isTargetAdd, isDataLoaded: false, isUploadingIcon: false});
    },

    componentWillMount()
    {
        TargetStore.addChangeListener(this._onChangeTarget);
    },

    componentWillUnmount()
    {
        TargetStore.removeChangeListener(this._onChangeTarget);
    },
    onFileUpload        : function (e)
    {
        var file = e.target.files[0];
        var name = file.name;
        var formData = new FormData();
        formData.append('file', file);
        this.setState({uploadFileName: name});
        this.setState({"isLoadingIcon": true, isDataLoaded: false});
        TargetService.uploadTargetList(formData, this.onFileUploadCallback);
    },
    onFileUploadCallback: function (response)
    {
        this.setState({uniqueFileId: response[0].fileId, "isLoadingIcon": false, isDataLoaded: true});
    },
    _onChangeTarget()
    {
        var recordsCount = this.getRecordCount();

        this.setState({
            targetList             : this.getTargetList(),
            totalRecords           : recordsCount.totalRecords,
            isDisabled             : recordsCount.totalValidRecords >= 1 ? false : true,
            totalInvalidRecords    : recordsCount.totalInvalidRecords,
            totalValidRecords      : recordsCount.totalValidRecords,
            totalDuplicateRecords  : recordsCount.totalDuplicateRecords,
            uploadFileName         : recordsCount.uploadFileName,
            target_list_name       : recordsCount.target_list_name,
            target_list_description: recordsCount.target_list_description
        });

    },
    onCancel()
    {
        this.setState({isOpen: false});
        this.props.onUpdate(false);
    }
    ,
    onSave              : function ()
    {
        if (!validateTargetList(this.state, false))
        {
            return;
        }
        var data = {
            "fileId"     : this.state.uniqueFileId,
            "listName"   : this.state.target_list_name,
            "description": this.state.target_list_description
        };

        this.setState({isUploadingIcon: true, isDisabled: true});
        TargetService.addTarget(data, this.onSaveCallback);
    }
    ,

    onSaveCallback()
    {

        this.setState({isUploadingIcon: false});
        this.onCancel();
        TargetService.getTargetList();

    }
    ,
    getRecordCount()
    {
        var storeData = TargetStore.getUploadList, data = {};
        var excelData = null;

        if (storeData.length == 0)
        {
            data = {

                totalRecords           : 0,
                totalInvalidRecords    : 0,
                totalValidRecords      : 0,
                totalDuplicateRecords  : 0,
                uploadFileName         : "",
                target_list_name       : "",
                target_list_description: "",

            };

            return data;
        }
        else
        {
            excelData = storeData[0];

        }

        data = {

            totalRecords           : excelData.totalCount || 0,
            totalInvalidRecords    : excelData.errorCount || 0,
            totalValidRecords      : excelData.totalCount - (excelData.duplicateCount + excelData.errorCount) || 0,
            totalDuplicateRecords  : excelData.duplicateCount || 0,
            uploadFileName         : this.state.uploadFileName,
            target_list_name       : this.state.target_list_name,
            target_list_description: this.state.target_list_description
        };

        return data;
    }
    ,

    getTargetList()
    {
        var storeData = TargetStore.getUploadList, data = [];
        var excelData = null;

        if (storeData.length == 0)
        {
            return data;
        }
        else
        {
            excelData = storeData[0].excelData;

        }

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

        return data;
    }
    ,

    render: template
})
;

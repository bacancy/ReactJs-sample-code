import React from 'react';
import template from '../../templates/targets/target_lists.rt';
import Griddle from 'griddle-react';
import Modal from 'react-modal';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import TargetStore from '../../stores/TargetStore.js';
import TargetService from '../../services/TargetService.js';
import TargetAction from '../../actions/TargetAction.js';
import {TargetConstants} from '../../constants/TargetConstants.js';
import ReactTooltip from 'react-tooltip';

module.exports = React.createClass({
    getInitialState()
    {
        return {
            targetList    : this.getTargetList(),
            authorities   : authorities,
            columns       : ["Name", "description", "lastModified"],
            "showAddPopup": false,
            "isTargetAdd" : false,
            "isTargetView": false,

            customColumnMetadata: [
                {
                    "columnName"     : "Name",
                    "order"          : 1,
                    "locked"         : false,
                    "visible"        : true,
                    "cssClassName"   : "campaign-name",
                    "customComponent": viewList

                },
                {
                    "columnName"     : "description",
                    "order"          : 2,
                    "locked"         : false,
                    "visible"        : true,
                    "displayName"    : "Description",
                    "customComponent": DesciptionComponent
                },
                {
                    "columnName"     : "lastModified",
                    "order"          : 3,
                    "locked"         : false,
                    "visible"        : true,
                    "cssClassName"   : "target-action",
                    "displayName"    : "Last Modified",
                    "sortable"       : true,
                    "customComponent": LinkComponent

                }
            ]
        };
    },
    onTargetList    : function ()
    {

        TargetAction.clearUploadList();
        this.setState({isTargetAdd: true});

    },
    onAddTarget     : function (state)
    {
        this.setState({"isTargetAdd": state});
    },
    onViewTargetList: function (e)
    {
        var id = e.target.id;
        TargetService.getTargetDetails(id, this.callBackFunction);

    },
    callBackFunction(){
        this.setState({isTargetView: true});
    },
    onViewTarget    : function (state)
    {
        this.setState({"isTargetView": state});
    },
    componentDidMount()
    {
        this.requestTargets();
        TargetStore.addChangeListener(this._onChangeTarget);
    },

    componentWillUnmount()
    {
        TargetStore.removeChangeListener(this._onChangeTarget);
    },

    requestTargets()
    {
        TargetService.getTargetList();
    },

    _onChangeTarget()
    {
        this.setState({targetList: this.getTargetList()});
    },

    getTargetList()
    {
        var storeData = TargetStore.targetList, data = [];

        if (storeData.length == 0)
        {
            return data;
        }

        for (var i = 0, l = storeData.length; i < l; i++)
        {

            data.push({
                "Name"        : storeData[i].name,
                "description" : storeData[i].description,
                "Id"          : storeData[i].id,
                "lastModified": storeData[i].lastModified,
                "viewFunction": this.onViewTargetList

            });
        }

        return data;
    },

    render: template
});

const customStyles = {
    content: {
        top        : '50%',
        left       : '50%',
        right      : 'auto',
        bottom     : 'auto',
        marginRight: '-50%',
        transform  : 'translate(-50%, -50%)'
    }
};

var LinkComponent = React.createClass({

    mixins        : [LinkedStateMixin],
    getInitialState()
    {
        return {
            deleteModalIsOpen: false,
            userId           : this.props.rowData.Id,
            name             : this.props.rowData.Name
        };
    },
    closeModal()
    {
        this.setState({deleteModalIsOpen: false});
    }
    ,
    confirmDelete()
    {

        var ID = this.state.userId;

        TargetService.deleteTarget(ID, this.onCallback);

        this.setState({
            deleteModalIsOpen: false
        });
    },
    onDowloadClick: function ()
    {
        var ID = this.props.rowData.Id;
        window.location.href = TargetConstants.DOWNLOAD_TARGET_URL + "/" + ID;
    },
    onDeleteClick : function ()
    {
        this.setState({deleteModalIsOpen: true});

    },
    onCallback    : function ()
    {
        TargetService.getTargetList();
    },
    render()
    {
        var download = "";
        var deleteList = "";

        if (authorities.indexOf("ROLE_DeleteTargets") !== -1)
        {
            deleteList = <a className="icon-tag" onClick={this.onDeleteClick}><span className="glyphicon glyphicon-trash" title="Delete file"></span></a>;
        }
        if (authorities.indexOf("ROLE_DownloadTargets") !== -1)
        {
            download = <a className="icon-tag margin-left-10" onClick={this.onDowloadClick}><span className="glyphicon glyphicon-save" title="Download file"></span></a>;
        }

        return (
            <div>
                {this.props.rowData.lastModified} {download} {deleteList}
                <Modal
                    isOpen={this.state.deleteModalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}>

                    <div>
                        <p>Are you sure, you want to delete <b> {this.state.name} </b> ?</p>

                        <div className="text-center-align">
                            <button className='btn btn-md btn-primary margin-right-10' onClick={this.confirmDelete}>Yes</button>
                            <button className='btn btn-md btn-default margin-right-10' onClick={this.closeModal}>No</button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
});

var viewList = React.createClass({

    mixins: [LinkedStateMixin],
    render()
    {
        var name = <a className="margin-left-10" id={this.props.rowData.Id} onClick={ this.props.rowData.viewFunction}>{this.props.rowData.Name}</a>;
        return (
            <div>
                {name}
            </div>
        );
    }
});

var DesciptionComponent = React.createClass({

    mixins: [LinkedStateMixin],
    render()
    {
        var description = this.props.rowData.description;
        if (description.length > 40)
        {
            var res = description.substring(0, 40) + "...";
        }
        else
        {
            res = description;
        }

        return (<div>
                <span data-tip={this.props.rowData.description}>
                    {res}
                </span>
                <ReactTooltip class="tool-tip" place="top" type="info" effect="float"></ReactTooltip>

            </div>
        );
    }
});

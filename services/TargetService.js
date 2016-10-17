import {ajax, showError,showCampaignError} from '../utils/Utility.js';
import {TargetConstants} from '../constants/TargetConstants.js';
import TargetActions from '../actions/TargetAction.js';
import TargetStore from '../stores/TargetStore.js';
import {hashHistory} from 'react-router';
import $ from 'jquery';

class TargetService {
    addTarget(requestData, callbackfunction)
    {
        ajax(TargetConstants.Add_TARGET_LIST_URL, 'POST', JSON.stringify(requestData), function (response)
        {
            TargetActions.addTargetList(response);
            callbackfunction(response);
        }, function (response)
        {
            if (response.status == 200)
            {
                TargetActions.addTargetList(response);
                callbackfunction(response);
            }
            else
            {
                if (response.responseJSON && response.responseJSON.fieldErrors)
                {
                    var message = [];
                    for (var i = 0, l = response.responseJSON.fieldErrors.length; i < l; i++)
                    {
                        message.push(response.responseJSON.fieldErrors[i].message)
                    }

                    showError(message.join("<br/>"));
                }
                else
                {
                    showError(response.responseJSON.message);
                }
            }
        }, 'application/json', 'json');
    }

    getTargetList()
    {
        ajax(TargetConstants.GET_TARGET_LIST_URL, 'GET', {}, function (response)
        {
            TargetActions.getTargetList(response);
        }, function (response)
        {
            console.info("Failed request for get target list");
        }, "application/json", "json");
    }

    getTargetDetails(id, callback)
    {
        ajax(TargetConstants.GET_TARGET_DETAIL_URL + "/" + id, 'GET', {}, function (response)
        {
            TargetActions.getTargetDetail(response);
            callback(response);
        }, function (response)
        {
            console.info(" Failed request for get target list");
        }, "application/json", "json");
    }

    deleteTarget(id, callback)
    {
        ajax(TargetConstants.DELETE_TARGET_URL + "/" + id, 'DELETE', {}, function (response)
        {
            callback(response);
            TargetActions.getTargetList(response);
        }, function (response)
        {
            if (response.status == 200)
            {
                callback(response);
                TargetActions.getTargetList(response);
            }
            else
            {
                console.info(" Failed request for download target file.");
            }

        }, "application/json", "json");
    }

    uploadTargetList(requestData, callback)
    {

        $.ajax({
            url        : TargetConstants.UPLOAD_TARGET_URL,
            data       : requestData,
            cache      : false,
            processData: false,
            contentType: false,
            type       : 'POST',
            success    : function (response)
            {
                TargetActions.getUploadTargetList(response);
                callback(response)
            },
            error      : function (response)
            {

                showError(JSON.parse(response.responseText).message);
            }
        });
    }
}

export default new TargetService();

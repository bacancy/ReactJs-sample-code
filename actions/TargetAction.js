import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {TargetConstants} from '../constants/TargetConstants.js';

export default {
    addTargetList: (targetlist) =>
    {
        AppDispatcher.dispatch({
            actionType: TargetConstants.ADD_TARGET_LIST,
            targetList     : targetlist
        })
    },
    getTargetList: (targetlist) =>
    {
        AppDispatcher.dispatch({
            actionType: TargetConstants.GET_TARGET_LIST,
            targetList     : targetlist
        })
    },
    getTargetDetail: (targetlist) =>
    {
        AppDispatcher.dispatch({
            actionType: TargetConstants.GET_TARGET_DETAIL,
            targetList     : targetlist
        })
    },
    getUploadTargetList: (targetlist) =>
    {
        AppDispatcher.dispatch({
            actionType: TargetConstants.UPLOAD_TARGET,
            targetList     : targetlist
        })
    },
    clearUploadList: () =>
    {
        AppDispatcher.dispatch({
            actionType: TargetConstants.CLEAR_UPLOAD_TARGET
        })
    }

}

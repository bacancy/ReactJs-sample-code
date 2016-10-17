import {TargetConstants} from '../constants/TargetConstants.js';
import BaseStore from './BaseStore';

class TargetStore extends BaseStore {

    constructor()
    {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this._targetList = [];
        this._uploadTargetList = [];
        this._TargetDetail = [];
    }

    _registerToActions(action)
    {
        switch (action.actionType)
        {
            case TargetConstants.GET_TARGET_LIST:
                this._targetList = action.targetList;
                this.emitChange();
                break;
            case TargetConstants.ADD_TARGET_LIST:
                this._targetList = action.targetList;
                this.emitChange();
                break;
            case TargetConstants.UPLOAD_TARGET:
                this._uploadTargetList = action.targetList;
                this.emitChange();
                break;
            case TargetConstants.CLEAR_UPLOAD_TARGET:
                this._uploadTargetList = [];
                this.emitChange();
                break;
            case TargetConstants.GET_TARGET_DETAIL:
                this._TargetDetail = action.targetList;
                this.emitChange();
                break;

            default:
                this.emitChange();
                break;
        }
    }

    get targetList()
    {
        return this._targetList;
    }

    get getUploadList()
    {
        return this._uploadTargetList;
    }

    get getTargetDetail()
    {
        return this._TargetDetail;
    }

}

export default new TargetStore();

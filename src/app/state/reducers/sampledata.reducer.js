import Immutable from 'immutable';

import {ACTIONS} from 'app/state/actions/sampledata.actions';

export default (state = Immutable.fromJS({content: {firstName: 'Andrea', lastName: 'Chiumenti'}}), action) => {
    switch (action.type) {
        case ACTIONS.EDIT:
            return state.set('__copy', state.get('content'));
        case ACTIONS.CANCEL:
            return state.delete('__copy');
        case ACTIONS.SAVE:
            return state.set('content', state.get('__copy')).delete('__copy');
        case ACTIONS.FIELD_MODIFY:
            return state.update('__copy', copy => copy.set(action.data.key, action.data.value));
        default:
            return state;
    }
};

/*
const action = {
    type: 'FIELD_MODIFY',
    data: {
        key: 'firstName',
        value: 'Andre'
    }
}
 */
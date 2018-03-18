export const ACTIONS = {
    EDIT: 'EDIT',
    SAVE: 'SAVE',
    CANCEL: 'CANCEL',
    FIELD_MODIFY: 'FIELD_MODIFY',
};

export const edit = () => ({ type: ACTIONS.EDIT});
export const cancel = () => ({ type: ACTIONS.CANCEL});
export const save = () => ({ type: ACTIONS.SAVE});
export const fieldModify = (key, value) => ({ type: ACTIONS.FIELD_MODIFY, data: {key, value}});
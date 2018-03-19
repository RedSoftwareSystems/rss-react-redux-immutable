import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Immutable from 'immutable';

import FormButtons from './FormButtons';
import Fade from 'app/components/animations/Fade';
import {cancel, edit, save, fieldModify} from 'app/state/actions/sampledata.actions';

const _SDataForm = ({formData, onFieldChange}) => (
    !!formData?<section>
        <fieldset>
            <label>First name (ma daiii): <input type={'text'} name={'firstName'}
                                                 value={formData.get('firstName')}
                                                 placeholder={'First name'}
                                                 onChange={onFieldChange}/>
            </label>
        </fieldset>
        <fieldset>
            <label>Last name: <input type={'text'} name={'lastName'}
                                     value={formData.get('lastName')}
                                     placeholder={'Last name'}
                                     onChange={onFieldChange}/>
            </label>
        </fieldset>
    </section>:null
);

const _SDataView = ({viewData}) => (
    <section key={'view'} className={'viewData'}>
        <fieldset><label>First name: </label> {viewData.get('firstName')}</fieldset>
        <fieldset><label>Last name: </label> {viewData.get('lastName')}</fieldset>
    </section>
);
const _SampleForm = ({
                         onEdit,
                         onSave,
                         onCancel,
                         onFieldChange,
                         sampleData
                     }) => {
    const formData = sampleData.get('__copy'),
        viewData = sampleData.get('content', Immutable.Map()),
        editMode = !!sampleData.get('__copy');
    return (
        [
            <Fade key={'form'} active={editMode} style={{width: '100%'}}>
                <_SDataForm formData={formData} onFieldChange={onFieldChange}/>
            </Fade>,
            <Fade key={'view'} active={!editMode} style={{width: '100%'}}s>
                <_SDataView viewData={viewData}/>
            </Fade>,
            <FormButtons key={'buttons'} editMode={editMode} onEdit={onEdit} onCancel={onCancel} onSave={onSave}/>
        ]
    )
};

_SampleForm.propTypes = {
    onEdit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    sampleData: PropTypes.any.isRequired
};

const mapStateToProps = (state) => {
    const sampleData = state.get('sampledata');
    return {
        sampleData
    };
};

const mapDispatchToProps = (dispatch) => ({
    onSave: () => dispatch(save()),
    onEdit: () => dispatch(edit()),
    onCancel: () => dispatch(cancel()),
    onFieldChange: evt => {
        evt.preventDefault();
        dispatch(fieldModify(evt.target.name, evt.target.value));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(_SampleForm);
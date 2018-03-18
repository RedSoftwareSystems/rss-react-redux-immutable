import React from 'react';
import PropTypes from 'prop-types';

const FormButtons = ({
                         editMode = false,
                         className = [],
                         onEdit,
                         onCancel,
                         onSave,
                     }) =>
    (<section className={['formButtons'].concat(className)}>
        {editMode ?
            [
                <button key={'submit'} className={'saveButton'} onClick={onSave}>SAVE</button>,
                <button key={'cancel'} className={'cancelButton'} onClick={onCancel}>CANCEL</button>
            ] :
            <button className={'editButton'} onClick={onEdit}>EDIT</button>
        }
    </section>);

FormButtons.propTypes =
    {
        editMode: PropTypes.bool.isRequired,
        className: PropTypes.any,
        onSave: PropTypes.func.isRequired,
        onEdit: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
    };

export default FormButtons;


import React from "react";
import BaseTemplate from './templates/BaseTemplate';
import SampleForm from 'app/components/forms/SampleForm';
import {cancel, edit, fieldModify, save} from "app/state/actions/sampledata.actions";
import {connect} from "react-redux";

class _FormExample extends React.Component {

    componentWillMount() {
        this.props.onMount();
    }
    render() {
        return (<BaseTemplate>
            <SampleForm/>
        </BaseTemplate>)
    }
}

const mapDispatchToProps = (dispatch) => ({
    onMount: () => dispatch(cancel()),
});
export default connect(null, mapDispatchToProps)(_FormExample);
import {combineReducers} from 'redux-immutable';
import router from './router.reducers';
import sampledata from './sampledata.reducer';

export default combineReducers({
    router,
    sampledata,
});


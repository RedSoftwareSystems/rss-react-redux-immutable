import Immutable from 'immutable';
import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import createBrowserHistory from 'history/createBrowserHistory';
import reducers from 'app/state/reducers';

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

export const history = createBrowserHistory();

window.khistory = history;
const middleware = [thunk];

// const rootReducer = combineReducers({});

const configureStore = (initialState = Immutable.Map()) => {
    if (history) {
        // history.listen(location => {
        //     console.log('location.pathname: ', location.pathname)
        // });

        return createStore(
            reducers,
            initialState,
            composeEnhancers(
                applyMiddleware(routerMiddleware(history), ...middleware),

            ))
    }

    return createStore(reducers, initialState)
};



const store = configureStore();

export default store;
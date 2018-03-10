import React from 'react';
import {hot} from 'react-hot-loader';
import {Provider} from 'react-redux';
import {Route} from 'react-router';
import {ConnectedRouter} from 'react-router-redux';
import store, {history} from 'app/state/store';
import pages from 'app/components/pages';
import TopMenu from 'app/components/TopMenu';
import Switch from 'app/components/router/Switch';


const App = () => (
    <Provider store={store}>
        {/* ConnectedRouter will use the store from Provider automatically */}
        <ConnectedRouter history={history}>
            <div>
                <TopMenu/>
                    <Switch>
                        {Object.entries(pages).map(([path, props]) => (<Route key={path} path={path} {...props}/>))}
                    </Switch>
            </div>
        </ConnectedRouter>
    </Provider>
);

export default hot(module)(App);

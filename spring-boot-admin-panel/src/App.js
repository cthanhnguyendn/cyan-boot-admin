import React, {useEffect} from 'react';
import './App.scss';
import {Provider, useDispatch} from "react-redux";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './pages/Home/Home'
import ListEntity from './pages/ListEntity/ListEntity'
import CreateUpdateEntity from './pages/CreateUpdateEntity/CreateUpdateEntity'
import {createStore} from "./store/store";
import {loadMetaAdminTag} from "./store/meta";

const store = createStore({})

const router = [
    {path: '/', exact: true, component: Home},
    {path: '/:entity',exact: true, component: ListEntity},
    {path: '/:entity/create',exact: true, component: CreateUpdateEntity},
    {path: '/:entity/:id(\\d+)',exact: true, component: CreateUpdateEntity}
]

const DefaultLayout = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadMetaAdminTag())
    }, [dispatch])
    return (
        <BrowserRouter basename={(process.env.REACT_APP_CONTEXT_PATH || '/').trim()}>
            <Switch>
                <div className="App">
                    {router.map(r => <Route path={r.path} exact={r.exact} component={r.component}/>)}
                </div>
            </Switch>
        </BrowserRouter>
    )
}

function App() {
    return (
        <Provider store={store}>
            <DefaultLayout/>
        </Provider>
    );
}

export default App;

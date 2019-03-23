import rootSaga from './sagas/RootSaga';
import rootReducer from './reducers/Root'
import {applyMiddleware,createStore} from 'redux';
import createSagaMiddleWare from 'redux-saga';

const sagaMiddleWare = createSagaMiddleWare();
var store = createStore(rootReducer,applyMiddleware(sagaMiddleWare))

//create store here
sagaMiddleWare.run(rootSaga);

export default store;
require('expose?$!expose?jQuery!jquery')
require("bootstrap-webpack")
require('./styles.css')

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, compose, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk';
import Reducer from './reducers'
import App from './components/app'

const logger = createLogger()
const store = createStore(Reducer, compose(
            applyMiddleware(reduxThunk)
        // applyMiddleware(createLogger())
    ))

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)

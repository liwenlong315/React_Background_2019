import React from 'react';
import ReactDOM from 'react-dom';
import {getUser} from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'
import App from './App'; // 自定义的模块引入必须以.开头
import './api'

const user = getUser()
memoryUtils.user = user


ReactDOM.render(<App />, document.getElementById('root'));


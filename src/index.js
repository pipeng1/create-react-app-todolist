import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import { Layout } from 'antd';


import './index.css';
import * as serviceWorker from './serviceWorker';

const { Header, Footer, Content } = Layout;


ReactDOM.render(
    <div>
        <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ backgroundColor: '#fff' }}>武汉诗礼乐信息科技有限公司</Header>
        <Content style={{ padding: '20px 200px' }}>
            <Router />
        </Content>
        <Footer><h1 style={{ paddingLeft: '80%' }}>design ©2020 by peter</h1></Footer>
        </Layout>
    </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import { Button, Input } from 'antd';
import styles from './todo.module.css'


export default class Home extends React.Component {
    render() {
        return (
            <div className={ styles.container }>
                <a href='#/wrapcomponent'> 去wrapcomponent </a>
                <Input placeholder="请输入待办事项" />
                <Button type="primary">Button</Button>
            </div>
        )
    }
}
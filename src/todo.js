import React from "react"
import { Button, Input, Row, Col, Modal, message } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import styles from "./todo.scss"


//react中有两种组件，无状态函数组件，有状态类组件
//修改弹框组件
class DialogCustom extends React.Component {
    constructor(props) {
        super(props)
        this.state = { inputText: "" }
    }
    setInputText = (val) => {
        this.setState({
            inputText: val,
        })
    }
    handleOk = () => {
        if (!this.state.inputText) {
            message.warning("不能为空", 2)
            return
        }
        this.props.onOk(this.state.inputText)
        this.back()
        this.setState({ inputText: "" })
        this.props.onClose()
    }
    handleClose = () => {
        this.setState({ inputText: "" })
        this.props.onClose()
    }
    onChange = (e) => {
        this.setState({ inputText: e.target.value })
    }
    //修改父组件(TodoList)todos数据
    back = () => {
        this.props.changeDialogCustomData(this.state.inputText)
    }
    render() {
        const { visible } = this.props
        return (
            <Modal
                title="修改"
                visible={visible}
                okText="确认"
                cancelText="取消"
                onOk={this.handleOk}
                onCancel={this.handleClose}
            >
                <Input value={this.state.inputText} onChange={this.onChange} />
            </Modal>
        )
    }
}

//待办事项列表组件
class TodoList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: ["吃饭", "睡觉", "打豆豆"],
            visible: false,
            text: "",
            index: 0,
            showText: "",
        }
    }
    componentDidMount() {
        this.props.onRef(this)
    }
    confirm = (todos, index) => {
        Modal.confirm({
            title: "提示",
            icon: <ExclamationCircleOutlined />,
            content: "您确定要删除吗?",
            okText: "确认",
            cancelText: "取消",
            onOk: () => {
                console.log("点击确认")
                todos.splice(index, 1)
                this.setState({
                    todos,
                })
            },
        })
    }
    add = (e) => {
        this.state.todos.push(e)
        this.setState({
            todos: this.state.todos,
        })
    }
    handleEdit = (index) => {
        //父组件更改子组件(DialogCustom)数据
        this.refs.getSwordButton.setInputText(this.state.todos[index])
        this.setState({
            visible: true,
            index,
        })
    }
    handleDel = (index) => {
        console.log(index)
        this.confirm(this.state.todos, index)
    }
    handleOk = (v) => {
        this.setState({ text: v })
    }

    showDialog = () => {
        this.setState({ visible: true })
    }

    handleClose = () => {
        this.setState({ visible: false })
    }
    DialogCustomChange = (e) => {
        this.state.todos.splice(this.state.index, 1, e)
        this.setState({
            todos: this.state.todos,
        })
    }
    onRef = (ref) => {
        this.DialogCustom = ref
    }
    render() {
        if (this.state.todos.length) {
            const todoItems = this.state.todos.map((todo, index) => (
                <li key={index} style={{ padding: "5px" }}>
                    <Row gutter={0}>
                        <Col span={6}>{todo}</Col>
                        <Col span={6}>
                            <Button
                                size="small"
                                style={{ marginRight: "5px" }}
                                onClick={() => this.handleEdit(index)}
                            >
                                修改
                            </Button>
                            <Button
                                type="danger"
                                size="small"
                                onClick={() => this.handleDel(index)}
                            >
                                删除
                            </Button>
                        </Col>
                    </Row>
                </li>
            ))
            return (
                <div>
                    <h3>待办事项</h3>
                    <ul>{todoItems}</ul>
                    <DialogCustom
                        changeDialogCustomData={this.DialogCustomChange}
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onClose={this.handleClose}
                        ref="getSwordButton"
                    />
                </div>
            )
        }
        return (
            <div>
                <h4>无待办事项</h4>
            </div>
        )
    }
}

//待办增加组件
export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = { value: "" }
        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
    }

    handleChange(event) {
        this.setState({ value: event.target.value })
    }

    handleAdd(event) {
        console.log(1, this.state.value)
        if (this.state.value) {
            this.TodoList.add(this.state.value)
            this.setState({ value: "" })
            return
        }
        message.warning("不能为空", 2)
        event.preventDefault()
    }
    onRef = (ref) => {
        this.TodoList = ref
    }
    render() {
        return (
            <div className={styles.container}>
                <a
                    href="#/wrapcomponent"
                    style={{ display: "block", margin: "20px 0" }}
                >
                    去wrapcomponent
                </a>
                <Row gutter={8} style={{ marginBottom: "20px" }}>
                    <Col span={8} type="text">
                        <Input
                            value={this.state.value}
                            onChange={this.handleChange}
                            placeholder="请输入待办事项"
                        />
                    </Col>
                    <Col span={6}>
                        <Button type="primary" onClick={this.handleAdd}>
                            添加
                        </Button>
                    </Col>
                </Row>
                <TodoList onRef={this.onRef} />
            </div>
        )
    }
}

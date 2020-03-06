import React from 'react'
import styles from '@/css/home.scss'


export default class Home extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }
    
    render() {
        return <div className={styles.box}>
            <h1 className={styles.box_h1}>欢迎来到基于 React 框架与 ant design UI 的豆瓣电影实例</h1>
        </div>
    }   
}


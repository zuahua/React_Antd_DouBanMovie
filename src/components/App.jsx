// 项目的 根组件
import React from 'react'

// 导入路由组件
import {HashRouter, Link, Route} from 'react-router-dom'

// 导入 antd UI组件
import { Layout, Menu } from 'antd'
const { Header, Content, Footer } = Layout

// 导入模块化的 css
import styles from '@/css/App.scss'

// 导入 组件
import Home from '@/components/home/HomeContainer'
import Movie from '@/components/movie/MovieContainer'
import About from '@/components/about/AboutContainer'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = { }
    }

    componentWillMount() {
        //console.log(window.location.hash.split('/')[1]);

    }

    render() {
        return <HashRouter>
        <Layout className="layout" style={{ height: '100%' }}>
        
        {/* Header 头部区域 */}
        <Header>
      <div className={ styles.logo } />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={ [window.location.hash.split('/')[1]] }
        style={{ lineHeight: '64px' }}
      >
      
        <Menu.Item key="home">
            <Link to="/home">首页</Link>
        </Menu.Item>
        <Menu.Item key="movie">
            <Link to="/movie/in_theaters/1">电影</Link>
        </Menu.Item>
        <Menu.Item key="about">
            <Link to="/about">关于</Link></Menu.Item>
      </Menu>

      
    </Header>
        

        <Content style={{backgroundColor: '#fff'}}>
        <Route path="/home" component={Home}></Route>
        <Route path="/movie" component={Movie}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/" component={Home} exact></Route>
        </Content>

    {/* Footer 底部区域 */}
    <Footer style={{ textAlign: 'center'}}>
     ©2020 inno 
    </Footer>
  
    </Layout>
        </HashRouter>
    }

    //#region componentDidMount 区域
    // componentDidMount() {
    //     console.log("测试")
    //     console.log(typeof(this.state.defaultSelectedPage) == 'undefined' ? 'home' : this.state.defaultSelectedPage)
    // }
    //#endregion
}


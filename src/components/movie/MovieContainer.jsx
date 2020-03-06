import React from 'react'

// 导入 antd UI 相关组件
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout

// 导入路由 组件
import { Link, Route, Switch } from 'react-router-dom'

// 导入 电影列表 组件
import MovieList from '@/components/movie/MovieList'

// 导入 电影详情 组件
import MovieDetail from '@/components/movie/MovieDetail'

export default class Movie extends React.Component {

    componentWillMount() {
        //console.log(window.location.hash.split('/')[2]);
    }

    render() {
        return <Layout style={{ padding: '0', background: '#fff', height: '100%'}}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={ [window.location.hash.split('/')[2]]  }
            style={{ height: '100%' }}
          >
            <Menu.Item key="in_theaters">
                <Link to="/movie/in_theaters/1">正在上映</Link>
            </Menu.Item>
            <Menu.Item key="coming_soon">
            <Link to="/movie/coming_soon/1">即将上映</Link>
            </Menu.Item>
            <Menu.Item key="top250">
            <Link to="/movie/top250/1">top250</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ padding: '10px', minHeight: 280 }}>

            {/* 使用路由中的 Switch 组件；实现只匹配第一个 匹配成功的 组件 */}
            <Switch>
                {/* 使用，路由传参 */}
                {/* 使用 精确匹配 */}
                <Route exact path="/movie/detail/:id" component={MovieDetail}></Route>
                <Route exact path="/movie/:type/:page" component={MovieList}></Route>              

            </Switch>
            
        </Content>
      </Layout>
    }   
}


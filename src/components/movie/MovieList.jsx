import React from 'react'

// 导入 antd UI
import { Spin, Alert, Pagination } from 'antd';

// 导入 fetch-jsonp
import fetchjsonp from 'fetch-jsonp'

// 导入 MovieItem 组件
import MovieItem from '@/components/movie/MovieItem'

export default class MovieList extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            // RouteParams: props.match.params
            movies: [],
            nowPage: parseInt(props.match.params.page) || 1,
            pageSize: 14, // 每页显示多少条数据
            total: 0, // 当前电影分类下，总共有多少条数据
            isloading: true, // 数据正在加载，如果为 true 表示正在加载
            movieType: props.match.params.type
        }
        //console.log(props.match)
    }

    componentWillMount () {
        
        //#region fetch 
        // fetch('https://cn.vuejs.org/v2/guide')

        // .then(response => { // 当使用 fetch API 获取数据的时候，第一个 .then中拿到的是 Response对象；我们可以使用 response.json() 得到一个新的 promise
        //     return response.json()
        // })

        // .then(data => {
        //     console.log(data)
        // })
        //#endregion
        
        //#region 
        // setTimeout(() => {
        //     this.setState({
        //         isloading: false
        //     })
        // }, 1000)
        //#endregion

        //#region fetch 请求 豆瓣数据
        // fetch('https://douban.uieee.com/v2/movie/in_theaters')
        // .then((response) => response.json())
        // .then((data) => {
        //     console.log(data);
        // })
        //#endregion

        // 调用 加载页面
        this.loadMovieListByTypeAndPage()       
    }
    
    render() {
        return <div>
        { this.renderList() }
        
    </div>
    }

    componentWillReceiveProps(nextProps) {
        // 当 属性改变时，即用户 切换了 路由
        // 每当地址栏变化，重置 state 中的数据项，重置完毕之后，我们可以重新发起请求了
        this.setState({
            isloading: true, // 又要重新获取数据
            nowPage: parseInt(nextProps.match.params.page) || 1, // 想要获取第几页的数据
            movieType: nextProps.match.params.type, // 电影类型
        }, () => {
            this.loadMovieListByTypeAndPage()
        })
    }

    // 根据 电影类型 和 页码 加载数据
    loadMovieListByTypeAndPage =  () => {        
        // 开始获取数据索引
        const start = this.state.pageSize * (this.state.nowPage - 1)
        // 构造 请求链接 
        const url = `https://douban.uieee.com/v2/movie/${this.state.movieType}?start=${start}&count=${this.state.pageSize}`
        // console.log("链接" + url)
        fetchjsonp(url)
        .then(response => response.json())
        .then((data) => {
            // console.log("得到数据" + data.subjects)
            this.setState({
                isloading: false, // 数据加载完成，将loading效果隐藏
                movies: data.subjects, // 电影数组
                total: data.total // 总条数 赋值
            })
        })

        // const data = require('@/components/test_data/' +  this.state.movieType + '.json')
        // setTimeout(() => {
        //     this.setState({
        //         isloading: false, //数据加载完成，将loading效果隐藏
        //         movies: data.subjects,
        //         total: data.total // 总条数 赋值
        //     })
        // }, 1000)
    }

    renderList = () => {
        if(this.state.isloading) { // 如果正在加载数据
            return <Spin tip="Loading...">
                <Alert
                message="正在加载电影数据"
                description="精彩内容，马上呈现"
                type="info"
                />
            </Spin>
        }
        else { // 加载完成
            return <div>
                <div style={{ display:'flex', flexWrap: 'wrap'}}>
                    { this.state.movies.map(movie => {
                        return <MovieItem {...movie} key={movie.id} history={this.props.history}></MovieItem>
                    }) }
                </div>
                <Pagination defaultCurrent={this.state.nowPage} pageSize={this.state.pageSize} total={this.state.total} onChange={this.pageChanged} ref='pgn' />
            </div>
        }
    }

    // 当页码改变的时候 加载新的数据
    pageChanged = (page) => {
        // 手动使用 BOM 对象，实现了跳转，这样不好，最好使用 路由的方法，进行编程式导航
        // window.location.href = '/#/movie/' + this.state.movieType + '/' + page
        // console.log(this.props)
        // 使用 react-router-dom 实现编程式导航
        this.props.history.push('/movie/' + this.state.movieType + '/' + page)

    }
}

// 在 React 中，可以使用 fetch API 来获取数据，它是基于 Promise 封装的



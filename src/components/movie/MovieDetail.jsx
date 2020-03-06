import React, { Component } from 'react'

// 导入 antd UI
import { Button, Icon, Spin, Alert } from 'antd'

// 导入 fetch-jsonp
import fetchjsonp from 'fetch-jsonp'

export default class MovieDetail extends Component {
    constructor (props) {
        super(props)
        this.state = {
            info: {}, // 电影信息对象
            isloading: true // 正在加载
        }
    }

    // 获取数据
    componentWillMount() {
        this.loadInfo()
        
    }

    // 加载数据
    loadInfo = () => {
        fetchjsonp('https://douban.uieee.com/v2/movie/subject/' + this.props.match.params.id)        
        .then(response => response.json())
        .then(data => {
            this.setState({
                info: data,
                isloading: false
            })
            //console.log(data.images.large);
        })
    }
    
    render() {
        return (
            <div>
           
                <Button type="primary" onClick={this.goBack}>
                    <Icon type="left" />
                    返回电影列表页面
                </Button>
                
                {this.renderInfo()}
            </div>
        )
    }

    // 渲染信息
    renderInfo = () => {
        if(this.state.isloading) {
            return <Spin tip="Loading...">
                <Alert
                message="正在加载电影详细数据"
                description="精彩内容，马上呈现"
                type="info"
                />
            </Spin>
        }
        else {
            return <div>
                <div style={{ textAlign: "center", lineHeight: '30px'}}>
                    <h1>{this.state.info.title}</h1>
                    <img src={'https://images.weserv.nl/?url=' + this.state.info.images.large} />
                    <p>{this.state.info.summary}</p>
                </div>
        </div>
        }
        
    }

    // 返回上一级
    goBack = () => {
        this.props.history.go(-1)
    }
}

import React, { Component } from 'react'

// 导入样式
import styles from '@/css/movie_item.scss'

// 导入 UI
import { Rate } from 'antd'

export default class MovieItem extends Component {
    constructor (props) {
        super(props)
        this.state = {}
    }
    
    render() {
        //console.log(this.props.images.small)
        return (
            <div className={styles.box} onClick={this.goDetail}>
                {/* 链接前加上https://images.weserv.nl/?url= 防止出现盗链错误403 */}
                <img src={'https://images.weserv.nl/?url=' + this.props.images.small} className={ styles.img }/>
                <h4>电影名称：{ this.props.title }</h4>
                <h4>上映年份：{ this.props.year }年</h4>
                <h4>电影类型：{ this.props.genres.join(',') }</h4>
                <Rate disabled allowHalf defaultValue={this.props.rating.average/2} />
            </div>
        )
    }

    goDetail = () => {
        //console.log(this.props);
        this.props.history.push('/movie/detail/' + this.props.id)
    }
}

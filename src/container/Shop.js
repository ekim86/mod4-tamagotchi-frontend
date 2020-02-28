import React, { Component } from 'react'
import * as requests from '../requests'
import Item from '../component/Item'

class Shop extends Component {
    state = {
        items: []
    }

    componentDidMount() {
        requests.getAllItems()
            .then(items => this.setState(() => ({ items })))
    }

    renderItems = (category) => {
        return this.state.items.filter(item => item.category === category).map(item => {
            return <Item key={item.id} {...item} clickHandler={this.buyItem} />
        })
    }

    buyItem = (item_id) => {
        if(this.props.money >= this.state.items.find(item => item.id === item_id).price) {
            const newInventory = { status_id: this.props.status_id, item_id }
            requests.buyItem(newInventory)
                .then(json => {
                    if(json && json.inventory) {
                        this.props.updateBuyInventory(json.inventory)
                        this.props.updateMoney(json.money)
                    }
                })
        }
    }

    render() {
        return (
            <div className="shop">
                <h1 className="center">Shop</h1>
                <h2 className="center">Food</h2>
                {this.renderItems('food')}
                <h2 className="center">Toys</h2>
                {this.renderItems('toy')}
            </div>
        )
    }
}

export default Shop
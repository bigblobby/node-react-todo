import React from 'react';
import { getProducts } from "../api";
import { Link } from "react-router-dom";

export default class ProductListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timer: null,
            loading: false,
            set: 1,
            products: []
        };

        this.onScroll = this.onScroll.bind(this);
        this.fetchProducts = this.fetchProducts.bind(this);
    }

    componentDidMount(){
        this.fetchProducts();
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll(){
        const self = this;
        if(this.state.timer) {
            clearTimeout(this.state.timer);
        }
        this.setState({
            timer: setTimeout(function() {
                console.log( "Firing!" );
                if(window.innerHeight + document.documentElement.scrollTop > (document.documentElement.offsetHeight - 200)){
                    if(!self.state.loading && self.state.hasMore){
                        self.fetchProducts();
                    }
                }
            }, 20)
        });
    }

    fetchProducts(){
        this.setState({loading: true}, () => {
            getProducts({set: this.state.set})
                .then(results => {
                    this.setState(prevState => ({
                        products: [
                            ...prevState.products,
                            ...results.data.result
                        ],
                        set: prevState.set + 1,
                        loading: false,
                        hasMore: results.data.total > prevState.products.length
                    }));
                });
        });
    }

    render(){
        const {products, hasMore} = this.state;

        return(
            <div className="product-list">
                <Link to={'/article'}>Articles</Link>
                <h1>Infinite scroll</h1>
                {
                    products.length && products.map(product => {
                        return (
                            <div key={product.id} className="product">
                                <h2>{product.id} - {product.name}</h2>
                                <h3>£{product.price}</h3>
                            </div>
                        );
                    })
                }
                {
                    !hasMore && <div>No more products.</div>
                }
            </div>
        );
    }
}

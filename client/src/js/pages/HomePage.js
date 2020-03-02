import React from 'react';
import { connect } from 'react-redux';
import Tabs from "../components/Tabs/Tabs";
import Api from "../api";

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchOpen: false,
            query: '',
            results: []
        };
    }

    handleFocus = () => this.setState({ searchOpen: true });
    handleBlur = () => this.setState({ searchOpen: false });

    handleChange = (e) => {
        this.setState({
            query: e.target.value
        }, this.doSearch);
    };

    doSearch = () => {
        if(this.state.query.length > 2) {
            Api.articleSearch({ query: this.state.query })
                .then(results => {
                    this.setState({ results: results.data.result });
                });
        } else {
            this.setState({ results: [] });
        }
    };

    render() {
        const { searchOpen, results } = this.state;

        return (
            <div>
                <div className="search">
                    <input
                        type="text"
                        value={ this.state.query }
                        onFocus={ this.handleFocus }
                        onBlur={ this.handleBlur }
                        onChange={ this.handleChange }
                    />
                    <div className="results">
                        {
                            results.length > 0 && searchOpen && results.map(item => {
                                return <div key={ item.id }>{ item.name }</div>
                            })
                        }
                    </div>
                </div>
                <Tabs>
                    <div>
                        <Tabs.Tab id="a">one</Tabs.Tab>
                        <Tabs.Tab id="b">two</Tabs.Tab>
                    </div>
                    <div>
                        <Tabs.TabPanel id="a">Hello</Tabs.TabPanel>
                        <Tabs.TabPanel id="b">Goodbye</Tabs.TabPanel>
                    </div>
                </Tabs>
            </div>
        );
    }
}

export default connect(null, null)(HomePage);

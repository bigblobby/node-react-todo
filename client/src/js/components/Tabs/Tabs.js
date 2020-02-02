import React from 'react';
import {tabContext} from "./TabsContext";
import Tab from "./Tab";
import TabPanel from "./TabPanel";
const {Provider} = tabContext;

export default class Tabs extends React.Component {
    static Tab = Tab;
    static TabPanel = TabPanel;

    constructor(props) {
        super(props);

        this.state = {
            activeId: 'a'
        };
    }

    handleClick = (id) => {
        this.setState({activeId: id});
    };

    render(){
        const {activeId} = this.state;
        const {children} = this.props;

        return (
            <div className="tabs">
                <Provider value={{handleClick: this.handleClick, activeId: activeId}}>{children}</Provider>
            </div>
        )
    }
}

import React from 'react';
import {tabContext} from "./TabsContext";
const {Consumer} = tabContext;

export default class TabPanel extends React.Component {
    render(){
        const {id, children} = this.props;

        return(
            <Consumer>
                {(value) => {
                    return(
                        <div className={"tab-panel " + (id === value.activeId ? 'active' : '')}>{children}</div>
                    )
                }}
            </Consumer>
        );
    }
}

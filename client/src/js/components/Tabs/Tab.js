import React from 'react';
import {tabContext} from "./TabsContext";
const {Consumer} = tabContext;

export default class Tab extends React.Component {
    render(){
        const {id, children} = this.props;
        
        return(
            <Consumer>
                {(value) => {
                    return(
                        <button onClick={() => value.handleClick(id)}>{children}</button>
                    )
                }}
            </Consumer>
        );
    }
}

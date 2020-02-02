import React from 'react';
import Tabs from "../components/Tabs/Tabs";

export default class HomePage extends React.Component {
    render(){
        return(
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
        );
    }
}

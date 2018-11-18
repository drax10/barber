import React, {Component} from 'react';
import './App.css';

import ProjectPreview from './ProjectPreview';
import ComponentSettings from './ComponentSettings';

class App extends Component {
  state = {
    project: {
      root: 124124,
      124124: {templateName: "body", data: {emailSubject: "Hello World",beforeHeading: "DEF",afterHeading: "ABC",headingText: "This is the heading"}, children: [ 99123,35231,64713,46269 ]},
      99123: {templateName: "header", data: { content: "Wuzzup?!", fontColor: "orange" }},
      35231: {templateName: "paragraph", data: { content: "Testing" }},
      64713: {templateName: "paragraph", data: { content: "This" }},
      46269: {templateName: "footer", data: { content: "Copyright 2018" }}
    },
    selectedComponentId: 124124
  };

  updateComponentOrder = ( componentOrder ) => {
    var newState = this.state;
    newState.project[this.state.project.root].children = componentOrder;
    this.setState(newState);
  };
  setselectedComponentId = ( componentId ) => {
    this.setState({ selectedComponentId: componentId !== -1 ? componentId : this.state.project.root });
  };
  updateSelectedComponentData = ( newData ) => {
    var newState = this.state;
    newState.project[this.state.selectedComponentId].data = newData;
    this.setState(newState);
  }
  render() {
    return (
      <>
        <ProjectPreview
          selectedComponentId = { this.state.selectedComponentId }
          setselectedComponentId = { this.setselectedComponentId }
          components = { this.state.project }
          componentOrder = { this.state.project[this.state.project.root].children }
          updateComponentOrder = {this.updateComponentOrder}/>
        <ComponentSettings
          selectedComponentData = { this.state.project[this.state.selectedComponentId] }
          updateSelectedComponentData = { this.updateSelectedComponentData }
         />
      </>
    );
  }
}

export default App;

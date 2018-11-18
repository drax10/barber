import React, {Component} from 'react';
import components from './components.js';

class TextInput extends Component {
  render() {
    return (
      <div>
        <label htmlFor={`text-${this.props.name}`}>{this.props.label}</label>
        <input type="text"
            id={`text-${this.props.name}`}
            value={this.props.data[this.props.name]}
            onChange={(e)=>this.props.updateValue(this.props.name, e.target.value)} />
      </div>
    );
  };
}

class ComponentSettings extends Component {
  updateValue( name, value ) {
    var { data } = this.props.selectedComponentData;
    data[name] = value;
    this.props.updateSelectedComponentData( data );
  };
  render(){
    if ( this.props.selectedComponentData ) {
      const { templateName, data } = this.props.selectedComponentData;
      const { options } = components[templateName]
      return (
        <div id="settings">
          <div><h3>{templateName}</h3></div>
          { options.map((x,i) => <TextInput key={i} {...x} data={data} updateValue={this.updateValue.bind(this)} />) }
        </div>
      );
    } else {
      return (
        <div id="settings"></div>
      )
    }
  }
}

export default ComponentSettings;

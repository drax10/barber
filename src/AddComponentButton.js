import React, {Component} from 'react';
import components from './components';

class AddComponentButton extends Component {
  constructor(props){
    super(props);

    this.state = {
      showModal: false
    }
  }
  showModal(){
    this.setState({showModal: true});
  }
  obstructionClick( e ){
    if ( e.target.className === "page-obstruction" ) {
      this.setState({showModal: true});
    }
  }
  addComponent( templateName ){
    this.setState({ showModal: false });
    this.props.addComponentToRoot({
      templateName,
      data: components[templateName].default
    });
  }
  render(){
    return (
      <>
        <button className="fab" onClick={this.showModal.bind(this)}>+</button>
        {this.state.showModal ? (
          <div className="page-obstruction" onClick={this.obstructionClick.bind(this)}>
            <div className="modal">
              <h3>Lorem Ipsum Dolor sit amet</h3>
              <hr />
              <br />
              {Object.keys(components).map(
                (componentName, index) => <button key={index} className="add-component-button" onClick={()=>this.addComponent(componentName)}>{componentName}</button>
              )}
              <button className="add-component-button">Hello World</button>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default AddComponentButton;

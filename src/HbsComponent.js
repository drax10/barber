import Handlebars from 'handlebars';
import React, {Component} from 'react';
const Babel = require('@babel/standalone');
const HTMLtoJSX = require('./htmltojsx');

class HbsComponent extends Component {

  stateCache = {};

  hash(str) {
    var hash = 0, i, chr;
    if (str.length === 0) return 0;
    for (i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

  getComponentJSX(){
    const {template, data, props} = this.props;

    Handlebars.registerHelper( 'children', key => `{{{{children?children["${key}"]:null}}}}` );

    const converter = new HTMLtoJSX({ createClass: false });
    let componentJSX = converter.convert( Handlebars.compile(template)(data) )
        // Deal with HTMLtoJSX converting {{var}} to {'{'}{'{'}var{'}'}{'}'}
        .replace(/{'{'}{'{'}{'{'}{'{'}(.*){'}'}{'}'}{'}'}{'}'}/g, '{$1}')

    if ( props ) {
      const propsString = Object.keys(props).map( propKey => `${propKey}={props.${propKey}}` ).join(' ');
      componentJSX = componentJSX.replace(/(\/?)>/, " "+propsString+"$1>");
    }

    return Babel.transform( componentJSX, { presets: ['react'] } ).code;
  }

  render() {
    const { children, props, data } = this.props;

    const dataHash = this.hash(JSON.stringify(data));
    
    let renderScript;
    if ( this.stateCache[dataHash] ) {
      renderScript = this.stateCache[dataHash];
    } else {
      renderScript = this.getComponentJSX();
      this.stateCache[dataHash] = renderScript;
    }

    return window.eval.call(
      window,
      '(function (React, children, props) {return '+renderScript+'})'
    )(React, children, props);
  }
}

export default HbsComponent;

import Handlebars from 'handlebars';
import React from 'react';
const Babel = require('@babel/standalone');
const HTMLtoJSX = require('htmltojsx');

// TODO: Add a way to add other attributes to the base node output in JSX
const HbsComponent = function({ template, data, children, props }){

  Handlebars.registerHelper( 'children', key => `{{children["${key}"]}}` );

  template = Handlebars.compile(template)(data);

  const converter = new HTMLtoJSX({ createClass: false });
  let componentJSX = converter.convert(template)
      // Deal with HTMLtoJSX converting {{var}} to {'{'}{'{'}var{'}'}{'}'}
      .replace(/{'{'}{'{'}(.*){'}'}{'}'}/g, '{$1}')

  if ( props ) {
    const propsString = Object.keys(props).map( propKey => `${propKey}={props.${propKey}}` ).join(' ');
    componentJSX = componentJSX.replace(/(\/?)>/, " "+propsString+"$1>");
  }

  let componentRenderScript = Babel.transform(
    componentJSX,
    { presets: ['react'] }
  ).code;

  return window.eval.call(
    window,
    '(function (React, children, props) {return '+componentRenderScript+'})'
  )(React, children, props);
}

export default HbsComponent;

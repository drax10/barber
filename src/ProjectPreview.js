import React, {Component} from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import componentInformation from './components.js';
import HbsComponent from './HbsComponent';

const ComponentPreview = SortableElement(({setselectedComponentId, selectedComponentId, componentData, componentId}) => {
  var toggleSelected = () => {
    if ( componentId !== selectedComponentId ) {
      setselectedComponentId(componentId);
    } else {
      setselectedComponentId(-1);
    }
  }
  return <HbsComponent
    template={componentInformation[componentData.templateName].template}
    data={componentData.data}
    props={{ className: "component", onClick: toggleSelected }} />
});

const ProjectPreviewHOC = SortableContainer(({componentOrder, components, setselectedComponentId, selectedComponentId}) => {
  return <HbsComponent
            template={componentInformation[ components[components.root].templateName ].template}
            data={components[components.root].data}
            children={{"content": componentOrder.map((componentId, index) => (
              <ComponentPreview
                key={`item-${index}`}
                index={index}
                componentId={componentId}
                componentData={components[componentId]}
                selectedComponentId={selectedComponentId}
                setselectedComponentId={setselectedComponentId} />
            ))}} />
});

class ProjectPreview extends Component {
  onSortEnd = ({oldIndex, newIndex}) => {
    this.props.updateComponentOrder(
      arrayMove(this.props.componentOrder, oldIndex, newIndex)
    );
  };
  render(){
    return (
      <div id="preview">
        <ProjectPreviewHOC
          componentOrder={this.props.componentOrder}
          components={this.props.components}
          onSortEnd={this.onSortEnd}
          selectedComponentId={this.props.selectedComponentId}
          setselectedComponentId={this.props.setselectedComponentId}
          distance={20} />
      </div>
    );
  }
}

export default ProjectPreview;

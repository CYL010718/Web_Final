import React from 'react';

export default function FloatingActionButtons(props) {
  var ifDefaultGroup = () => {
    if (props.groupID === props.defaultGroupID ) return <div style={{backgroundColor:'pink', height:'15px', width:'15px', borderRadius:'50%'}}/>
    else return <div style={{backgroundColor:'white', height:'15px', width:'15px', borderRadius:'50%'}}/>
  }
  return (
    <div>
      {ifDefaultGroup()}
    </div>
  );
}
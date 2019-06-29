import React, {Component}from 'react';
import MaterialTable from 'material-table';
import {CREATE_GROUP_MUTATION, EDIT_GROUP_NAME_MUTATION,DELETE_GROUP_MUTATION,GROUP_QUIT_MUTATION} from '../graphql/mutations'
import './fontsForGroups.css'
import { Mutation } from 'react-apollo';


export default function MaterialTableDemo(props){ 
//class MaterialTableDemo extends Component{
 
  let data = props.groups.map(group => {
    return {
      id: group.id,
      name: group.name};
  })
  console.log(data);
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
    ],
    data: data,
  });

  return (
    <div style={{fontSize:'14px'}} size='small'>
      <Mutation mutation = {CREATE_GROUP_MUTATION}>
        {createGroup => {
          return(
            <Mutation mutation = {EDIT_GROUP_NAME_MUTATION}>
              {EditGroupName => {
                return(
                  <Mutation mutation = {DELETE_GROUP_MUTATION}>
                  {deleteGroup => {
                    return(
                      <Mutation mutation = {GROUP_QUIT_MUTATION}>
                        {quitGroup => {
                          return(
                            <MaterialTable
                        title="Groups"
                        columns={state.columns}
                        data={state.data}
                        
                        actions={[
                          {
                            icon: 'add',
                            iconProps:{fontSize:'14px'},
                            tooltip: 'add user',
                            onClick: (event, rowData) => alert('add user')
                          },
                          {
                            icon: 'subdirectory_arrow_left',
                            tooltip: 'quit group',
                            onClick: (event, rowData) => {
                              if(rowData.id === props.defaultGroup){
                                alert('Cannot quit your default group! Choose another group for default first')
                                return;
                              }
                              quitGroup({
                                variables:{
                                  id: rowData.id
                                }
                              })
                            }
                          },
                          {
                            icon: 'add',
                            tooltip: 'show calendar',
                            onClick: (event, rowData)  => props.handleGroupChange(rowData.id)
                          }
                        ]}
                        editable={{
                            onRowAdd: newData =>
                            new Promise(resolve => {
                                resolve();
                                const data = [...state.data];
                               /* data.push(newData);
                                console.log(newData);*/
              
                                createGroup({
                                  variables:{
                                    name: newData.name
                                  }
                                })
                                setState({ ...state, data });
                                }),
                            onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                                resolve();
                                const data = [...state.data];
                                data[data.indexOf(oldData)].name = newData.name;
                                EditGroupName({
                                  variables:{
                                    id: data[data.indexOf(oldData)].id,
                                    name: newData.name
                                  }
                                })
                                setState({ ...state, data });
                                }),
                            onRowDelete: oldData =>
                            new Promise(resolve => {
                                resolve();
                                if(data[data.indexOf(oldData)].id === props.defaultGroup) {
                                  alert('Cannot delete your default group! Choose another group for default first')
                                }
                                else{
                                  const data = [...state.data];
                                  deleteGroup({
                                    variables:{
                                      id:data[data.indexOf(oldData)].id                             
                                      }
                                  })
                                  data.splice(data.indexOf(oldData), 1);
                                  
                                  setState({ ...state, data });
                                  }
                                }
                            )
                        }}
                        />
                          )
                        }}
                      </Mutation>
                      
                    )
                  }}
                  </Mutation>
                    
                )
              }

              }
            </Mutation>
               
          )
        }}
      </Mutation>
       
    </div>
  );
}
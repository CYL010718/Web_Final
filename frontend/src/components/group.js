import React from 'react';
import MaterialTable from 'material-table';
import './fontsForGroups.css'


export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
    ],
    data: [
      { name: 'Mehmet', },
      {
        name: 'Zerya Betül',
      },
    ],
  });

  return (
    <div style={{fontSize:'14px'}} size='small'>
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
            onClick: (event, rowData) => alert('quit group')
          }
        ]}
        editable={{
            onRowAdd: newData =>
            new Promise(resolve => {
                resolve();
                const data = [...state.data];
                data.push(newData);
                setState({ ...state, data });
                }),
            onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
                resolve();
                const data = [...state.data];
                data[data.indexOf(oldData)] = newData;
                setState({ ...state, data });
                }),
            onRowDelete: oldData =>
            new Promise(resolve => {
                resolve();
                const data = [...state.data];
                data.splice(data.indexOf(oldData), 1);
                setState({ ...state, data });
                })
        }}
        />
    </div>
  );
}
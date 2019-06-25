import React from 'react';

export default ({year, month}) =>{
    return(
        <h2 style = {{height: '5em', width: '5em', align: 'center'}}>
            {year} 年 {month} 月
        </h2>
    )
}
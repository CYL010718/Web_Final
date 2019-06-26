import React, {Component} from "react";

class  Toolbar extends Component {
  
  render(){
    return (
        <div style={{width:'400px', height:'100%', position:'absolute', right:'0', top:'0',backgroundColor:'#f3e8e7', 
                     display: 'flex', flexDirection: 'row-reverse', justifyContent:'flex-start'}}>
            <div style={{width:'50px', height:'100%',backgroundColor:'#344661', 
                         display: 'flex', flexDirection: 'row-reverse', justifyContent:'flex-start'}}></div>
            <div style={{width:'350px', height:'100%', overflowX:'hidden', overflowY:'hidden'}}>
                <div style={{width:'100%', height:'20%',padding:'5px 5px 0 5px'}}>
                    <div style={{width:'340px', height:'100%', backgroundColor:'pink', opacity:0.3}}>

                    </div>
                </div>
                <div style={{width:'100%', height:'50%',padding:'5px 5px 0 5px'}}>
                    <div style={{width:'340px', height:'100%', backgroundColor:'lightgreen', opacity:0.3}}>

                    </div>
                </div>
                <div style={{width:'100%', height:'30%',padding:'5px 5px 0 5px'}}>
                    <div style={{width:'340px', height:'100%', backgroundColor:'lightblue', opacity:0.3}}>

                    </div>                  
                </div>
            </div>
        </div>
    )
  }
}

export default Toolbar;

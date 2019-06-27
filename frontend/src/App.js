import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import TimeHub from './TimeHub'
class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App" style = {{height:'100%'}}>
					<TimeHub/>
				</div>
			</BrowserRouter>
		)
	}
}


export default App

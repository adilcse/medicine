import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Searchcomponent from './Components/search/Search';
import * as serviceWorker from './serviceWorker';
import Home from './Home';
import AddItems from './Components/addItem/addItems';
const styleLink = document.createElement("link");

styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
ReactDOM.render(<div align="center">
					<Home/>
				</div>	

	, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

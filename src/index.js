import React from 'react';
import ReactDOM from 'react-dom/client';
//import { Provider } from 'react-redux';
//import {BrowserRouter} from 'react-router-dom';
//import App from './App';
import reportWebVitals from './reportWebVitals';
//import store from './redux/redux-store';
import './index.css';
import SocialNetworkApp from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

/*root.render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    </BrowserRouter>
);*/

root.render(<SocialNetworkApp />);

reportWebVitals();
import React from 'react';
import ReactDOM from 'react-dom/client';

// styles
import './Styles/MainStyles.css';
import './Styles/ListPageStyles.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';


import ListPage from './ListPage';
import DetailsPage from './DetailsPage';
import NewRecordForm from './NewRecordForm';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <h1 className='main-heading'>PresentConnection React/c# task</h1>
    <Router>
          <Routes>
            <Route path='/' element={<ListPage />} />
            <Route path='/details/:date' element={<DetailsPage />} />
            <Route path='/contact' element={<NewRecordForm />} />
          </Routes>
      </Router>
  </React.StrictMode>
);

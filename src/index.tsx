import React from 'react';
import ReactDOM from 'react-dom/client';

// styles
import './Styles/MainStyles.css';
import './Styles/ListPageStyles.css';
import './Styles/DetailsPageStyles.css';
import './Styles/NewRecordFormStyles.css';

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
    <Router>
      <h1 className='main-heading'>PresentConnection React/c# task</h1>
      <Routes>
        <Route path='/' element={<ListPage />} />
        <Route path='/details/:date' element={<DetailsPage />} />
        <Route path='/newRecord' element={<NewRecordForm />} />
      </Routes>
    </Router>
);

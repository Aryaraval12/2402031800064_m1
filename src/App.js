import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
// import InsertRecord from './InsertRecord';
// import InsertRecordSchool from './InsertRecordSchool';
// import DisplayRecord from './DisplayRecord';
// import Crud from './Crud';
import Mongodb1 from './Mongodb1';
// import Mongodb_practice2 from './Mongodb_practice2';
// import Mongo_img1 from './Mongo_img1';
// import Mongodb_img_practice1 from './Mongodb_img_practice1';
import DisplayImage from './Display_Image';
import EmailVerification from './Email_varification';
import Counter, { store } from './Redux_ex1';
import TodoApp from './TodoApp';
import { store as todoStore } from './Redux_ex2';

import Pokemon_API3 from './Pokemon_API3';

function App(){
  return (
    <div>
      {/* <Provider store={store}>
        <Counter/>
      </Provider> */}
        {/* <Provider store={todoStore}>
        <TodoApp/>
      </Provider>
      <TodoApp/> */}
      {/* <Pokemon_API3/> */}
      

      
      {/* <BrowserRouter>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div className = "nav-item">
            <div class="collapse navbar-collapse   gap-3" id="navbarNav">
              <span class="navbar-toggler-icon"></span>
                  <Link to="/Display_image" className="nav-item btn btn-success gap-3">Display_image</Link>  
                  <Link to="/Crud" className="nav-item btn btn-success gap-3">Crud</Link>
                  <Link to="/Email_varification" className="nav-item btn btn-success gap-3">Email_varification</Link>
            </div>  
          </div>
        </nav>
        <Routes>
          <Route path="/Display_image" element={<DisplayImage/>}/>
          <Route path="/Crud" element={<Crud/>}/>
          <Route path="/Email_varification" element={<EmailVerification/>}/>
        </Routes>
      </BrowserRouter> */}
  {/* <InsertRecord/> */}
  <br/>
  {/* <InsertRecordSchool/> */}
  {/* <DisplayRecord/> */}
  {/* <Crud/>  */}
  <Mongodb1/>
  {/* <Mongodb_practice2/> */}
  {/* <Mongo_img1/>
  <Display_Image/> */}
  
  {/* <Mongodb_img_practice1/> */}
  {/* <Project1 /> */}
  {/* <EmailForm /> */}
  {/* <EmailVerification/> */}
    </div>
  )
}
export default App;
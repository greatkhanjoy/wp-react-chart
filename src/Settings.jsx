import React from 'react'
import {
  BrowserRouter as Router,
  HashRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Lists from './components/Lists';
import AddNew from './components/AddNew';

const Settings = () => {
  return (
    <HashRouter>
      <div className='w-full px-10 py-10 '>
      <Toaster position="bottom-right" />
        <div className='w-full bg-white'>
          <div className='w-full flex justify-center py-5 gap-10'>
            <Link to={'/'} className='px-6 py-2 bg-green-500 text-white font-semiBold hover:text-white hover:bg-green-600'>Overview</Link>
            
          </div>

        <div className='bg-[#f8fff6] px-10 py-10'>
          <Routes>
                <Route index element={<Lists />} />
                <Route path="/add-new" element={<AddNew />} />
          </Routes>
        </div>
        </div>
      </div>
    </HashRouter>
  )
}

export default Settings
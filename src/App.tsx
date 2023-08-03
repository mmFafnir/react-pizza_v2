import {Routes, Route} from "react-router-dom";
import { useTypeSelector } from "./hooks/useTypeSelector";
import { UsersStatusActions } from "./store/Slices/loginSlice/type";

import Main from "./page/Main";
import Basket from "./page/Basket";
import Pizza from "./page/Pizza";
import NotFound from "./page/NotFound";
import Admin from "./page/Admin";

import MainLayout from './layouts/MainLayout'; 

import './assets/scss/App.scss'
import './assets/scss/anim.scss'

const App = () => {
  
  const { user } = useTypeSelector(state=> state.login);
  
  return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Main />} />
          <Route path="basket" element={<Basket />} />
          <Route path="pizza/:defaultId" element={<Pizza />} />
          <Route path="*" element={<NotFound />} />

          {user === UsersStatusActions.ADMIN ? <Route path="/admin" element={<Admin />} /> : null} 
          
        </Route>
        
      </Routes>
  );
}

export default App;

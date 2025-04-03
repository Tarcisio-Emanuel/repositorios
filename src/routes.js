import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Repositorios from './pages/Repositorios';
import Main from './pages/Main';

export default function MayRoutes(){
    return(

        <BrowserRouter>
        
        <Routes>
        
        <Route exact path='/'  Component={Main}/>
        <Route exact path='/repositorios/:repositorios'  Component={Repositorios} />

        </Routes>
        </BrowserRouter>
    )
}
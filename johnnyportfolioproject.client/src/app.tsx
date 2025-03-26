import NavigationBar from './Pages/Navigation/NavComponent.tsx';
import {Routes, Route } from 'react-router';
import HomePage from './Pages/Home_Portfolio/HomePage.tsx'
import ContactMePage from './Pages/ContactMe/ContactMe.tsx'
import InvalidUrlPage from './Pages/Errors/InvalidUrlPage.tsx'
import BuildsPage from './Pages/GameBuilds/Builds.tsx';

function App() {
    return(

        <div className="App">
            <NavigationBar />
            <br/>

            <Routes>
                <Route path='/' element={<HomePage />} errorElement={<InvalidUrlPage />}></Route>
                <Route path='/Contact' element={<ContactMePage />} errorElement={<InvalidUrlPage />}></Route>
                <Route path='/Builds' element={<BuildsPage /> } errorElement={<InvalidUrlPage />}></Route>
              </Routes>
        </div>

    );
}

export default App;
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import SearchBar from './components/SearchBar';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';

function App (){
  return (
    <div className='App'>
      <BrowserRouter>
          <SearchBar />
          <Switch>
            <Route exact path="/">
              <HomeScreen />
            </Route>
            <Route path="/search">
              <SearchScreen />
            </Route>
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

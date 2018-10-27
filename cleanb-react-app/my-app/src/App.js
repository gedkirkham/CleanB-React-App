import React  from 'react';
import LoginOrCreateAccount from './LoginOrCreateAccount';
import FooterNavBar from './Components/FooterNavBar';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Post from './Components/Post';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <div className="cleanb-app container">
                <LoginOrCreateAccount/>
                <h1 className="blue-text container"><NavLink to="/">CleanB</NavLink></h1>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/About' component={About} />
                    <Route path='/Contact' component={Contact} />
                    <Route path='/:post_id' component={Post} />
                </Switch>
                <FooterNavBar/>
            </div>
        </BrowserRouter>
    );
  }

export default App;
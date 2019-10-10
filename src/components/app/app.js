import React, { Component } from 'react';
import './app.css';

import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from '../../services/swapi-service';
import ErrorBoundry from '../error-boundry';
import { SwapiServiceProvider } from '../swapi-service-context';
import DummySwapiService from '../../services/dummy-swapi-service';
import {
    PeoplePage,
    PlanetPage,
    StarshipPage,
    LoginPage,
    SecretPage
} from '../pages';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StarshipDetails } from '../sw-components';

export default class App extends Component {


    state = {
        swapiService: new SwapiService(),
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        });
    };

    onServiceChange = () => {
        this.setState(({ swapiService }) => {

            const Service = swapiService instanceof SwapiService ?
                DummySwapiService : SwapiService

            return {
                swapiService: new Service()
            };
        });
    };

    render() {

        const { isLoggedIn } = this.state;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Router>
                        <div className="app">
                            <Header onServiceChange={this.onServiceChange} />
                            <RandomPlanet updateInterval={2000} />
                            <Switch>
                                <Route path="/" render={() => <h1>Welcome to Star Wars</h1>} exact />
                                <Route path="/people/:id?" component={PeoplePage} />
                                <Route path="/people" render={() => <h1>People</h1>} />
                                <Route path="/planets" component={PlanetPage} />
                                <Route path="/starships" exact component={StarshipPage} />
                                <Route path="/starships/:id"
                                    render={({ match }) => {
                                        const { id } = match.params
                                        return <StarshipDetails itemId={id} />
                                    }
                                    }
                                />
                                <Route path="/login"
                                    render={() => (
                                        <LoginPage isLoggedIn={isLoggedIn}
                                            onLogin={this.onLogin} />
                                    )} />

                                <Route path="/secret"
                                    render={() => (
                                        <SecretPage isLoggedIn={isLoggedIn} />
                                    )} />

                                <Route render={()=> <h1>Page not found</h1>}/>
                            </Switch>

                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>

        );
    };
};
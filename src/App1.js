import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Home from './Home';
import Quiz from './quiz';
import Results from "./results"

export default function App() {

        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route  path="/quiz/1" component={Quiz}/>
                        <Route  path="/quiz/results" component={Results}/>
                    </Switch>
                </Router>
            </div>
        );

};


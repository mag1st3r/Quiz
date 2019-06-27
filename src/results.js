import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import { withRouter } from "react-router";
import Home from "./Home"

function res(value) {
    return value === "true";
}

export default function Results(props) {
    const answered = props.location.state.state.userAnswer;
    const calc = answered.filter(res);
    return(
            <div>
                <h4>Results</h4>
                <p>Your answered correctly on {calc.length} of {answered.length} </p>
                <Link to="/"> Back to Home</Link>
                <Switch>
                    <Route exact path="/" component={Home}/>
                </Switch>
            </div>

    )
}
import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import { withRouter } from "react-router";
import Home from "./Home";
import Results from "./results"


const questionAPI = {
    questionList: [
        {
            id: 1,
            question: "How can you access the state of a component from inside of a member function?",
            answerList: ["this.getState()", "this.prototype.stateValue", "this.state", "this.values"],
            answerId: "2"
        },
        {
            id: 2,
            question: "ReactJS is developed by _____?",
            answerList: ["Amazon", "Facebook", "Google", "Microsoft"],
            answerId: "1"
        },
    ]
}

function Answer(props) {
    let answer = props.answer;
    return (
        <div>
            {answer === false ? <div>The answer was incorrect!</div> : <div>The answer was correct!</div>}
        </div>
    )
}

function QuizRender({tests, id, inputChange, isCorrect, submit, next, results}) {
    let currentTest = tests[id - 1];
    return(
        <div>
            <p>Questions {id} of {tests.length}</p>

            <h4>{currentTest.question}</h4>

            <ul>
                {currentTest.answerList.map( (item, index)=>
                    <li key={index}>
                        <label onChange={inputChange}>
                            <input type="checkbox"
                                   id={index}
                            />
                            {item}
                        </label>
                    </li>
                )}
            </ul>
            {isCorrect === null ? <div> </div> : <Answer answer={isCorrect}/>}
            {isCorrect === null ? <button onClick={submit}>Submit</button> :
            tests.length === id ? <button onClick={results}> <Link to="/quiz/results"/>Results</button>
                    : <button onClick={next}>Next</button>  }
        </div>
    )
}

function isCorrect(checked, dataTests, id) {
    if(checked.length > 1) { return false }
    if(checked[0] == dataTests[id - 1].answerId){
        return true
    } else { return  false }
}



class Quiz extends React.Component {
    state = {
        userAnswer: [],
        indexQuestion: 1,
        checked: [],
        isCorrect: null
    }

    componentDidUpdate(revProps, prevState) {

        if(prevState.isCorrect !== null) {
            this.setState({
                checked: [],
                isCorrect: null
            });
        }
    }

    handleToggleInput = (target) => {
        const checkedId = target.id;
        let checked = this.state.checked;
        if(checked.includes(checkedId) ) {
            let newArr = [...checked];
            const index = newArr.indexOf(checkedId);
            newArr.splice(index, 1);
            this.setState({
                checked: newArr
            });

        }
        else {
            target.checked !== false ? this.setState({
                checked: [...checked, checkedId].sort()
            }) : console.log(target.checked);
        }
    }

    onSumbit = () => {
        const {checked, indexQuestion, userAnswer} = this.state;
        const tests = questionAPI.questionList;

        isCorrect(checked, tests, indexQuestion ) ? this.setState({ isCorrect: true,
                                                                    userAnswer: [...userAnswer, "true"] }) :
                                                    this.setState({ isCorrect: false,
                                                                    userAnswer: [...userAnswer, "false"] });
    }

    nextQ = () => {
        this.setState({
            indexQuestion: this.state.indexQuestion + 1
        });
    }

    results = () => {
        const state = this.state;
        this.props.history.push({
            pathname: '/quiz/results',
            state: { state }
        })
    }

    render() {
        const {indexQuestion} = this.state;
        console.log(this.state.userAnswer);
        console.log(this.state.checked);
        return (
            <div>
                <Switch>
                    <Route path="/quiz/results" render={ () =>
                        <Results questions={this.state.userAnswer}
                                 answers={questionAPI.questionList}/>
                    }/>
                    <Route path="/quiz/:number" render={() =>
                        <QuizRender tests={questionAPI.questionList}
                              id={indexQuestion}
                              inputChange={ (e) => {this.handleToggleInput(e.target)}}
                              submit={ () => {this.onSumbit()}}
                              isCorrect={this.state.isCorrect}
                              next={ () => {this.nextQ()}}
                              results={ ()=>{this.results()}}
                        />}/>
                    <Route exact path="/" component={Home}/>
                </Switch>
            </div>

        )
    }
}

export default  withRouter(Quiz);
import React from 'react';
import './App.css';
import Reviewer from "./components/reviewer/Reviewer";
import logo from './github-logo.svg';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="GitHub Logo" />
                <h1 className="App-title">Поиск ревьюера</h1>
            </header>
            <Reviewer />
        </div>
    );
}

export default App;

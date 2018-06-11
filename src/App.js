import React, { Component } from 'react';
import './App.css';
import Cell from './Cell';
class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      gridSize: [8, 8],
      maxDiamonds: 8
    };
    this.getRandomArray = this.getRandomArray;
    this.initialiseData = this.initialiseData;
    this.gotOneDiamond = this.gotOneDiamond;
    this.handleClick = this.handleClick;
    this.getRemainingDiamonds = this.getRemainingDiamonds;
  }
  gotOneDiamond () {
    this.setState({targetDiamonds: this.state.targetDiamonds - 1});
  }

  getRandomArray (min, max) {
    let arr = [];
    function rand () {
      var num = min + (Math.floor(Math.random() * (max - 1)));
      let ret = null;
      if (arr.indexOf(num) > 0) {
        ret = rand();
      } else {
        ret = num;
      }
      return ret;
    }
    for (let i = 0; i < 8; i++) {
      let num = rand();
      arr.push(num);
    }
    arr.sort((a, b) => a > b);
    return arr;
  }
  initialiseData () {
    let width = this.state.gridSize[0];
    let height = this.state.gridSize[1];
    let cells = this.state.gridSize[0] * this.state.gridSize[1];
    let diamonds = this.getRandomArray(1, cells);
    let grid = [];
    for (let i = 1; i <= width * height; i++) {
      let cell = {};
      cell.isClicked = false;
      cell.hasDiamond = false;
      if (diamonds.indexOf(i) > -1) {
        cell.hasDiamond = true;
      }
      grid.push(cell);
    }
    let temp = [];
    for (let i = 1; i <= this.state.maxDiamonds; i++) {
      temp.push('*');
    }
    this.setState({diamonds: diamonds, grid: grid, targetDiamonds: this.state.maxDiamonds, remainingDiamonds: temp, score: cells});
  }

  componentWillMount () {
    this.initialiseData();
  }

  handleClick (x) {
    let newScore = this.state.score;
    let newGrid = this.state.grid;
    // update score
    if (!newGrid[x - 1].isClicked) {
      newScore = newScore - 1;
    }
    newGrid[x - 1].isClicked = true;
    if (newGrid[x - 1].hasDiamond) {
      this.gotOneDiamond();
    }
    this.setState({grid: newGrid, score: newScore});
  }
  render () {
    let getclasses = (this.state.targetDiamonds > 0) ? 'grid' : 'grid finish';
    return (
      <div className='App'>
        <div className='header'>
          <div>
            <p><b>Remaining Diamonds in the Grid:</b>{this.state.targetDiamonds}</p>
            <p className='score'><b>Score : </b>{this.state.score}</p>
          </div>
          <div className={getclasses}>
            <h2>You finished the game.</h2>
            <br />
            <br />
            <h1>your final score is {this.state.score}</h1>
          </div>
        </div>
        <div className={getclasses}>
          {
            this.state.grid.map((cell, i) => {
              return (
                <Cell
                  key={i}
                  data={cell}
                  cellId={i + 1}
                  handleClick={this.handleClick.bind(this)}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default App;

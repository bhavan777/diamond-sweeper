import React, { Component } from 'react';
import './App.css';
import Row from './Row';
class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      gridSize: [8, 8],
      maxDiamonds: 8
    };
    this.getRandomArray = this.getRandomArray;
    this.initialiseData = this.initialiseData;
    this.handleClick = this.handleClick;
  }

  getRandomArray (min, max) {
    let arr = [];
    function rand () {
      var num = min + Math.round(Math.random() * max);
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
    let diamonds = this.getRandomArray(0, cells - 1);
    console.log(diamonds)
    let grid = [];
    for (let i = 0; i < width; i++) {
      let row = [];
      for (let j = 0; j < height; j++) {
        let cell = {};
        cell.isClicked = false;
        cell.hasDiamond = false;
        if (diamonds.indexOf((i * width) + j)) {
          cell.hasDiamond = true;
        }
        row.push(cell);
      }
      grid.push(row);
    }
    this.setState({diamonds: diamonds, grid: grid});
  }

  componentWillMount () {
    this.initialiseData();
  }

  handleClick (x, y) {
    console.log(x, y);
    let newGrid = this.state.grid;
    newGrid[x][y].isClicked = true;
    this.setState({grid: newGrid});
    console.log(this.state.grid[x][y]);
  }

  render () {
    return (
      <div className='App'>
        {
          this.state.grid.map((row, i) => {
            return (
              <Row
                key={i}
                data={row}
                rowId={i}
                handleClick={this.handleClick.bind(this)}
               />
            );
          })
        }
      </div>
    );
  }
}

export default App;

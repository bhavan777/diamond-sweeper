import React, { Component } from 'react';
import Cell from './Cell';

class Row extends Component {
  clickAtRow (x, y) {
    this.props.handleClick(x, y);
  }

  render () {
    return (
      <div className='row'>
        {
          this.props.data.map((cell, i) => {
            return (
              <Cell
                key={i}
                rowId={this.props.rowId}
                cellId={i}
                data ={cell}
                onCellClick={this.clickAtRow.bind(this, this.props.rowId)}
              />
            );
          })
         }
      </div>
    );
  }
}

export default Row;

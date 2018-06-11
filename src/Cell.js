import React, { Component } from 'react';

class Cell extends Component {
  clickAtCell (x, e) {
    this.props.onCellClick(x);
  }
  getClasses () {
    let classes = 'cell';
    classes += this.props.data.isClicked ? (this.props.data.hasDiamond ? ' has-diamond clicked' : ' clicked') : '';
    return classes;
  }

  render () {
    return (
      <div className={this.getClasses()} onClick={this.clickAtCell.bind(this, this.props.cellId)}>
      ?
      </div>
    );
  }
}

export default Cell;

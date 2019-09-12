import React from 'react';
import './style.css'
import './App.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(400).fill(null),
      xIsNext: true,
    };
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(this.state.squares) && squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  handleClickReset(){
    this.setState({
      squares: Array(400).fill(null),
      xIsNext: true,
    });
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    let board = [];
    for (let i = 0; i < 20; i++) {
      let rowBoard = [];
      for (let j = 0; j < 20; j++) {
        rowBoard.push(this.renderSquare(i*20 + j))    
      }
      board.push(<div className="board-row">
         {rowBoard}
      </div>)
    }

    const Style = {
      margin: '15px',
    };

    return (
      <div>
        <div className="status">{status}
          <button style={Style} onClick={() => this.handleClickReset()}>Chơi lại</button>
        </div>
        {board}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  return !null;
}

export default Game;

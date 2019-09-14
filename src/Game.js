import React from 'react';
import './style.css';

const MaxHeight = 20;
const MaxWidth = 20;

var value = -1;

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
      isEnded: false,
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
    
    if (this.state.isEnded || squares[i]) {
      return;
    }

    value = i;
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  handleClickReset() {
    this.setState({
      squares: Array(400).fill(null),
      xIsNext: true,
      isEnded: false,
    });
  }

  render() {

    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      this.state.isEnded = true;
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    let board = [];
    for (let i = 0; i < 20; i++) {
      let rowBoard = [];
      for (let j = 0; j < 20; j++) {
        rowBoard.push(this.renderSquare(i * 20 + j))
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

  if (value === -1) {
    return null;
  }

  var row = Math.floor(value / 20);
  var column = value % 20;

  var thisValue = squares[row * 20 + column];
  // Kiểm tra hàng dọc chứa điểm vừa đánh
  for (var index = row - 4; index <= row; index++) {

    // Nếu ô row + index (Ô đầu tiên của dãy 5) nằm ngoài bàn cờ
    if (index < 0) {
      continue;
    }

    // Trường hợp đủ 5 con trong bàn cờ
    var isWon = true;
    
    
    for (var i = index; i < index + 5; i++) {
      
      if (i > MaxHeight - 1) {
        isWon = false;
        break;
      }

      if (squares[i * MaxWidth + column] !== thisValue) {
        isWon = false;
        break;
      }
    }

    if (isWon === true) {
      return thisValue;
    }

  }

  // // Kiểm tra hàng ngang chứa điểm vừa đánh
  for (index = column - 4; index <= column; index++) {

    // Nếu ô column + index (Ô đầu tiên của dãy 5) nằm ngoài bàn cờ
    if (index < 0) {
      continue;
    }

    // Trường hợp đủ 5 con trong bàn cờ
    isWon = true;    
    for (i = index; i < index + 5; i++) {
      
      if (i > MaxWidth - 1) {
        isWon = false;
        break;
      }

      if (squares[row * MaxWidth + i] !== thisValue) {
        isWon = false;
        break;
      }
    }

    if (isWon === true) {
      return thisValue;
    }

  }

  // // Kiểm tra hàng chéo từ trái qua, trên xuống chứa điểm vừa đánh
  for (index = - 4; index <= 0; index++) {

    // Nếu ô column + index (Ô đầu tiên của dãy 5) nằm ngoài bàn cờ
    if (index + column < 0 || index + row < 0) {
      continue;   
    }

    // Trường hợp đủ 5 con trong bàn cờ
    isWon = true;    
    for (i = index; i < index + 5; i++) {
      
      if (i + column > MaxWidth - 1 || i + row > MaxHeight - 1) {
        isWon = false;
        break;
      }

      if (squares[(row + i) * MaxWidth + (column + i)] !== thisValue) {
        isWon = false;
        break;
      }
    }

    if (isWon === true) {
      return thisValue;
    }

  }

  // // Kiểm tra hàng chéo từ trái qua, dưới lên chứa điểm vừa đánh
  for (index = - 4; index <= 0; index++) {

    // Nếu ô column + index (Ô đầu tiên của dãy 5) nằm ngoài bàn cờ
    if (index + column < 0 || row - index > MaxHeight - 1) {
      continue;   
    }

    // Trường hợp đủ 5 con trong bàn cờ
    isWon = true;    
    for (i = index; i < index + 5; i++) {
      
      if (i + column > MaxWidth - 1 || row - i < 0) {
        isWon = false;
        break;
      }

      if (squares[(row - i) * MaxWidth + (column + i)] !== thisValue) {
        isWon = false;
        break;
      }
    }

    if (isWon === true) {
      return thisValue;
    }

  }
  return null;
}

export default Game;

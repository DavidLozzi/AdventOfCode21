const Board = ({ board }) => {
  
  return <div className="board">
    <div className="title">Bingo</div>
    {board.rows.map(row => 
      <div className="row">
        {row.line.map(col => 
          <div className="col">
            {col}
          </div>
        )}
      </div>
    )}
  </div>
}

export default Board
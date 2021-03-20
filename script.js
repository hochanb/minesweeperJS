var mineCount = 20;
var rows = 15;
var cols = 20;
var board=new Array();
var mines = new Array();

initBoard();
initHTML();

function initBoard() {
    let mineNum = 0;
    board=new Array(rows*cols);
    board.fill(0);
    do {
        let ran = Math.floor(Math.random() * rows * cols); /*랜덤지뢰위치*/
        if (check(board[ran])) {
            board[ran]=9;
            mineNum++;
        }
    } while (mineNum < mineCount);

    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            let minesAround=0;
            minesAround+=check(i-1,j-1);
            minesAround+=check(i,j-1);
            minesAround+=check(i+1,j-1);
            minesAround+=check(i-1,j);
            minesAround+=check(i+1,j);
            minesAround+=check(i-1,j+1);
            minesAround+=check(i,j+1);
            minesAround+=check(i+1,j+1);
            board[i*rows+j]=minesAround;
        }
    }
}

function check(i,j){
    if(i<0 || i>=rows || j<0 || j>=cols)
        return 0;
    else if(board[i*rows+j]==9)
        return 1; //숫자가 9면 지뢰
}


function initHTML() {
    var tbody = document.getElementById("board_tbody");
    for (let i = 0; i < rows; i++) {
        var newTr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            var newTd = document.createElement('td');
            newTd.textContent=board[i*rows+j];
            newTr.appendChild(newTd);
        }
        tbody.appendChild(newTr);
    }

}
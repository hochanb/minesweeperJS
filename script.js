var mineCount = 40;
var rows = 15;
var cols = 20;
var board;

initBoard();
initHTML();

function initBoard() {
    let mineNum = 0;
    board=new Array(rows*cols);
    board.fill(0);
    do {
        let ran = Math.floor(Math.random() * rows * cols); /*랜덤지뢰위치*/
        //if (check(ran/rows,ran%rows)===0) {
            board[ran]=9;
            mineNum++;
        //}
    } while (mineNum < mineCount);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if(board[i*rows+j]==9)
                continue;
            let minesAround = 0;
            minesAround += check(i - 1, j - 1);
            minesAround += check(i, j - 1);
            minesAround += check(i + 1, j - 1);
            minesAround += check(i - 1, j);
            minesAround += check(i + 1, j);
            minesAround += check(i - 1, j + 1);
            minesAround += check(i, j + 1);
            minesAround += check(i + 1, j + 1);
            board[i * rows + j] = minesAround;
        }
    }
}

function check(i,j){
    if(i<0 || i>=rows || j<0 || j>=cols)
        return 0;
    else if(board[i*rows+j]==9)
        return 1; //숫자가 9면 지뢰. 지뢰면 개수 +1
    else return 0;

}


function initHTML() {
    var tbody = document.getElementById("board_tbody");
    for (let i = 0; i < rows; i++) {
        var newTr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            var newTd = document.createElement('td');
            // if(board[i*rows+j]==9)
            //     newTd.textContent="※";
            // else if(board[i*rows+j]!=0)
            //     newTd.textContent=board[i*rows+j];
            
            newTd.setAttribute("class","closed");
            newTd.setAttribute("ind",i*rows+j);
            newTd.addEventListener("click",clicked);
            newTr.appendChild(newTd);
        }
        tbody.appendChild(newTr);
    }

}



// function createButton(){
//     var cells=document.querySelectorAll('td');
//     cells.forEach((c)=>{
//         var btn=document.createElement('div');
//         btn.setAttribute("class","cellButton");
//         btn.addEventListener("click",open);
//         c.appendChild(btn);
//     });
// }

function clicked(e){
    var target=e.target;
    var index=target.getAttribute("ind");
    open(parseInt(index/rows), index%rows);
}

function open(row, col){
    if(row<0 || row>=rows || col<0 || col>=cols)
        return;
    var trList=document.getElementById("board_tbody").querySelectorAll('tr');
    var target=trList[row].querySelectorAll('td')[col];
    if(target.getAttribute("class")=="open")
        return;
    var num=board[row*rows+col];
    if(num==9){
        gameover();
    }
    else if(num>0 && num<9){
        target.setAttribute("class","open");
        target.textContent=num;
    }
    else if(num==0){
        target.setAttribute("class","open");
        open(row-1,col-1);
        open(row,col-1);
        open(row+1,col-1);
        open(row-1,col);
        open(row+1,col);
        open(row-1,col+1);
        open(row,col+1);
        open(row+1,col+1);
    }
}

function gameover(){
    console.log("gameover");
}
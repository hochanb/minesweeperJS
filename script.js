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
            board[ran]=9;
            mineNum++;
    } while (mineNum < mineCount);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if(board[i*cols+j]==9)
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
            board[i * cols + j] = minesAround;
        }
    }
}

function check(i,j){
    if(i<0 || i>=rows || j<0 || j>=cols)
        return 0;
    else if(board[i*cols+j]==9)
        return 1; //숫자가 9면 지뢰. 지뢰면 개수 +1
    else return 0;

}


function initHTML() {
    var tbody = document.getElementById("board_tbody");
    for (let i = 0; i < rows; i++) {
        var newTr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            var newTd = document.createElement('td');       
            newTd.setAttribute("class","closed");
            newTd.setAttribute("ind",i*cols+j);
            newTd.addEventListener("click",clicked);
            newTr.appendChild(newTd);
        }
        tbody.appendChild(newTr);
    }
}

function clicked(e){
    var target=e.target;
    var index=target.getAttribute("ind");
    if(board[index]==9){
        gameover(target);
        return;
    }

    open(parseInt(index/cols), index%cols);
}

function open(row, col){

    if(row<0 || row>=rows || col<0 || col>=cols)
        return;
    var trList=document.getElementById("board_tbody").querySelectorAll('tr');
    var target=trList[row].querySelectorAll('td')[col];
    //console.log(target);
    if(target.getAttribute("class")!="closed")
        return;
    var num=board[row*cols+col];
    if(num==9){
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

function gameover(target){
    console.log("gameover");

    target.setAttribute("class","mine");
    target.textContent="※";

    /*open all*/
    var trList=document.getElementById("board_tbody").querySelectorAll('tr');
    for(let i=0;i<board.length;i++){
        var cell=trList[parseInt(i/cols)].querySelectorAll('td')[i%cols];
        var num=board[cell.getAttribute("ind")];
        if(num==9){
            cell.setAttribute("class","mine");
            cell.textContent="※";
        }
        else if(num>0 && num<9){
            cell.setAttribute("class","open");
            cell.textContent=num;
        }
        else if(num==0){
            cell.setAttribute("class","open");
        }
    }
}
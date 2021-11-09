var X = 30
var Y = 31
var grid = new Array(X)
var gridIndex = 0
var table = document.getElementById('table')
var currentPos = ["111","110","101","100","011","010","001","000"]
var rule = ''
var rowCounter = -1
var cellSelected = false
for(let i=0;i<Y;i++){
    grid[i] = new Array(Y)
}

for(let i=0;i<X;i++){
    let row = document.createElement("tr")
    row.id = 'rows'
    for(let j=0;j<Y;j++){
        let col = document.createElement('td')
        let conText = document.createTextNode('')
        col.appendChild(conText)
        col.id = 'cols' + gridIndex.toString()
        col.className = 'cols'
        row.appendChild(col)
        gridIndex++
        grid[i][j]=0
        let buttonClick = 0
        col.addEventListener('click', () => {
            buttonClick++
            if(buttonClick == 1) {
                col.style.backgroundColor = 'black'
                grid[i][j] = 1
                cellSelected = true
            }
            if(buttonClick == 2) {
                col.style.backgroundColor = 'white'
                grid[i][j] = 0
                buttonClick = 0
                cellSelected = false
            }
        })
    }
    table.appendChild(row)
}

const binaryCal = (num) => {
    let str = Number(num).toString(2)
    let len = 8 - str.length
    if(len > 0) {
        for(let i = 0;i< len;i++){
            str = '0' + str
        }
    }
    return str
}


const reset = () => {
    location.reload()
}

const update = () => {
    let counter = 0
    for(let i = 0; i < X;i++) {
         for(let j = 0 ;j < Y;j++) {
            let color = ''
            if(grid[i][j]) color = 'green'; 
            else  color = 'white';
            document.getElementById('cols' + counter.toString())
            .style.backgroundColor = color
            counter++
        }
    }

}
document.getElementById('runId').disabled = true
const neighbours = (n, m) =>{
    let counter = ''
    let a = 0
    if(m-1 < 0)      { a=Y-1; b=m; c=m+1  }
    else if(m+1>Y-1) { a=m-1; b=m; c=0    }
    else             { a=m-1; b=m; c=m+1  }

    if(grid[n][a] == 1)  counter += '1'
    else counter += '0'
    if(grid[n][b] == 1)  counter += '1' 
    else counter += '0'
    if(grid[n][c] == 1)  counter += '1'
    else counter += '0'

    return counter
    
    
}

const mutationCell = () =>{
    let i = rowCounter
        for(let j=0;j<Y;j++){
            
        let counter = neighbours(i,j)

        console.log(counter);

        let index = currentPos.indexOf(counter)
        let ruleOne = binaryCal(rule)
        if(ruleOne[index] == 1) { grid[i+1][j] = 1}
        else {grid[i+1][j] = 0}
    }
}
const run = () => {
    if(cellSelected){
    var id = setInterval(frame,200)
    function frame (){
        rowCounter++
        mutationCell()
        update()
        if(rowCounter == X) {
            clearInterval(id)
        }
    }
}
    else {
        alert('Please choose first cell to run!')
    }
}

const setRule = () => {
    rule = document.getElementById('ruleText').value
    document.getElementById('runId').disabled = false
}
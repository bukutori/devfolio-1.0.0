const SIZE = 10, MINES = 10;
let board = [], flags = 0, gameOver = false, firstClick = true;
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const msgElement = document.getElementById('msg');

const colors = ['', 
    'text-blue-600',
    'text-green-600',
    'text-red-600',
    'text-purple-600',
    'text-red-900',
    'text-teal-600',
    'text-black',
    'text-gray-600'
];

function toggleFlag(r, c, cell){
    console.log('右鍵按下')
}
function cilckCell(r, c, cell){
    
}

function init(){
    boardElement.innerHTML = '';
    board = Array.from({length: SIZE}, 
                    () => Array.from(
                        {length: SIZE},
                    () => ({mine: false, rev:false, flag: false})
                    )
                )
    flags = 0;
    gameOver = false;
    firstClick = true;
    statusElement.innerText = '🚩 ${MINES}';
    msgElement.innerText ='';
    
    for (let r=0; r<SIZE; r++){
        for (let c=0; c<SIZE; c++){
            const cell = document.createElement('div');
            cell.className=''
            cell.oncontextmenu=(e)=>{
                                        e.preventDefault();
                                        //右鍵查詢
                                        toggleFlag(r, c, cell);
                                    };
            cell.onclick=()=> cilckCell(r, c, cell);//左鍵挖雷
            boardElement.appendChild(cell);
        }
    }
}

init();
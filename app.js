const grid = document.querySelector(".grid");
const score = document.getElementById('score')
const restartCon = document.querySelector(".restartCon")
const blockWidht = 100;
const boardWidth = 560;
const blockHeight = 20;
const boardHeight = 300;
const userStart = [230, 10];
let currentPosition = userStart;
const ballStart = [265, 40];
let ballCurrentPosition = ballStart;
let timerId;
let point = 0;
const ballDiameter = 20;
let xDirection = -2;
let yDirection = 2;


// create Block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis,yAxis]
        this.bottomRight = [xAxis + blockWidht, yAxis]
        this.topLeft = [ xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidht, yAxis + blockHeight]
    }
}

// all my Block
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
]


function addBlocks(){

    for (let i = 0; i < blocks.length; i++){
    const block = document.createElement('div')
    block.classList.add("block")
    block.style.left = blocks[i].bottomLeft[0] + 'px'
    block.style.bottom = blocks[i].bottomLeft[1] + "px"
    grid.appendChild(block)
    }
}


addBlocks()

// add user
const user = document.createElement('div');
user.classList.add('user')
drawUser()
grid.appendChild(user)


function drawUser()  {
    user.style.left = currentPosition[0] + "px"
    user.style.bottom = currentPosition[1] + "px"    
}
// draw the ball

function drawBall(){
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1]+ "px"
}

function moveUser(e) {
    
    switch(e.key) {
        case 'ArrowLeft':
            if(currentPosition[0] > 0) {
                currentPosition[0] -= 10
                drawUser()
                break;
            }
  

       case 'ArrowRight':
        if(currentPosition[0] < boardWidth - blockWidht){
            currentPosition[0] += 10
            drawUser()
            break;
        }
     
    }
}

document.addEventListener('keydown', moveUser)

const ball = document.createElement("div")
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

// Move the ball 

function moveBall() {
    
    

    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    checkForColisions()
    drawBall()
    
}



const startGame = document.querySelector('.start')
    startGame.addEventListener("click",() => {
        timerId = setInterval(moveBall, 30)

        
    })

      
        

    


function checkForColisions() {
    // check for block collision
    for (let i = 0; i < blocks.length; i++) {
        
        if((ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
        (( ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])) 
           {
                const allBlocks = Array.from(document.querySelectorAll('.block')) 
                allBlocks[i].classList.remove('block')
                blocks.splice(i, 1)
                changeDirection()
                point++
                score.innerHTML = point

                if(blocks.length === 0) {
                    score.innerHTML = "You Win"
                    clearInterval(timerId)
                    document.removeEventListener("keydown", moveUser)
                }
            }
    }





    // check fo wall colisions
    if(ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
    ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
    ballCurrentPosition[0] <= 0 
  
    ) {
        changeDirection()
    }



    if
    (
      (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidht) &&
      (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight ) 
    )
    {
      changeDirection()
    }

    if(ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        score.innerHTML = "You Lose"
       document.removeEventListener("keydown", moveUser)
      const restart = document.createElement("button")
      restart.classList.add("restart")
      restart.innerHTML = "Try Again"
      restartCon.appendChild(restart)
      restart.addEventListener("click", () => {
        window.location.reload()
      })
   
       
        
    }



// check for user colision




}



// check for game over


function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
      yDirection = -2
      return
    }
    if (xDirection === 2 && yDirection === -2) {
      xDirection = -2
      return
    }
    if (xDirection === -2 && yDirection === -2) {
      yDirection = 2
      return
    }
    if (xDirection === -2 && yDirection === 2) {
      xDirection = 2
      return
    }
  }
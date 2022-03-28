var myCanvas = document.getElementById("mycanvas");
var ctx = myCanvas.getContext("2d");
let color_snake = "#FF0000" ;
let color_grass = "#79D021" ;

var winheight = window.innerHeight
var winwidth = window.innerWidth

// console.log(winheight , winwidth)
const boxes = 45 ;

var moveX = 1 ;
var moveY = 0 ; 

let boxLen = 20 ;
let paused = false ;


snake_cord_x = [230] ;
snake_cord_y = [230] ;

class SnakeGame{
    
    BoardSize = 0 ;

    constructor(boardSize ){

        this.BoardSize = boardSize ; 
        let widthshouldbe = boxLen *boardSize ;
        let heightshouldbe = boxLen *boardSize ;
        myCanvas.width = widthshouldbe ;
        myCanvas.height = heightshouldbe ;
        ctx.fillStyle = color_grass;
        ctx.fillRect( 0 , 0, widthshouldbe, heightshouldbe );

    }

};

let game = new SnakeGame(boxes) ;


let x = 0

function move(){
    if(!paused){

    // array.pop() is used for del from last 
    // array.unshift("data") is used to add "data" from front 

    // add cordinate in head
    let newX = snake_cord_x[0] + boxLen*moveX;
    let newY = snake_cord_y[0] +  boxLen*moveY;

    snake_cord_x.unshift(newX) ;
    snake_cord_y.unshift(newY) ;

    ctx.fillStyle = color_snake ;
    ctx.fillRect( newX, newY, boxLen, boxLen );
    x+=boxLen

    // del corr from back 
    // get last cord and set it to prev 

    let oldX = snake_cord_x[snake_cord_x.length -1 ] ;
    let oldY = snake_cord_y[snake_cord_y.length -1 ] ;
    console.log(oldX , oldY, length)

    ctx.fillStyle = color_grass ;
    ctx.fillRect( oldX, oldY, boxLen, boxLen );

    snake_cord_x.pop() ;
    snake_cord_y.pop() ;


    }
    // console.log(x/boxLen)
}

// ctx.fillRect( 0 , 0 , boxLen*boxes , boxLen*boxes );
setInterval(move , 500)

document.addEventListener( 'keydown' , data => {
    
    if(data.key == "ArrowLeft" && moveX!= -1 && moveY!=0 ){
        moveX = -1 ; 
        moveY = 0;
        console.log("move left") ;
    }
    else if(data.key == "ArrowDown" && moveX!= 0 && moveY!=1  ){
        moveX = 0  ;
        moveY = 1 ;
        console.log("move up") ;
    }
    else  if(data.key == "ArrowRight" && moveX!= 1 && moveY!=0  ){
        moveX = 1  ;
        moveY = 0 ;
        console.log("move right") ;
    }
    else if(data.key == "ArrowUp" && moveX!= 0 && moveY!= -1 ){
        moveX = 0 ;
         moveY = -1 ;
        console.log("move down") ;
    }
    else if(data.key == "Escape" ){
        paused = !paused ;  
        console.log("Escape pressed" , paused)
    }

    // console.log(data.key)

} )
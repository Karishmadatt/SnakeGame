var myCanvas = document.getElementById("mycanvas");
var ctx = myCanvas.getContext("2d");

let color_snake = "#0072BB" ;
let color_grass = "#79D021" ;
let color_food = "#FF0000" ;

var winheight = window.innerHeight
var winwidth = window.innerWidth

// console.log(winheight , winwidth)
const boxes = 45 ;

var moveX = 1 ;
var moveY = 0 ; 

let boxLen = 20 ;
let paused = false ;
let stop = false ;


snake_cord_x = [0] ;
snake_cord_y = [0] ;

food_x = 0 ;
food_y = 0 ;


function updatefood(X , Y){

    // update food -> remove old cordinate 

    ctx.fillStyle = color_grass;
    ctx.fillRect( food_x , food_y , boxLen, boxLen );

    // get new cordinate 
    NewFoodCord()
    // make new cordinate as food 

    ctx.fillStyle = color_food ;
    ctx.fillRect( food_x , food_y , boxLen, boxLen );

}


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

        updatefood() ;

    }

};

let game = new SnakeGame(boxes) ;


let x = 0

function check(X , Y){
    if( X >= boxLen*boxes || X < 0 || Y >= boxLen*boxes || Y < 0){
        stop = true 
    }
}

// function checkeat(X , Y){
//     return X==food_x && Y==food_y ;
// }

function move(){

    // array.pop() is used for del from last 
    // array.unshift("data") is used to add "data" from front 

    // add cordinate in head
    let newX = snake_cord_x[0] + boxLen*moveX;
    let newY = snake_cord_y[0] +  boxLen*moveY;

    check(newX , newY) ;
    
    if(!paused && !stop){

    snake_cord_x.unshift(newX) ;
    snake_cord_y.unshift(newY) ;

    ctx.fillStyle = color_snake ;
    ctx.fillRect( newX, newY, boxLen, boxLen );
    x+=boxLen

    
    // del corr from back 
    // get last cord and set it to prev 
    
    let oldX = snake_cord_x[snake_cord_x.length -1 ] ;
    let oldY = snake_cord_y[snake_cord_y.length -1 ] ;
    console.log(oldX , oldY, length , food_x , food_y)
    
    ctx.fillStyle = color_grass ;
    ctx.fillRect( oldX, oldY, boxLen, boxLen );
    
    if(newX==food_x && newY==food_y){
        
        updatefood();
    }
    else{
        snake_cord_x.pop() ;
        snake_cord_y.pop() ;

    }



    }
    // console.log(x/boxLen)
}

// ctx.fillRect( 0 , 0 , boxLen*boxes , boxLen*boxes );
setInterval(move , 100 )


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

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min) *boxLen
  }

function NewFoodCord(){

    food_x = randomIntFromInterval(0 , 44) ;
    food_y = randomIntFromInterval(0 , 44) ;

}
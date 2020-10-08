document.addEventListener('DOMContentLoaded', ()=>{
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const sky = document.querySelector('.sky');

    let birdLeft = 220;
    let birdBottom = 200;
    let gravirty = 2;
    let isGameOver = false;
    let gap = 450;
    let score = 0;

    function startGame(){
        birdBottom -= gravirty;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }
    let gameTimerId = setInterval(startGame,20);

    function control(e){
        if (e.keyCode === 32){
            jump();
        }
    }
    function jump(){
        if (birdBottom < 320)
        birdBottom += 50;
        bird.style.bottom = birdBottom + 'px';
    }
    document.addEventListener('keyup', control);

    function genarateObstacle(){
        let obstacleLeft = 500;
        let randomHeight = Math.random() * 150;
        let obstacleBottom = randomHeight ;
        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');
        if(!isGameOver){
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('topObstacle');
        }
        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);
        obstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        topObstacle.style.bottom = obstacleBottom + gap + 'px';

        function moveObstacle(){
            obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.left = obstacleLeft + 'px';

            if(obstacleLeft === -60){
                clearInterval(timerId);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
                score++;
            }

            if( obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && 
                (birdBottom < obstacleBottom + 80 || birdBottom > obstacleBottom+gap-200)
                || birdBottom === 0){
                
                gameOver();
                clearInterval(timerId);
            }
        }
        let timerId = setInterval(moveObstacle, 20);
        if(!isGameOver)
            setTimeout(genarateObstacle,3000);
    }
    genarateObstacle();

    function gameOver() {
        clearInterval(gameTimerId);
        isGameOver = true;
        document.removeEventListener('keyup', control);
        sky.innerHTML = score;
    }
})
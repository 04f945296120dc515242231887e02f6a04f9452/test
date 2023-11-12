<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Top-Down Game</title>
    <style>
        canvas {
            border: 1px solid black;
            display: block;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="800" height="600"></canvas>

    <script>
document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    let playerX = canvas.width / 2;
    let playerY = canvas.height / 2;
    let joystick = { x: 0, y: 0 };

    function drawPlayer() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(playerX, playerY, 20, 0, Math.PI * 2);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
    }

    function update() {
        playerX += joystick.x;
        playerY += joystick.y;

        if (playerX < 0) {
            playerX = 0;
        }
        if (playerX > canvas.width) {
            playerX = canvas.width;
        }
        if (playerY < 0) {
            playerY = 0;
        }
        if (playerY > canvas.height) {
            playerY = canvas.height;
        }

        drawPlayer();
    }

    function handleJoystickInput(event) {
        joystick.x = event.gamma / 90;
        joystick.y = event.beta / 90;
    }

    window.addEventListener("deviceorientation", handleJoystickInput);

    window.addEventListener("keydown", function(event) {
        switch (event.key) {
            case "w":
                joystick.y = -1;
                break;
            case "a":
                joystick.x = -1;
                break;
            case "s":
                joystick.y = 1;
                break;
            case "d":
                joystick.x = 1;
                break;
        }
    });

    window.addEventListener("keyup", function(event) {
        switch (event.key) {
            case "w":
            case "s":
                joystick.y = 0;
                break;
            case "a":
            case "d":
                joystick.x = 0;
                break;
        }
    });

    function gameLoop() {
        update();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});
    </script>
</body>
</html>
      

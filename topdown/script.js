var character = document.querySelector(".character");
var map = document.querySelector(".map");

//Change char 

$(document).ready(function(){
   var toggle = false;
   var ctrlDown = false;

   $("#changeBackground").click(function(){
      $("script[data-source='character-script']").remove();
       if (!toggle) {
           $(".character_spritesheet").css("background-image", "url('jer1.png')");
           $(this).text("Yulia");
       } else {
           $(".character_spritesheet").css("background-image", "url('yul1.png')");
           $(this).text("Jeremy");
           
       }
       toggle = !toggle;
   });

   $(document).keydown(function(e) {
       if (!ctrlDown && e.which == 17) { // 17 is the key code for Ctrl
           $("#changeBackground").click();
           ctrlDown = true;
       }
   });

   $(document).keyup(function(e) {
       if (e.which == 17) {
           ctrlDown = false;
       }
   });
});



//start in the middle of the map
var x = 90;
var y = 34;
var held_directions = []; //State of which arrow keys we are holding down
var speed = 1; //How fast the character moves in pixels per frame

const placeCharacter = () => {
   
   var pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
   );
   
   const held_direction = held_directions[0];
   if (held_direction) {
      if (held_direction === directions.right) {x += speed;}
      if (held_direction === directions.left) {x -= speed;}
      if (held_direction === directions.down) {y += speed;}
      if (held_direction === directions.up) {y -= speed;}
      character.setAttribute("facing", held_direction);
   }
   character.setAttribute("walking", held_direction ? "true" : "false");
   
   //Limits (gives the illusion of walls)
   var leftLimit = -8;
   var rightLimit = (16 * 11)+8;
   var topLimit = -8 + 32;
   var bottomLimit = (16 * 7);
   if (x < leftLimit) { x = leftLimit; }
   if (x > rightLimit) { x = rightLimit; }
   if (y < topLimit) { y = topLimit; }
   if (y > bottomLimit) { y = bottomLimit; }
   
   
   var camera_left = pixelSize * 66;
   var camera_top = pixelSize * 42;
   
   map.style.transform = `translate3d( ${-x*pixelSize+camera_left}px, ${-y*pixelSize+camera_top}px, 0 )`;
   character.style.transform = `translate3d( ${x*pixelSize}px, ${y*pixelSize}px, 0 )`;  
}


//Set up the game loop
const step = () => {
   placeCharacter();
   window.requestAnimationFrame(() => {
      step();
   })
}
step(); //kick off the first step!



/* Direction key state */
var canJump = true; // Initially, the character can jump
var isCharacterInAir = false; // Flag to track if the character is in the air

$(document).keydown(function(e) {
    if (e.which == 32) { // If the key pressed was spacebar
        e.preventDefault(); // Prevent the default action in all cases
        if (characterIsOnGround()) {
            makeCharacterJump();
        }
    }
});

$(document).keydown(function(e) {
    if (isCharacterInAir) {
        e.preventDefault(); // Prevent left and right movement while jumping
    }
});

function getValueBasedOnBackgroundImage() {
   const element = document.querySelector('.character_spritesheet');
   const backgroundImage = element.style.backgroundImage;

   if (backgroundImage.includes('jer1.png')) {
       return {jumpHeight: 16, jumpDuration: 500};
   } else {
       return {jumpHeight: 22, jumpDuration: 1100}; // Default values
   }
}

function makeCharacterJump() {
   if (canJump) {
       canJump = false; // Disable jumping
       isCharacterInAir = true; // Character is in the air

       var character = $(".character_spritesheet");
       var originalTop = parseInt(character.css("top"));

       // Get the jump height and duration based on the background image
       var values = getValueBasedOnBackgroundImage();
       var jumpHeight = values.jumpHeight;
       var jumpDuration = values.jumpDuration;
        // Move the character up with an ease-in-out animation
        character.animate(
            { top: (originalTop - jumpHeight) + 'px' },
            {
                duration: jumpDuration / 2,
                easing: 'easeOutQuad',
                complete: function () {
                    // Move the character down with an ease-in-out animation
                    character.animate(
                        { top: originalTop + 'px' },
                        {
                            duration: jumpDuration / 2,
                            easing: 'easeInQuad',
                            complete: function () {
                                canJump = true; // Enable jumping again after the jump is complete
                                isCharacterInAir = false; // Character is back on the ground
                            }
                        }
                    );
                }
            }
        );
    }
}

$(document).keydown(function(e) {
    if (e.which == 32 && characterIsOnGround()) {
        e.preventDefault(); // Prevent the default action
        makeCharacterJump();
    }
});

function characterIsOnGround() {
    var character = $(".character_spritesheet");
    var characterTop = parseInt(character.css("top"));
    var groundLevel = 0; // Change this value to match your ground level

    // Check if the character's top position is equal to or greater than the ground level
    return characterTop >= groundLevel;
}

const directions = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
 }
 const keys = {
    38: directions.up,
    37: directions.left,
    39: directions.right,
    40: directions.down,
 }
 document.addEventListener("keydown", (e) => {
     var dir = keys[e.which];
     if (dir && held_directions.indexOf(dir) === -1) {
         // Only allow movement if character is on the ground
         if (characterIsOnGround()) {
             held_directions.unshift(dir);
         }
     }
 });

document.addEventListener("keyup", (e) => {
   var dir = keys[e.which];
   var index = held_directions.indexOf(dir);
   if (index > -1) {
      held_directions.splice(index, 1)
   }
});




/* BONUS! Dpad functionality for mouse and touch */
var isPressed = false;
const removePressedAll = () => {
   document.querySelectorAll(".dpad-button").forEach(d => {
      d.classList.remove("pressed")
   })
}
document.body.addEventListener("mousedown", () => {
   console.log('mouse is down')
   isPressed = true;
})
document.body.addEventListener("mouseup", () => {
   console.log('mouse is up')
   isPressed = false;
   held_directions = [];
   removePressedAll();
})
const handleDpadPress = (direction, click) => {   
   if (click) {
      isPressed = true;
   }
   held_directions = (isPressed) ? [direction] : []
   
   if (isPressed) {
      removePressedAll();
      document.querySelector(".dpad-"+direction).classList.add("pressed");
   }
}



//Bind a ton of events for the dpad
document.querySelector(".dpad-left").addEventListener("touchstart", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("touchstart", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("touchstart", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("touchstart", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mousedown", (e) => handleDpadPress(directions.left, true));
document.querySelector(".dpad-up").addEventListener("mousedown", (e) => handleDpadPress(directions.up, true));
document.querySelector(".dpad-right").addEventListener("mousedown", (e) => handleDpadPress(directions.right, true));
document.querySelector(".dpad-down").addEventListener("mousedown", (e) => handleDpadPress(directions.down, true));

document.querySelector(".dpad-left").addEventListener("mouseover", (e) => handleDpadPress(directions.left));
document.querySelector(".dpad-up").addEventListener("mouseover", (e) => handleDpadPress(directions.up));
document.querySelector(".dpad-right").addEventListener("mouseover", (e) => handleDpadPress(directions.right));
document.querySelector(".dpad-down").addEventListener("mouseover", (e) => handleDpadPress(directions.down));
var canJump = true; // Initially, the character can jump

function makeCharacterJump() {
    if (canJump) {
        canJump = false; // Disable jumping

        var character = $(".character_spritesheet");
        var originalTop = parseInt(character.css("top"));

        // Calculate the jump height and duration
        var jumpHeight = 15;
        var jumpDuration = 570; // Adjust the duration as needed

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
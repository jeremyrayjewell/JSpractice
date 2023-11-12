document.addEventListener("DOMContentLoaded", function () {
    const playerCardDisplay = document.querySelector('.Card_spritesheet_player');
    const dealerCardDisplay = document.querySelector('.Card_spritesheet_dealer');
    const resultsElement = document.querySelector('.results p');
    const deckChange = document.querySelector('.deck_change_button');
    const deckChangeName = document.querySelector('.deck_change_button p');
    const deckStylePlayer = document.querySelectorAll('.Card_spritesheet_player');
    const deckStyleDealer = document.querySelectorAll('.Card_spritesheet_dealer');
    const cardBackBorder = document.querySelectorAll('.Card');

//Deck Styles
    const deckStyles = [
        { src: 'cards.png', name: 'French deck', border: 'white' },
        { src: 'spanishcards.png', name: 'Spanish deck', border: 'white' },
        { src: 'germancards.png', name: 'German deck', border: '#ebb929' }
    ];

    let currentDeckStyleIndex = 0;

// Back border color

    function setBorderColor() {
     const currentDeckStyle = deckChangeName.textContent;
        const currentStyle = deckStyles.find(style => style.name === currentDeckStyle);

        const borderColor = isFlipped ? currentStyle.border : 'white';

        cardBackBorder.forEach(card => {
            card.style.borderColor = borderColor;
        });
    }

//Change decks
    function changeDeck() {
        deckStylePlayer.forEach(player => {
            player.src = deckStyles[currentDeckStyleIndex].src;
        });

        deckStyleDealer.forEach(dealer => {
           dealer.src = deckStyles[currentDeckStyleIndex].src;
        });

        deckChangeName.textContent = deckStyles[currentDeckStyleIndex].name;
        setBorderColor();
    }

    deckChange.addEventListener('click', function () {
        changeDeck();
    
    });

    deckChange.addEventListener('click', function () {
        let isFlipped = false;
        setBorderColor()
        deckStylePlayer.forEach(function (player) {
            player.src = deckStyles[currentDeckStyleIndex].src;
        });
    
        deckStyleDealer.forEach(function (dealer) {
            dealer.src = deckStyles[currentDeckStyleIndex].src;
        });
        
        deckChangeName.textContent = deckStyles[currentDeckStyleIndex].name;
        currentDeckStyleIndex = (currentDeckStyleIndex + 1) % deckStyles.length;
        playerCardDisplay.style.transform = originalTransformPlayer;
        dealerCardDisplay.style.transform = originalTransformDealer;

 
        resultsElement.innerHTML = `Draw a card!`
        
    });

    //Card Animation


    
//Card Values    

    const cardValues = [
        //Spades
        { id: "oneSpades", transform: "translate3d(0, -20%, 0)", numericalValue: 1 },
        { id: "twoSpades", transform: "translate3d(-7.7%, -20%, 0)", numericalValue: 2 },
        { id: "threeSpades", transform: "translate3d(-15.4%, -20%, 0)", numericalValue: 3 },
        { id: "fourSpades", transform: "translate3d(-23.1%, -20%, 0)", numericalValue: 4 },
        { id: "fiveSpades", transform: "translate3d(-30.8%, -20%, 0)", numericalValue: 5 },
        { id: "sixSpades", transform: "translate3d(-38.5%, -20%, 0)", numericalValue: 6 },
        { id: "sevenSpades", transform: "translate3d(-46.2%, -20%, 0)", numericalValue: 7 },
        { id: "eightSpades", transform: "translate3d(-53.9%, -20%, 0)", numericalValue: 8 },
        { id: "nineSpades", transform: "translate3d(-61.6%, -20%, 0)", numericalValue: 9 },
        { id: "tenSpades", transform: "translate3d(-69.3%, -20%, 0)", numericalValue: 10 },
        { id: "elevenSpades", transform: "translate3d(-77%, -20%, 0)", numericalValue: 11 },
        { id: "twelveSpades", transform: "translate3d(-84.7%, -20%, 0)", numericalValue: 12 },
        { id: "thirteenSpades", transform: "translate3d(-92.4%, -20%, 0)", numericalValue: 13 },
        //Clubs
        { id: "oneClubs", transform: "translate3d(0, -40%, 0)", numericalValue: 1 },
        { id: "twoClubs", transform: "translate3d(-7.7%, -40%, 0)", numericalValue: 2 },
        { id: "threeClubs", transform: "translate3d(-15.4%, -40%, 0)", numericalValue: 3 },
        { id: "fourClubs", transform: "translate3d(-23.1%, -40%, 0)", numericalValue: 4 },
        { id: "fiveClubs", transform: "translate3d(-30.8%, -40%, 0)", numericalValue: 5 },
        { id: "sixClubs", transform: "translate3d(-38.5%, -40%, 0)", numericalValue: 6 },
        { id: "sevenClubs", transform: "translate3d(-46.2%, -40%, 0)", numericalValue: 7 },
        { id: "eightClubs", transform: "translate3d(-53.9%, -40%, 0)", numericalValue: 8 },
        { id: "nineClubs", transform: "translate3d(-61.6%, -40%, 0)", numericalValue: 9 },
        { id: "tenClubs", transform: "translate3d(-69.3%, -40%, 0)", numericalValue: 10 },
        { id: "elevenClubs", transform: "translate3d(-77%, -40%, 0)", numericalValue: 11 },
        { id: "twelveClubs", transform: "translate3d(-84.7%, -40%, 0)", numericalValue: 12 },
        { id: "thirteenClubs", transform: "translate3d(-92.4%, -40%, 0)", numericalValue: 13 },
        //Hearts
        { id: "oneHearts", transform: "translate3d(0, -60%, 0)", numericalValue: 1 },
        { id: "twoHearts", transform: "translate3d(-7.7%, -60%, 0)", numericalValue: 2 },
        { id: "threeHearts", transform: "translate3d(-15.4%, -60%, 0)", numericalValue: 3 },
        { id: "fourHearts", transform: "translate3d(-23.1%, -60%, 0)", numericalValue: 4 },
        { id: "fiveHearts", transform: "translate3d(-30.8%, -60%, 0)", numericalValue: 5 },
        { id: "sixHearts", transform: "translate3d(-38.5%, -60%, 0)", numericalValue: 6 },
        { id: "sevenHearts", transform: "translate3d(-46.2%, -60%, 0)", numericalValue: 7 },
        { id: "eightHearts", transform: "translate3d(-53.9%, -60%, 0)", numericalValue: 8 },
        { id: "nineHearts", transform: "translate3d(-61.6%, -60%, 0)", numericalValue: 9 },
        { id: "tenHearts", transform: "translate3d(-69.3%, -60%, 0)", numericalValue: 10 },
        { id: "elevenHearts", transform: "translate3d(-77%, -60%, 0)", numericalValue: 11 },
        { id: "twelveHeartss", transform: "translate3d(-84.7%, -60%, 0)", numericalValue: 12 },
        { id: "thirteenHearts", transform: "translate3d(-92.4%, -60%, 0)", numericalValue: 13 },
        //Diamonds
        { id: "oneDiamonds", transform: "translate3d(0, -80%, 0)", numericalValue: 1 },
        { id: "twoDiamonds", transform: "translate3d(-7.7%, -80%, 0)", numericalValue: 2 },
        { id: "threeDiamonds", transform: "translate3d(-15.4%, -80%, 0)", numericalValue: 3 },
        { id: "fourDiamonds", transform: "translate3d(-23.1%, -80%, 0)", numericalValue: 4 },
        { id: "fiveDiamonds", transform: "translate3d(-30.8%, -80%, 0)", numericalValue: 5 },
        { id: "sixDiamonds", transform: "translate3d(-38.5%, -80%, 0)", numericalValue: 6 },
        { id: "sevenDiamonds", transform: "translate3d(-46.2%, -80%, 0)", numericalValue: 7 },
        { id: "eightDiamonds", transform: "translate3d(-53.9%, -80%, 0)", numericalValue: 8 },
        { id: "nineDiamonds", transform: "translate3d(-61.6%, -80%, 0)", numericalValue: 9 },
        { id: "tenDiamonds", transform: "translate3d(-69.3%, -80%, 0)", numericalValue: 10 },
        { id: "elevenDiamonds", transform: "translate3d(-77%, -80%, 0)", numericalValue: 11 },
        { id: "twelveDiamonds", transform: "translate3d(-84.7%, -80%, 0)", numericalValue: 12 },
        { id: "thirteenDiamonds", transform: "translate3d(-92.4%, -80%, 0)", numericalValue: 13 },
    ];

    let isFlipped = true;
    let originalTransformPlayer = playerCardDisplay.style.transform;
    let originalTransformDealer = dealerCardDisplay.style.transform;
;
    
    playerCardDisplay.addEventListener('click', function () {
        //filter for deck type
        setBorderColor()
        const currentDeckStyle = deckChangeName.textContent;
        const filteredCardValues = cardValues.filter(card => {
            return !(currentDeckStyle === 'Spanish deck' && card.numericalValue === 13) &&
                   !(currentDeckStyle === 'German deck' && (card.numericalValue === 6 || card.numericalValue === 5 || card.numericalValue === 4 || card.numericalValue === 3 || card.numericalValue === 2));
        });

     
        const playerRandomIndex = Math.floor(Math.random() * filteredCardValues.length);
        const selectedPlayerCard = filteredCardValues[playerRandomIndex];
    
        let dealerCardValues = filteredCardValues.filter(card => card !== selectedPlayerCard);
        const dealerRandomIndex = Math.floor(Math.random() * dealerCardValues.length);
        let selectedDealerCard = dealerCardValues[dealerRandomIndex];

        if (isFlipped) {
            playerCardDisplay.style.transform = originalTransformPlayer;
            dealerCardDisplay.style.transform = originalTransformDealer; 
            resultsElement.innerHTML = `Draw a card!`
        } else {
            playerCardDisplay.style.transform = selectedPlayerCard.transform;
            dealerCardDisplay.style.transform = selectedDealerCard.transform;
            if (selectedPlayerCard.numericalValue > selectedDealerCard.numericalValue) {
                resultsElement.innerHTML = `You: ${selectedPlayerCard.numericalValue} <br> Dealer: ${selectedDealerCard.numericalValue} <br><br> <span> You win! </span>`;
            } else {
                resultsElement.innerHTML = `You: ${selectedPlayerCard.numericalValue} <br> Dealer: ${selectedDealerCard.numericalValue} <br><br> <span> You lose! </span>`; 
            }
        }

        isFlipped = !isFlipped;
    });
    setBorderColor();
});

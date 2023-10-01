const team = {
    _players: [
        { firstName: 'Roger', lastName: 'Bishop', age: 23 },
        { firstName: 'Katrina', lastName: 'Alvarez', age: 25 },
        { firstName: 'Nia', lastName: 'Holmes', age: 20 }
    ],
    _games: [
        { opponents: 'Jets', teamPoints: 42, opponentPoints: 27 },
        { opponents: 'Giants', teamPoints: 45, opponentPoints: 12 },
        { opponents: 'Eagles', teamPoints: 31, opponentPoints: 15 }
    ],
    get players() {
        return this._players;
    },
    get games() {
        return this._games;
    },
    addPlayer(newFirstName, newLastName, newAge) {
        let player = {
            firstName: newFirstName,
            lastName: newLastName,
            age: newAge
        };
        this.players.push(player);
    },
    addGame(newOpponents, newTeamPoints, newOpponentPoints) {
        let game = {
            opponents: newOpponents,
            teamPoints: newTeamPoints,
            opponentPoints: newOpponentPoints
        };
        this.games.push(game);
    }
};

function displayPlayers() {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = ''; // Clear the list before updating

    team.players.forEach(player => {
        const listItem = document.createElement('li');
        listItem.textContent = `Name: ${player.firstName} ${player.lastName}, Age: ${player.age}`;
        playerList.appendChild(listItem);
    });
}

function displayGames() {
    const gameList = document.getElementById('gameList');
    gameList.innerHTML = ''; // Clear the list before updating

    team.games.forEach(game => {
        const listItem = document.createElement('li');
        listItem.textContent = `Opponents: ${game.opponents}, Team Points: ${game.teamPoints}, Opponent Points: ${game.opponentPoints}`;
        gameList.appendChild(listItem);
    });
}

function addPlayer() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const age = parseInt(document.getElementById('age').value);

    if (firstName && lastName && !isNaN(age)) {
        team.addPlayer(firstName, lastName, age);
        displayPlayers(); // Update the displayed player information
    } else {
        alert('Please fill in all player fields correctly.');
    }
}

function addGame() {
    const opponents = document.getElementById('opponents').value;
    const teamPoints = parseInt(document.getElementById('teamPoints').value);
    const opponentPoints = parseInt(document.getElementById('opponentPoints').value);

    if (opponents && !isNaN(teamPoints) && !isNaN(opponentPoints)) {
        team.addGame(opponents, teamPoints, opponentPoints);
        displayGames(); // Update the displayed game information
    } else {
        alert('Please fill in all game fields correctly.');
    }
}

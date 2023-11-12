function getElement(tagName: string, content?: string) {
    const element = document.createElement(tagName);

    if (content) {
        element.innerText = content;
    }

    return element;
}

export function createPlayerInput() {
    const playerInputDiv = getElement('div');
    playerInputDiv.id = 'playerInputDiv';

    const playerInputTextarea = getElement('textarea');
    playerInputTextarea.id = 'playerInputTextarea';

    playerInputDiv.appendChild(playerInputTextarea);

    return playerInputDiv;
}

export function createPlayersList(players: Player[]): HTMLDivElement {
    const div = <HTMLDivElement>getElement('div');
    players.forEach(player => {
        const playerdiv = getElement('div', player.name);
        div.appendChild(playerdiv);
    });

    return div;
}

export function createLeaderboard(group: Group, round: number) {
    const leaderboard = getElement('div');
    leaderboard.classList.add('leaderboard');

    group.players.forEach((player, rank) => {
        const playerRow = getElement('div');
        playerRow.classList.add('playerRow');

        const rankDiv = getElement('div', (rank + 1).toString());
        rankDiv.classList.add('rank');
        playerRow.appendChild(rankDiv);

        const nameDiv = getElement('div', player.name);
        nameDiv.classList.add('name');
        playerRow.appendChild(nameDiv);

        const playerPoints = player.rounds.find(r => r.round === round)?.points.toString() || '0';
        const pointsDiv = getElement('div', playerPoints);
        pointsDiv.classList.add('points');
        pointsDiv.contentEditable = 'true';
        pointsDiv.setAttribute('data-player', player.id.toString());
        playerRow.appendChild(pointsDiv);

        leaderboard.appendChild(playerRow);
    });

    return leaderboard;
}
import { getElement } from './dom';
import { randomizeArray, getMarioNames, localStorage, getNames } from './util';

import groupSetups from './groupSetups';
import roundSetups from './roundSetups';

class MarioKartTournament {
    private wrapper: HTMLDivElement;

    private state: GameState;

    private numberOfPlayers: number = 16;

    private marioNames: string[] = randomizeArray(getMarioNames());
    private customNames: string[] = randomizeArray(getNames());

    private roundNames = new Map([
        [1, {
            setupName: 'r1',
            name: 'Round 1'
        }],
        [2, {
            setupName: 'r2a',
            name: 'Round 2A'
        }],
        [3, {
            setupName: 'r2b',
            name: 'Round 2B'
        }],
        [4, {
            setupName: 'r3',
            name: 'Semi Finale'
        }],
        [5, {
            setupName: 'r4',
            name: 'Finale'
        }]
    ]);


    private adminDiv = <HTMLDivElement>document.body.querySelector('#admin');
    private playerlistDialog = <HTMLDialogElement>document.body.querySelector('#playerswrapper');
    private playerlistTA = <HTMLTextAreaElement>document.body.querySelector('#players');

    private buttons: Record<string, HTMLButtonElement> = {
        toggleAdmin: <HTMLButtonElement>document.getElementById('toggleadmin'),
        clearStorage: <HTMLButtonElement>document.getElementById('clearStorage'),
        playersDialog: <HTMLButtonElement>document.getElementById('playersDialog'),
        populatePlayers: <HTMLButtonElement>document.getElementById('populatePlayers'),
        round1: <HTMLButtonElement>document.getElementById('round1'),
        round2: <HTMLButtonElement>document.getElementById('round2'),
        round3: <HTMLButtonElement>document.getElementById('round3'),
        round4: <HTMLButtonElement>document.getElementById('round4'),
        setPlayers: <HTMLButtonElement>document.getElementById('setPlayers'),
        cancelPlayers: <HTMLButtonElement>document.getElementById('cancelPlayers')
    };

    constructor() {
        this.wrapper = <HTMLDivElement>document.getElementById('wrapper');

        this.initFromLocalStorage();

        this.attachListeners();
    }

    initFromLocalStorage() {
        const storedState: string = localStorage.get('mk8dx');
        const storedPlayers: string = localStorage.get('mk8dxplayers');
        const storedRounds: string = localStorage.get('mk8dxrounds');
        const storedPlayersPerRound: string = localStorage.get('mk8dxppr');

        if (storedState) {
            const storedGame: GameState = JSON.parse(storedState);
            this.state = storedGame;

            if (storedPlayers) {
                this.state.players = JSON.parse(storedPlayers);
                this.customNames = this.state.players.map(p => p.name);
                this.numberOfPlayers = this.customNames.length;
                this.playerlistTA.value = this.customNames.join('\n');
                this.buttons.playersDialog.innerText = `Players (${this.numberOfPlayers})`;
            } else {
                this.state.players = [];
            }

            if (storedRounds) {
                this.state.rounds = new Map(JSON.parse(storedRounds));
            } else {
                this.state.rounds = new Map();
            }

            if (storedPlayersPerRound) {
                this.state.playersPerRound = new Map(JSON.parse(storedPlayersPerRound));
            } else {
                this.state.playersPerRound = new Map();
            }

            for (const roundNumber of this.state.rounds.keys()) {
                this.renderRound(roundNumber);
                this.highlightWinners(this.state.rounds.get(roundNumber).winners, roundNumber);

                if (roundNumber === 1) {
                    this.disableButton('populatePlayers');
                } else if (roundNumber === 2) {
                    this.disableButton('round1');
                } else if (roundNumber === 4) {
                    this.disableButton('round2');
                } else if (roundNumber === 5) {
                    this.disableButton('round3');
                }
            }
        }
    }

    updateStateInLocalstorage() {
        localStorage.set('mk8dx', JSON.stringify(this.state));
        localStorage.set('mk8dxplayers', JSON.stringify(this.state.players));
        localStorage.set('mk8dxrounds', JSON.stringify(Array.from(this.state.rounds.entries())));
        localStorage.set('mk8dxppr', JSON.stringify(Array.from(this.state.playersPerRound.entries())));
    }

    attachListeners() {
        this.buttons.toggleAdmin.addEventListener('click', e => {
            e.preventDefault();
            this.adminDiv.classList.toggle('show');
        });

        this.buttons.clearStorage.addEventListener('click', e => {
            e.preventDefault();

            if (window.confirm('Are you sure you want to clear storage, resetting all progress?')) {
                localStorage.remove('mk8dx');
                localStorage.remove('mk8dxrounds');
            }

            const players = this.customNames.map((playerName, playerIndex) => this.parsePlayer(playerName, playerIndex));

            this.initState(players);

            this.enableButtons();
        });

        this.buttons.playersDialog.addEventListener('click', e => {
            e.preventDefault();

            this.playerlistDialog.showModal();
        });

        this.buttons.setPlayers.addEventListener('click', e => {
            e.preventDefault();

            this.setPlayers();

            this.playerlistDialog.close();
        });

        this.buttons.cancelPlayers.addEventListener('click', e => {
            e.preventDefault();

            this.playerlistDialog.close();
        })

        this.buttons.populatePlayers.addEventListener('click', e => {
            e.preventDefault();
            const players = randomizeArray(this.customNames).map((playerName, playerIndex) => this.parsePlayer(playerName, playerIndex));

            this.initState(players);
        });

        this.buttons.round1.addEventListener('click', e => {
            e.preventDefault();
            this.updateStateInLocalstorage();
            this.initNewRound(1);

            this.disableButton('populatePlayers');
        });

        this.buttons.round2.addEventListener('click', e => {
            e.preventDefault();
            this.updateStateInLocalstorage();
            this.initNewRound(2);
            this.initNewRound(3);

            this.disableButton('round1');
        });

        this.buttons.round3.addEventListener('click', e => {
            e.preventDefault();
            this.updateStateInLocalstorage();
            this.initNewRound(4);

            this.disableButton('round2');
        });

        this.buttons.round4.addEventListener('click', e => {
            e.preventDefault();
            this.updateStateInLocalstorage();
            this.initNewRound(5);

            this.disableButton('round3');
        });
    }

    private initState(players: Player[]): void {
        this.state = {
            currentRound: 1,
            rounds: new Map(),
            players: players,
            playersPerRound: new Map()
        }
    }

    private setPlayers() {
        const playerTA = <HTMLTextAreaElement>document.getElementById('players');

        this.customNames = randomizeArray(playerTA.value.split('\n').filter(p => p));
        this.numberOfPlayers = this.customNames.length;
        this.buttons.playersDialog.innerText = `Players (${this.numberOfPlayers})`;

        const players = this.customNames.map((playerName, playerIndex) => this.parsePlayer(playerName, playerIndex));
        this.initState(players);
    }

    private enableButtons() {
        for (let btn in this.buttons) {
            this.buttons[btn].removeAttribute('disabled');
        }
    }

    private disableButton(btn: string) {
        if (this.buttons.hasOwnProperty(btn)) {
            this.buttons[btn].setAttribute('disabled', 'disabled');
        }
    }

    private initNewRound(round: number): void {
        this.state.currentRound = round;

        if (this.state.currentRound === 1) {
            this.state.rounds.set(this.state.currentRound, this.createRound(this.state.currentRound, this.state.players));
        } else {
            this.updateScores();

            const roundPlayers = this.state.playersPerRound.get(this.state.currentRound);
            const randomizedPlayers = randomizeArray(roundPlayers);

            this.state.rounds.set(this.state.currentRound, this.createRound(this.state.currentRound, randomizedPlayers));
        }

        this.renderRound(this.state.currentRound);

        this.updateStateInLocalstorage();
    }

    private updateScores() {
        const previousRound = this.state.currentRound - 1;
        const thisRound = this.state.rounds.get(previousRound);

        if (previousRound === 1) {
            const { winners, losers } = this.calculateWinnersLosers(thisRound);

            this.state.playersPerRound.set(2, winners);
            this.state.playersPerRound.set(3, losers);

            this.storeWinners(winners, 1);
            this.highlightWinners(winners, thisRound.roundNumber);
        } else if (previousRound === 3) {
            const round2A = this.state.rounds.get(2);
            const round2B = this.state.rounds.get(3);

            const round2AWinnersLosers = this.calculateWinnersLosers(round2A);
            this.storeWinners(round2AWinnersLosers.winners, 2);
            const round2BWinnersLosers = this.calculateWinnersLosers(round2B);
            this.storeWinners(round2BWinnersLosers.winners, 3);

            const allWinners = [].concat(round2AWinnersLosers.winners).concat(round2BWinnersLosers.winners);
            // const allLosers = [].concat(round2AWinnersLosers.losers).concat(round2BWinnersLosers.losers);

            this.state.playersPerRound.set(4, allWinners);
            // this.state.playersPerRound.set(5, allLosers);

            this.highlightWinners(allWinners, 2);
            this.highlightWinners(allWinners, 3);
        } else if (previousRound === 4) {
            const round = this.state.rounds.get(4);

            const { winners } = this.calculateWinnersLosers(round);

            this.state.playersPerRound.set(5, winners);

            this.storeWinners(winners, 4);
            this.highlightWinners(winners, 4);
        }
    }

    private renderRound(round: number) {
        const thisRound = this.state.rounds.get(round);

        const roundWrapper = this.wrapper.querySelector(`#roundWrapper${round}`);
        roundWrapper.classList.add(`items${thisRound.groups.length}`);
        roundWrapper.innerHTML = '';

        thisRound.groups.forEach((group, groupIndex) => {
            const leaderboard = this.createLeaderboard(group, this.roundNames.get(thisRound.roundNumber).setupName);
            [...leaderboard.querySelectorAll('.points')].forEach(pdiv => pdiv.addEventListener('blur', e => {
                const targetDiv = <HTMLDivElement>e.target;
                const playerId = parseInt(targetDiv.getAttribute('data-player'), 10);
                const round = parseInt(targetDiv.getAttribute('data-round'), 10);

                const player: Player = thisRound.groups[groupIndex].players.find(player => player.id === playerId);
                const score = parseInt(targetDiv.innerHTML, 10);

                this.updatePlayerScore(player, score, round);
            }));

            roundWrapper.appendChild(leaderboard);
        });
    }

    private updatePlayerScore(player: Player, score: number, round: number) {
        const roundName = this.roundNames.get(round).setupName;
        const playerRound = player.rounds[roundName];

        if (!playerRound) {
            player.rounds[roundName] = {
                round: round,
                points: score
            }
        } else {
            playerRound.points = score;
        }

        this.updateStateInLocalstorage();
    }

    private storeWinners(players: Player[], round: number) {
        this.state.rounds.get(round).winners = players;
    }

    private highlightWinners(players: Player[], round: number) {
        const roundWrapper = this.wrapper.querySelector(`#roundWrapper${round}`);
        const playerIds = players.map(p => p.id.toString());

        [...roundWrapper.querySelectorAll('.playerRow')].forEach(row => {
            const playerId = row.querySelector('div.points').getAttribute('data-player');
            if (playerIds.includes(playerId)) {
                row.classList.add('winner');
            }
        })
    }

    private calculateWinnersLosers(round: Round): Record<string, Player[]> {
        const winners = [];
        const losers = [];

        const condition = round.groups[0].condition;
        const roundName = this.roundNames.get(round.roundNumber).setupName;

        if (condition === '1/group') {
            round.groups.forEach(group => {
                const sortedPlayers = this.sortPlayersByScore(group.players, roundName);

                sortedPlayers.slice(0, 1).forEach(player => winners.push(player));
                sortedPlayers.slice(1).forEach(player => losers.push(player));
            });
        } else if (condition === '2/group') {
            round.groups.forEach(group => {
                const sortedPlayers = this.sortPlayersByScore(group.players, roundName);

                sortedPlayers.slice(0, 2).forEach(player => winners.push(player));
                sortedPlayers.slice(2).forEach(player => losers.push(player));
            });
        } else if (condition === '3/group') {
            round.groups.forEach(group => {
                const sortedPlayers = this.sortPlayersByScore(group.players, roundName);

                sortedPlayers.slice(0, 3).forEach(player => winners.push(player));
                sortedPlayers.slice(3).forEach(player => losers.push(player));
            });
        } else if (condition === '2/round') {
            const allPlayers = [];
            round.groups.forEach(group => allPlayers.push(...group.players));

            const sortedPlayers = this.sortPlayersByScore(allPlayers, roundName);

            sortedPlayers.slice(0, 2).forEach(player => winners.push(player));
            sortedPlayers.slice(2).forEach(player => losers.push(player));
        } else if (condition === '4/round') {
            const allPlayers = [];
            round.groups.forEach(group => allPlayers.push(...group.players));

            const sortedPlayers = this.sortPlayersByScore(allPlayers, roundName);

            sortedPlayers.slice(0, 4).forEach(player => winners.push(player));
            sortedPlayers.slice(4).forEach(player => losers.push(player));
        }

        return { winners, losers }
    }

    private sortPlayersByScore(players: Player[], roundName: string): Player[] {
        const sortedPlayers = players.sort((a: Player, b: Player) => {
            return b.rounds[roundName].points - a.rounds[roundName].points
        });

        return sortedPlayers;
    }

    parsePlayer(playerName: string, playerId: number): Player {
        const player: Player = {
            id: playerId,
            name: playerName,
            iconname: this.marioNames[playerId].replaceAll(' ', ''),
            rounds: {}
        }

        return player;
    }

    getGroupSetupByNumberPlayers(numberOfPlayers: number): GroupSetup {
        if (numberOfPlayers < 16 || numberOfPlayers > 32) {
            throw new Error('Number of players must be between 16 and 32');
        }

        return groupSetups[numberOfPlayers].sort((a: GroupSetup, b: GroupSetup) => a.total - b.total)[0];
    }

    getRoundSetup(roundNumber: number) {
        const clampedNumPlayers = Math.max(Math.min(this.state.players.length, 32), 12);

        const roundsSetupForPlayers = roundSetups.find(setup => setup.players === clampedNumPlayers);
        const roundSetupName = this.roundNames.get(roundNumber).setupName;
        const roundSetup = roundsSetupForPlayers.rounds[roundSetupName];

        return roundSetup;
    }

    createRound(roundNumber: number = 1, players: Player[]): Round {
        const roundSetup = this.getRoundSetup(roundNumber);
        const playerGroups = this.createPlayerGroups(players, roundSetup.groupSetup, roundNumber);

        const round: Round = {
            roundNumber: roundNumber,
            groupSetup: roundSetup.groupSetup,
            groups: playerGroups.map(playerGroup => {
                return {
                    players: playerGroup,
                    condition: roundSetup.condition
                }
            }),
            winners: []
        }

        return round;
    }

    createPlayerGroups(players: Player[], groupSetup: GroupSetup, roundNumber: number): Player[][] {
        let playerGroups = [];
        let idx = 0;

        const roundName = this.roundNames.get(roundNumber).setupName;

        players.forEach(player => player.rounds[roundName] = {
            round: roundNumber,
            points: 0
        });

        for (let i = 0; i < groupSetup[4]; i++) {
            playerGroups.push(players.slice(idx, idx += 4));
        }

        for (let i = 0; i < groupSetup[3]; i++) {
            playerGroups.push(players.slice(idx, idx += 3));
        }

        return playerGroups;
    }

    createLeaderboard(group: Group, roundName: string) {
        const leaderboard = getElement('div');
        leaderboard.classList.add('leaderboard');

        const sortedPlayers = this.sortPlayersByScore(group.players, roundName);

        sortedPlayers.forEach((player, rank) => {
            const playerRow = getElement('div');
            playerRow.classList.add('playerRow');

            const rankDiv = getElement('div', (rank + 1).toString());
            rankDiv.classList.add('rank');
            playerRow.appendChild(rankDiv);

            const iconDiv = getElement('div');
            iconDiv.classList.add('icon');
            const iconImg = <HTMLImageElement>getElement('img');
            iconImg.src = `images/${player.iconname}.png`;
            iconImg.title = player.iconname;
            iconDiv.appendChild(iconImg);
            playerRow.appendChild(iconDiv);

            const nameDiv = getElement('div', player.name);
            nameDiv.classList.add('name');
            playerRow.appendChild(nameDiv);

            const playerPoints = player.rounds[roundName].points.toString() || '0';
            const pointsDiv = getElement('div', playerPoints);
            pointsDiv.classList.add('points');
            pointsDiv.contentEditable = 'true';
            pointsDiv.setAttribute('data-player', player.id.toString());
            pointsDiv.setAttribute('data-round', player.rounds[roundName].round.toString());
            playerRow.appendChild(pointsDiv);

            leaderboard.appendChild(playerRow);
        });

        return leaderboard;
    }
}

new MarioKartTournament();

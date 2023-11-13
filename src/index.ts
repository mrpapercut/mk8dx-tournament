import { getElement } from './dom';
import { randomizeArray, getMarioNames, localStorage } from './util';

import groupSetups from './groupSetups';
import roundSetups from './roundSetups';

class MarioKartTournament {
    private wrapper: HTMLDivElement;

    private state: GameState;

    private playerNames: string[] = [];
    private numberOfPlayers: number = 16;

    private marioNames: string[] = randomizeArray(getMarioNames());

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

    constructor() {
        this.wrapper = <HTMLDivElement>document.getElementById('wrapper');

        this.initFromLocalStorage();

        this.attachListeners();
    }

    initFromLocalStorage() {
        const storedState: string = localStorage.get('mk8dx');
        const storedRounds: string = localStorage.get('mk8dxrounds');
        const storedPlayersPerRound: string = localStorage.get('mk8dxppr');

        if (storedState) {
            const storedGame: GameState = JSON.parse(storedState);
            this.state = storedGame;

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
            }
        }
    }

    updateStateInLocalstorage() {
        localStorage.set('mk8dx', JSON.stringify(this.state));
        localStorage.set('mk8dxrounds', JSON.stringify(Array.from(this.state.rounds.entries())));
        localStorage.set('mk8dxppr', JSON.stringify(Array.from(this.state.playersPerRound.entries())));
    }

    updatePlayerlist() {
        const playerList = <HTMLDivElement>document.body.querySelector('#playerlist');
        playerList.innerHTML = '';

        this.playerNames.forEach(name => {
            const playerName = document.createElement('div');
            playerName.classList.add('playername');
            playerName.innerHTML = name;

            playerList.appendChild(playerName);
        })
    }

    attachListeners() {
        const toggleDebugBtn = document.body.querySelector('#toggledebug');
        const debugDiv = <HTMLDivElement>document.body.querySelector('#debug');
        toggleDebugBtn.addEventListener('click', e => {
            e.preventDefault();
            debugDiv.classList.toggle('show');
            adminDiv.classList.remove('show');
        });

        const toggleAdminBtn = document.body.querySelector('#toggleadmin');
        const adminDiv = <HTMLDivElement>document.body.querySelector('#admin');
        toggleAdminBtn.addEventListener('click', e => {
            e.preventDefault();
            adminDiv.classList.toggle('show');
            debugDiv.classList.remove('show');
        });

        // Add players
        const addPlayerInput = <HTMLInputElement>adminDiv.querySelector('#addplayer');
        const addPlayerBtn = adminDiv.querySelector('#addplayerbtn');
        const setPlayersBtn = adminDiv.querySelector('#setplayers');
        const addPlayerToList = name => {
            this.playerNames.push(addPlayerInput.value);
            addPlayerInput.value = '';
            this.updatePlayerlist();
        }

        addPlayerInput.addEventListener('keyup', e => {
            const target = <HTMLInputElement>e.target;
            if (e.code === 'Enter' && target.value !== '') {
                addPlayerToList(target.value);
            }
        });

        addPlayerBtn.addEventListener('click', e => {
            e.preventDefault();

            if (addPlayerInput.value != '') {
                addPlayerToList(addPlayerInput.value);
            }
        });

        setPlayersBtn.addEventListener('click', e => {
            e.preventDefault();

            const players = this.playerNames.map((playerName, playerIndex) => this.parsePlayer(playerName, playerIndex));
            const randomizedPlayers = randomizeArray(players);

            this.initState(randomizedPlayers);
            this.initNewRound(1);
        });

        this.attachDebugListeners();
    }

    attachDebugListeners() {
        const [clearStorage, populatePlayersBtn, round1Btn, round2Btn, round3Btn, round4Btn] =
            ['clearStorage', 'populatePlayers', 'round1', 'round2', 'round3', 'round4'].map(id => document.getElementById(id));

        clearStorage.addEventListener('click', e => {
            e.preventDefault();

            localStorage.remove('mk8dx');
            localStorage.remove('mk8dxrounds');

            const players = this.marioNames.slice(0, this.numberOfPlayers).map((playerName, playerIndex) => this.parsePlayer(playerName, playerIndex));

            this.initState(players);
        });

        populatePlayersBtn.addEventListener('click', e => {
            e.preventDefault();
            const players = this.marioNames.slice(0, this.numberOfPlayers).map((playerName, playerIndex) => this.parsePlayer(playerName, playerIndex));

            this.initState(players);
        });

        round1Btn.addEventListener('click', e => {
            e.preventDefault();
            this.updateStateInLocalstorage();
            this.initNewRound(1);
        });

        round2Btn.addEventListener('click', e => {
            e.preventDefault();
            this.updateStateInLocalstorage();
            this.initNewRound(2);
            this.initNewRound(3);
        });

        round3Btn.addEventListener('click', e => {
            e.preventDefault();
            this.updateStateInLocalstorage();
            this.initNewRound(4);
        });

        round4Btn.addEventListener('click', e => {
            e.preventDefault();
            this.updateStateInLocalstorage();
            this.initNewRound(5);
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

            this.highlightWinners(winners, thisRound.roundNumber);
        } else if (previousRound === 3) {
            const round2A = this.state.rounds.get(2);
            const round2B = this.state.rounds.get(3);

            const round2AWinnersLosers = this.calculateWinnersLosers(round2A);
            const round2BWinnersLosers = this.calculateWinnersLosers(round2B);

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
        const clampedNumPlayers = Math.max(Math.min(this.state.players.length, 32), 16);

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
            })
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

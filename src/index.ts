import { createLeaderboard, createPlayerInput, createPlayersList } from './dom';
import { randomizeArray, getMarioNames, localStorage } from './util';

import groupSetups from './groupSetups';
import roundSetups from './roundSetups';

class MarioKartTournament {
    private wrapper: HTMLDivElement;

    private state: GameState;
    private isInitialized: boolean = false;

    // private players: Player[];

    private playerInput: HTMLTextAreaElement;
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
        this.playerInput = <HTMLTextAreaElement>document.getElementById('playerinput');

        this.initFromLocalStorage();

        this.setupHTML();

        this.numberOfPlayers = 32;
    }

    initFromLocalStorage() {
        const storedState: string = localStorage.get('mk8dx');
        const storedRounds: string = localStorage.get('mk8dxrounds');

        if (storedState) {
            const storedGame: GameState = JSON.parse(storedState);
            this.state = storedGame;

            if (storedRounds) {
                this.state.rounds = new Map(JSON.parse(storedRounds));
            } else {
                this.state.rounds = new Map();
            }

            for (const roundNumber of this.state.rounds.keys()) {
                this.renderRound(roundNumber);
            }

            this.isInitialized = true;
        }
    }

    updateStateInLocalstorage() {
        localStorage.set('mk8dx', JSON.stringify(this.state));
        localStorage.set('mk8dxrounds', JSON.stringify(Array.from(this.state.rounds.entries())));
    }

    setupHTML() {
        this.attachListeners();
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

        this.attachDebugListeners();
    }

    attachDebugListeners() {
        const [clearStorage, populatePlayersBtn, round1Btn, round2ABtn, round2BBtn, round3Btn, round4Btn] =
            ['clearStorage', 'populatePlayers', 'round1', 'round2A', 'round2B', 'round3', 'round4'].map(id => document.getElementById(id));

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
            // const playerList = <HTMLDivElement>createPlayersList(this.players);
            // this.wrapper.appendChild(playerList);
        });

        round1Btn.addEventListener('click', e => {
            e.preventDefault();
            this.initNewRound(1);
        });

        round2ABtn.addEventListener('click', e => {
            e.preventDefault();
            this.initNewRound(2);
        });

        round2BBtn.addEventListener('click', e => {
            e.preventDefault();
            this.initNewRound(3);
        });

        round3Btn.addEventListener('click', e => {
            e.preventDefault();
            this.initNewRound(4);
        });

        round4Btn.addEventListener('click', e => {
            e.preventDefault();
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

        /*
        const roundTitle = document.createElement('h2');
        roundTitle.innerHTML = this.roundNames.get(round).name;
        roundWrapper.appendChild(roundTitle);
        */

        thisRound.groups.forEach((group, groupIndex) => {
            const leaderboard = createLeaderboard(group, this.roundNames.get(thisRound.roundNumber).setupName);
            [...leaderboard.querySelectorAll('.points')].forEach(pdiv => pdiv.addEventListener('blur', e => {
                const targetDiv = <HTMLDivElement>e.target;
                const playerId = parseInt(targetDiv.getAttribute('data-player'), 10);

                const player: Player = thisRound.groups[groupIndex].players.find(player => player.id === playerId);
                const score = parseInt(targetDiv.innerHTML, 10);

                this.updatePlayerScore(player, score);
            }));

            roundWrapper.appendChild(leaderboard);
        });
    }

    private updatePlayerScore(player: Player, score: number) {
        const roundName = this.roundNames.get(this.state.currentRound).setupName;

        const playerRound = player.rounds[roundName];

        if (!playerRound) {
            player.rounds[roundName] = {
                round: this.state.currentRound,
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

        if (condition === '1/group') {
            round.groups.forEach(group => {
                const sortedPlayers = this.sortPlayersByScore(group.players, round.roundNumber);

                sortedPlayers.slice(0, 1).forEach(player => winners.push(player));
                sortedPlayers.slice(1).forEach(player => losers.push(player));
            });
        } else if (condition === '2/group') {
            round.groups.forEach(group => {
                const sortedPlayers = this.sortPlayersByScore(group.players, round.roundNumber);

                sortedPlayers.slice(0, 2).forEach(player => winners.push(player));
                sortedPlayers.slice(2).forEach(player => losers.push(player));
            });
        } else if (condition === '2/round') {
            const allPlayers = [];
            round.groups.forEach(group => allPlayers.push(...group.players));

            const sortedPlayers = this.sortPlayersByScore(allPlayers, round.roundNumber);

            sortedPlayers.slice(0, 2).forEach(player => winners.push(player));
            sortedPlayers.slice(2).forEach(player => losers.push(player));
        } else if (condition === '4/round') {
            const allPlayers = [];
            round.groups.forEach(group => allPlayers.push(...group.players));

            const sortedPlayers = this.sortPlayersByScore(allPlayers, round.roundNumber);

            sortedPlayers.slice(0, 4).forEach(player => winners.push(player));
            sortedPlayers.slice(4).forEach(player => losers.push(player));
        }

        return { winners, losers }
    }

    private sortPlayersByScore(players: Player[], roundNumber: number): Player[] {
        const roundName = this.roundNames.get(roundNumber).setupName;
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
            rounds: {},
            previousOpponents: new Set()
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

        // Set which opponents encountered
        playerGroups.forEach(playerGroup => {
            const playerNames = playerGroup.map(p => p.name);
            playerGroup.forEach(player => {
                playerNames.forEach(name => player.previousOpponents.add(name));
            });
        });

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

    createPlayerGroups(players: Player[], groupSetup: GroupSetup, roundNumber: number): Players[] {
        let playerGroups = [];
        let idx = 0;

        const roundName = this.roundNames.get(roundNumber).setupName;

        players.forEach(player => player.rounds[roundName] = {
            round: roundNumber,
            points: Math.floor(Math.random() * 15) // 0
        });

        for (let i = 0; i < groupSetup[4]; i++) {
            playerGroups.push(players.slice(idx, idx += 4));
        }

        for (let i = 0; i < groupSetup[3]; i++) {
            playerGroups.push(players.slice(idx, idx += 3));
        }

        return playerGroups;
    }
}

new MarioKartTournament();

import { createLeaderboard, createPlayerInput, createPlayersList } from './dom';
import { randomizeArray } from './util';

import groupSetups from './groupSetups';
import roundSetups from './roundSetups';

const exampleNames = [
    'Mario', 'Luigi', 'Peach', 'Daisy', 'Rosalina',
    'Tanooki Mario', 'Cat Peach', 'Birdo', 'Yoshi', 'Toad',
    'Koopa Troopa', 'Shy Guy', 'Lakitu', 'Toadette', 'King Boo',
    'Petey Piranha', 'Baby Mario', 'Baby Luigi', 'Baby Peach', 'Baby Daisy',
    'Baby Rosalina', 'Metal Mario', 'Pink Gold Peach', 'Wiggler', 'Wario',
    'Waluigi', 'Donkey Kong', 'Bowser', 'Dry Bones', 'Bowser Jr.',
    'Dry Bowser', 'Kamek', 'Lemmy', 'Larry', 'Wendy',
    'Ludwig', 'Iggy', 'Roy', 'Morton', 'Peachette',
    'Inkling Girl', 'Inkling Boy', 'Villager (male)', 'Villager (female)', 'Isabelle',
    'Link', 'Diddy Kong', 'Funky Kong', 'Pauline', 'Zelda'
]

class MarioKartTournament {
    private wrapper: HTMLDivElement;

    private currentRound: number = 1;
    private players: Player[];

    private playerInput: HTMLTextAreaElement;

    constructor() {
        this.wrapper = <HTMLDivElement>document.getElementById('wrapper');

        this.setupHTML();
    }

    setupHTML() {
        const playerInputDiv = createPlayerInput();
        this.wrapper.appendChild(playerInputDiv);
        this.playerInput = <HTMLTextAreaElement>playerInputDiv.querySelector('textarea');

        this.attachListeners();
    }

    attachListeners() {
        const [populatePlayersBtn, round1Btn, round2ABtn, round2BBtn, round3Btn, round4Btn] =
        ['populatePlayers', 'round1', 'round2A', 'round2B', 'round3', 'round4'].map(id => document.getElementById(id));

        populatePlayersBtn.addEventListener('click', e => {
            e.preventDefault();
            this.players = randomizeArray(exampleNames).slice(0, 29).map((playerName, playerIndex) => this.parsePlayer(playerName, playerIndex));

            // const playerList = <HTMLDivElement>createPlayersList(this.players);
            // this.wrapper.appendChild(playerList);
        });

        round1Btn.addEventListener('click', e => {
            e.preventDefault();

            this.currentRound = 1;

            const round: Round = this.createRound(this.currentRound);

            round.groups.forEach((group, groupIndex) => {
                const leaderboard = createLeaderboard(group, this.currentRound);
                [...leaderboard.querySelectorAll('.points')].forEach(pdiv => pdiv.addEventListener('blur', e => {
                    const div = <HTMLDivElement>e.target;
                    const score = parseInt(div.innerHTML, 10);
                    const playerId = parseInt(div.getAttribute('data-player'), 10);

                    const player: Player = round.groups[groupIndex].players.find(player => player.id === playerId);
                    const playerRound = player.rounds.find(round => round.round === this.currentRound);

                    if (!playerRound) {
                        player.rounds.push({
                            round: this.currentRound,
                            points: score
                        })
                    } else {
                        playerRound.points = score;
                    }

                    console.log(round);
                }));

                this.wrapper.appendChild(leaderboard);
            });

            console.log(round);
        });

        round2ABtn.addEventListener('click', e => {
            e.preventDefault();

            this.currentRound = 2;

            const round = this.createRound(this.currentRound);

            console.log(round);
        });

        round2BBtn.addEventListener('click', e => {
            e.preventDefault();

            this.currentRound = 3;

            const round = this.createRound(this.currentRound);

            console.log(round);
        });

        round3Btn.addEventListener('click', e => {
            e.preventDefault();

            this.currentRound = 4;

            const round = this.createRound(this.currentRound);

            console.log(round);
        });

        round4Btn.addEventListener('click', e => {
            e.preventDefault();
        });
    }

    parsePlayer(playerName: string, playerId: number): Player {
        const player: Player = {
            id: playerId,
            name: playerName,
            rounds: [],
            previousOpponents: []
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
        const roundNames = [{
            setupName: 'r1',
            name: 'Round 1'
        }, {
            setupName: 'r2a',
            name: 'Round 2A'
        }, {
            setupName: 'r2b',
            name: 'Round 2B'
        }, {
            setupName: 'r3',
            name: 'Semi Finale'
        }];

        const clampedNumPlayers = Math.max(Math.min(this.players.length, 32), 16);

        const roundsSetupForPlayers = roundSetups.find(setup => setup.players === clampedNumPlayers);
        const roundSetup = roundsSetupForPlayers.rounds[roundNames[roundNumber - 1].setupName];

        return roundSetup;
    }

    createRound(roundNumber: number = 1): Round {
        const roundSetup = this.getRoundSetup(roundNumber);
        const playerGroups = this.createPlayerGroups(this.players, roundSetup.groupSetup, roundNumber);

        // Set which opponents encountered
        playerGroups.forEach(playerGroup => {
            const playerNames = playerGroup.map(p => p.name);
            playerGroup.forEach(player => {
                player.previousOpponents = player.previousOpponents.concat(...playerNames.filter(p => p !== player.name))
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

        players.forEach(player => player.rounds.push({
            round: roundNumber,
            points: 0
        }))

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

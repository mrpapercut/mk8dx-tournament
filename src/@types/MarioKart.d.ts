type Player = {
    id: number,
    name: string,
    rounds: Record<string, {
        round: number,
        points: number
    }>,
    previousOpponents: Set<string>
}

type Players = Player[]

type GroupSetup = {
    3: number,
    4: number,
    total: number
}

declare enum WinCondition {
    Top1Group = '1/group',
    Top2Group = '2/group',
    Top1Round = '1/round',
    Top2Round = '2/round',
    Top4Round = '4/round'
}

type Group = {
    players: Players,
    condition: string,
}

declare enum RoundType {
    Initial = 'initial',
    Winners = 'winners',
    Losers = 'losers'
}

type Round = {
    roundNumber: number,
    groupSetup: GroupSetup,
    groups: Group[]
}

type Rounds = Round[];

type GameState = {
    currentRound: number,
    rounds: Map<number, Round>,
    players: Player[],
    playersPerRound: Map<number, Player[]>
}

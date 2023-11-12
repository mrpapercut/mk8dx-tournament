type Player = {
    id: number,
    name: string,
    rounds: {
        round: number,
        points: number
    }[],
    previousOpponents: string[]
}

type Players = Player[]

type GroupSetup = {
    3: number,
    4: number,
    total: number
}

declare enum WinCondition {
    Top1Group = 'top1group',
    Top2Group = 'top2group',
    Top1Round = 'top1round',
    Top2Round = 'top2round',
}

type Group = {
    players: Players,
    condition: WinCondition,
}

declare enum RoundType {
    Initial = 'initial',
    Winners = 'winners',
    Losers = 'losers'
}

type Round = {
    roundNumber: number,
    // roundType: RoundType,
    groupSetup: GroupSetup,
    groups: Group[]
}

type Rounds = Round[];
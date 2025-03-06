export function randomizeArray(array: any[]): any[] {
    return array.sort((a, b) => Math.random() > 0.5 ? 1 : -1);
}

export function getMarioNames(): string[] {
    return [
        'Mario', 'Luigi', 'Peach', 'Daisy', 'Rosalina',
        'Tanooki Mario', 'Cat Peach', 'Birdo', 'Yoshi', 'Toad',
        'Koopa Troopa', 'Shy Guy', 'Lakitu', 'Toadette', 'King Boo',
        'Petey Piranha', 'Baby Mario', 'Baby Luigi', 'Baby Peach', 'Baby Daisy',
        'Baby Rosalina', 'Metal Mario', 'Pink Gold Peach', 'Wiggler', 'Wario',
        'Waluigi', 'Donkey Kong', 'Bowser', 'Dry Bones', 'Bowser Jr',
        'Dry Bowser', 'Kamek', 'Lemmy', 'Larry', 'Wendy',
        'Ludwig', 'Iggy', 'Roy', 'Morton', 'Peachette',
        'Inkling Girl', 'Inkling Boy', 'Villager Male', 'Villager Female', 'Isabelle',
        'Link', 'Diddy Kong', 'Funky Kong', 'Pauline', 'Zelda'
    ];
}

export function getNames(): string[] {
    const playerNames = `

    `.split('\n').map(n => n.trim()).filter(n => n);

    if (playerNames.length === 0) return getMarioNames();

    return playerNames;
}

export const localStorage = {
    get: (key: string): string => window.localStorage.getItem(key),
    set: (key: string, value: string): void => window.localStorage.setItem(key, value),
    remove: (key: string): void => window.localStorage.removeItem(key)
}

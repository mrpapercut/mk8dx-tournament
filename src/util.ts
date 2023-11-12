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
        'Waluigi', 'Donkey Kong', 'Bowser', 'Dry Bones', 'Bowser Jr.',
        'Dry Bowser', 'Kamek', 'Lemmy', 'Larry', 'Wendy',
        'Ludwig', 'Iggy', 'Roy', 'Morton', 'Peachette',
        'Inkling Girl', 'Inkling Boy', 'Villager (male)', 'Villager (female)', 'Isabelle',
        'Link', 'Diddy Kong', 'Funky Kong', 'Pauline', 'Zelda'
    ];
}

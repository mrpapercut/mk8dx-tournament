export function randomizeArray(array: any[]): any[] {
    return array.sort((a, b) => Math.random() > 0.5 ? 1 : -1);
}

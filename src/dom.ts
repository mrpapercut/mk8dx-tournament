export function getElement(tagName: string, content?: string) {
    const element = document.createElement(tagName);

    if (content) {
        element.innerText = content;
    }

    return element;
}

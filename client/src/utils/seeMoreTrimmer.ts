export function seeMoreOfPost(input: string, length: number) {
    return input.length > length ? `${input.slice(0, length)}... Click to see more` : input;
}
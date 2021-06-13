export const getRandomInt = (max: number): number => Math.floor(Math.random() * (max + 1));

export const getRandomColor = (): string => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export default getRandomInt;

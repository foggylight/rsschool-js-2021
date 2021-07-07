export const correctSound = './audio/correct.mp3';
export const errorSound = './audio/error.mp3';

export const getRandomInt = (max: number): number => Math.floor(Math.random() * (max + 1));

export const countPercentage = (value: number, total: number): number =>
  Math.round((value / total) * 100);

export const playAudio = (src: string): HTMLAudioElement => {
  const newAudio = new Audio(src);
  newAudio.play();
  return newAudio;
};

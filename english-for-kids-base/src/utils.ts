export const correctSound = '../public/audio/correct.mp3';
export const errorSound = '../public/audio/error.mp3';

export const getRandomInt = (max: number): number => Math.floor(Math.random() * (max + 1));

export const playAudio = (src: string): HTMLAudioElement => {
  const newAudio = new Audio(src);
  newAudio.play();
  return newAudio;
};

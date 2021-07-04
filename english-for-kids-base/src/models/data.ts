export interface ICategory {
  id: number;
  name: string;
  image: string;
}

export interface ICard {
  id: number;
  categoryId: number;
  word: string;
  translation: string;
  image: string;
  audio: string;
}

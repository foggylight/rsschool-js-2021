export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Card {
  id: number;
  categoryId: number;
  word: string;
  translation: string;
  image: string;
  audio: string;
}

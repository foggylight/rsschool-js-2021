export interface IPropsCard {
  setReload?: (a: boolean) => void;
  id: number;
  category_id?: number;
  word: string;
  translation: string;
  image: string;
  audio: string;
}

export interface IPropsCategory {
  id: number;
  name: string;
}

export interface IPropsCategoryCard {
  setReload?: (a: boolean) => void;
  id: number;
  name: string;
  image: string;
}

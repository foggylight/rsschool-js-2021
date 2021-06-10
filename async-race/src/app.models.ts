export interface IPage {
  path: string;
  render(): void;
  delete(): void;
}

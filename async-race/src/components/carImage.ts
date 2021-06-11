import icon from '../car.svg';

export default class CarImage {
  public node: HTMLElement;

  car: SVGPathElement;

  constructor(parentNode: HTMLElement | null = null, color: string) {
    this.node = document.createElement('div');
    this.node.classList.add('car-icon-container');
    this.node.innerHTML = icon;
    this.car = this.node.querySelector('.car-icon__shape') as SVGPathElement;
    this.car.style.fill = color;

    if (parentNode) {
      parentNode.append(this.node);
    }
  }

  changeColor(color: string): void {
    console.log(this.car, color);
  }
}

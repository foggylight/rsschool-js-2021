import icon from '../car.svg';

export default class Car {
  public node: HTMLElement;

  public car: SVGSVGElement | null;

  carShape: SVGPathElement;

  constructor(parentNode: HTMLElement | null = null, color: string, id: number) {
    this.node = document.createElement('div');
    this.node.classList.add('car-icon-container');
    this.node.innerHTML = icon;
    this.car = this.node.querySelector('svg');
    if (this.car) this.car.id = `car-${id}`;
    this.carShape = this.node.querySelector('.car-icon__shape') as SVGPathElement;
    this.carShape.style.fill = color;

    if (parentNode) {
      parentNode.append(this.node);
    }
  }
}

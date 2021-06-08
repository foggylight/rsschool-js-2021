import defaultImage from '../../../assets/user-image.png';

export default class Avatar {
  node: HTMLDivElement;

  constructor(imgSrc: string) {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('avatar-container');
    const image = new Image();
    if (imgSrc.length === 0) {
      image.src = defaultImage;
    } else {
      image.src = imgSrc;
    }
    image.alt = 'user avatar';
    image.classList.add('user-block__avatar');
    imageContainer.append(image);
    this.node = imageContainer;
  }
}

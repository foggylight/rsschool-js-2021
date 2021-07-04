import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { IPropsCategoryCard } from '../models/props';

function CategoryCard({ image, name }: IPropsCategoryCard): ReactElement {
  return (
    <Link to={`/${name.toLowerCase()}`} className="card-container category-card">
      <img className="card-image" src={image} alt="category description" />
      <p className="card-word category-card__text">{name}</p>
    </Link>
  );
}

export default CategoryCard;

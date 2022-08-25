import React from 'react';
import { Card } from 'react-bootstrap';

const RecomendationCard = (recomendation, indexParam) => recomendation
  .filter((_item, index) => index === Number(indexParam))
  .map(({ type, thumb, name, id }) => (
    <Card
      key={ id }
      data-testid={ `${indexParam}-recomendation-card` }
      className="recipe-card"
    >
      <img
        src={ thumb }
        alt="Recomendation Recipe"
        className="d-block w-100"
      />
      <p>{ type }</p>
      <h4 data-testid={ `${indexParam}-recomendation-title` }>{ name }</h4>
    </Card>
  ));

export default RecomendationCard;

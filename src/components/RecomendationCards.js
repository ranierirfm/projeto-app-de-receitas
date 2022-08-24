import React from 'react';
import { Card, Carousel, CarouselItem } from 'react-bootstrap';
import PropTypes from 'prop-types';

function RecomendationCard({ recomendation }) {
  const createCard = (index) => {
    const {
      type, thumb, name, id,
    } = recomendation[index];

    return (
      <Card
        key={ id }
        data-testid={ `${index}-recomendation-card` }
        className="recipe-card"
      >
        <img
          src={ thumb }
          alt="Recomendation Recipe"
          className="d-block w-100"
        />
        <p>{ type }</p>
        <h4>{ name }</h4>
      </Card>
    );
  };

  const recomendationIndex = ['0', '1', '2', '3', '4', '5'];

  return (
    <Carousel className="carousel" variant="dark" interval={ 10000 }>
      <CarouselItem>
        <div
          className="recomendation-card"
        >
          {createCard(Number(recomendationIndex[0]))}
          {createCard(Number(recomendationIndex[1]))}
        </div>
      </CarouselItem>
      <CarouselItem>
        <div
          className="recomendation-card"
        >
          {createCard(Number(recomendationIndex[2]))}
          {createCard(Number(recomendationIndex[3]))}
        </div>
      </CarouselItem>
      <CarouselItem>
        <div
          className="recomendation-card"
        >
          {createCard(Number(recomendationIndex[4]))}
          {createCard(Number(recomendationIndex[5]))}
        </div>
      </CarouselItem>
    </Carousel>
  );
}

RecomendationCard.propTypes = {
  recomendation: PropTypes.arrayOf(Object),
}.isrequired;

export default RecomendationCard;

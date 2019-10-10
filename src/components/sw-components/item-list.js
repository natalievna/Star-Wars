import React from 'react';
import { withData, withSwapiService, withChildFunction, compose} from '../hoc-helper';
import ItemList from '../item-list';

const renderName = ({ name }) => <span>{name}</span>;
const renderModel = ({ name, model }) => <span>{name} ({model})</span>

const mapPersonMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPeople
    }
};

const mapStarshipMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllStarships
    }
};

const mapPlanetMethodsTopProps = (swapiService) => {
    return {
        getData: swapiService.getAllPlanets
    }
};

const PersonList = compose(
                            withSwapiService(mapPersonMethodsToProps),
                            withData,
                            withChildFunction(renderName)
                            )(ItemList);
const StarshipList = compose(
                            withSwapiService(mapStarshipMethodsToProps),
                            withData,
                            withChildFunction(renderModel)
                            )(ItemList);
const PlanetList = compose(
                           withSwapiService(mapPlanetMethodsTopProps),
                           withData,
                           withChildFunction(renderName)
                           )(ItemList);

export {
    PersonList,
    StarshipList,
    PlanetList
};
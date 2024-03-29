export default class SwapiService {

    _apiBase = 'https://swapi.co/api';

    getResource = async (url) => {

        const response = await fetch(`${this._apiBase}${url}`);

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}` +
                `received ${response.status}`);
        };

        return await response.json();
    };

    /** resources for people */

    getAllPeople = async () => {
        const response = await this.getResource(`/people/`);
        return response.results.map(this._transformPerson);
    };

    getPerson = async (id) => {
        const person = await this.getResource(`/people/${id}/`);
        return this._transformPerson(person);
    };

    getPersonImage = ( { id } )  => {
        return  `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
    };

    /** resources for planets */
    getAllPlanets = async () => {
        const response = await this.getResource(`/planets/`);
        return response.results.map(this._transformPlanet);
    };

    getPlanet = async (id) => {
        const planet = await this.getResource(`/planets/${id}/`);
        return this._transformPlanet(planet);
    };

    getPlanetImage = ( { id } )  => {
        return `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
    };

    /** resources for starships*/

    getAllStarships = async () => {
        const response = await this.getResource(`/starships/`);
        return response.results.map(this._transformStarship);
    };

    getStarship = async (id) => {
        const starship = await this.getResource(`/starships/${id}/`);
        return this._transformStarship(starship);
    };

    getStarshipImage = ( { id } ) => {
        return `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`
    }



    /** Функции для трансформации данных
     * подготовим модель данных
     * будем получать конкретные данные от API,
     * а не все данные находящиеся в API
     */

    _extractId(item) {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }

    _transformPlanet = (planet) => {

        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    }

    _transformPerson = (person) => {

        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            eyeColor: person.eye_color
        }
    }

    _transformStarship = (starship) => {

        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.cost_in_credits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargo_capacity
        }
    }
}
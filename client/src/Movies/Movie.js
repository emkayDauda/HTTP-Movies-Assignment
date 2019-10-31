import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

import { NavLink } from "react-router-dom";

import { Button, Card, Heading, Content } from "react-bulma-components";
import styled from "styled-components";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <StyledLink to={`/update-movie/${this.props.match.params.id}`}>
         
        <Button onClick={() => this.props.performDelete(this.state.movie.id)} color="danger">
            Delete
          </Button>

          <Button onClick={() => this.props.beginEdit(this.state.movie)} color="success">
            Edit
          </Button>

        </StyledLink>
      </div>
    );
  }
}

const StyledLink = styled(NavLink)`
  position: absolute;
  top: 70px;
  right: 25px;
  
  button {
    margin-left: 1.1rem;
  }
`;

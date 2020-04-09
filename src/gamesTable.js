import React, { Component } from "react";
import ReactTable from "react-table";
import api from "./Api.js";

import styled from "styled-components";

import "react-table/react-table.css";

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
  min-width: 600px;
  max-width: 1000px;
`;

class GamesList extends Component {
  // constructor(props) {
  //   super(props);
  // this.state = {
  //   games: [],
  //   isLoading: false
  // };
  // }

  // componentDidMount = async () => {
  //   this.setState({ isLoading: true });

  //   await api.getAllGames().then(games => {
  //     this.setState({
  //       games: games.data.data,
  //       isLoading: false
  //     });
  //   });
  // };

  render() {
    const games = this.props.games;
    const isLoading = this.props.isLoading;

    const columns = [
      {
        Header: "ID",
        accessor: "_id",
        filterable: true
      },
      {
        Header: "Answer",
        accessor: "Answer",
        filterable: true
      },
      {
        Header: "GuessedCharacters",
        accessor: "GuessedCharacters",
        filterable: true
      },
      {
        Header: "Win",
        accessor: "Win",
        filterable: true
      },
      {
        Header: "Loss",
        accessor: "Loss",
        filterable: true
      }
    ];

    let showTable = true;
    if (!games.length) {
      showTable = false;
    }

    return (
      <Wrapper>
        {showTable && (
          <ReactTable
            data={games}
            columns={columns}
            loading={isLoading}
            defaultPageSize={10}
            showPageSizeOptions={true}
            minRows={0}
          />
        )}
      </Wrapper>
    );
  }
}

export default GamesList;

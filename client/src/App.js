import logo from "./logo.svg";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

import React, { Component } from "react";
import { render } from "react-dom";
import Typed from "react-typed";

import axios from "axios";

function App() {
  const [ask, setAsk] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiResponseTyped, setAiResponseTyped] = useState([]);
  const [stateManipulator, setStateManipulator] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    let num = stateManipulator + 1;
    console.log(num);

    console.log(ask);

    // send state to server with e.g. `window.fetch`

    axios
      .post("http://localhost:8080/chat", { prompt: ask })
      .then((response) => {
        let parseResponse = response;
        console.log("parsed", parseResponse.data);
        setAiResponse(parseResponse.data.toString());
        setStateManipulator(num);
        // resetTyped(aiResponse);
        setAsk("");
        console.log("AI RES", aiResponse);
        let array = [];
        for (let i = 0; i < aiResponse.length; i++) {
          array.push(aiResponse[i]);
          setAiResponseTyped(array);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="App">
      <header className="App-header">
        <h2>moonglade.ai</h2>
        <hr />

        <Container>
          {/* <Typed value={aiResponse} strings={[aiResponse]} typeSpeed={40} /> */}
          <p>{aiResponse}</p>
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <input
              style={{
                width: "500px",
                height: "50px",
                fontSize: "20px",
                textAlign: "center",
              }}
              type="text"
              id="last"
              name="last"
              value={ask}
              onChange={(event) => setAsk(event.target.value)}
              autoComplete="off"
            />

            {/* <button type="submit">Submit</button> */}
          </form>
          <br />
          <hr />
          <i style={{ fontSize: "14px" }}>
            Note: Input is monitored. Illicit or illegal queries will be
            forwarded to the relevant authorities.
          </i>
        </Container>
      </header>
    </div>
  );
}

export default App;

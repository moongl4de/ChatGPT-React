/////////
/////////
/////////
/////////
// ***

//*** IMPORTANT ***

// I am well aware that this code is a bit sloppy. I had this idea and ran with it, I wanted to get this project off the ground as soon as possible.

//Over the coming weeks, I will be overhauling this entirely to better follow best practices and methodologies.

// ***
/////////
/////////
/////////
/////////

import logo from "./logo.svg";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import ShowSpinner from "./components/ShowSpinner";
import React, { Component } from "react";
import { render } from "react-dom";
import Typed from "react-typed";
import axios from "axios";

function App() {
  axios.get("https://moonglade-ai.onrender.com/").then((res) => {
    console.log("Pinging to wake up server: ", res);
  });

  const [ask, setAsk] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiResponseTyped, setAiResponseTyped] = useState([]);
  const [stateManipulator, setStateManipulator] = useState(1);
  const [showSpinner, setShowSpinner] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let num = stateManipulator + 1;
    // console.log(num);
    setShowSpinner(true);
    setAiResponse("");

    // console.log(ask);

    // send state to server with e.g. `window.fetch`

    axios
      .post("https://moonglade-ai.onrender.com/chat", { prompt: ask })
      .then((response) => {
        let parseResponse = response;
        console.log("parsed", parseResponse.data);
        setAiResponse(parseResponse.data.toString());
        setStateManipulator(num);
        // resetTyped(aiResponse);
        setAsk("");
        console.log("AI RES", aiResponse);

        setShowSpinner(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="containHead">
          <h1>moonglade.ai</h1>
        </div>
        <br />
        <br />
        <hr />

        <Container>
          <div className="containResponse">
            <Typed value={aiResponse} strings={[aiResponse]} typeSpeed={35} />
          </div>
          <br />
          <ShowSpinner showSpinner={showSpinner} />
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <input
              className="inputClass"
              type="text"
              id="last"
              name="last"
              placeholder="Ask me anything..."
              value={ask}
              onChange={(event) => setAsk(event.target.value)}
              autoComplete="off"
            />

            {/* <button type="submit">Submit</button> */}
          </form>
          <br /> <br />
          <hr />
        </Container>
      </header>
      <div className="bottomNotes">
        <i style={{ fontSize: "16px", color: "white", marginBottom: "8px" }}>
          For performance purposes, I am currently programmed to only respond
          using 50 characters or less.
        </i>
        <i
          style={{
            fontSize: "16px",
            color: "white",
            textDecoration: "underline",
          }}
        >
          <br />
          <strong>Note:</strong> Input is monitored. Illicit or illegal queries
          will be forwarded to the relevant authorities. <br />
        </i>
        <p className="aiResponse hidden">{aiResponse}</p>
      </div>
    </div>
  );
}

export default App;

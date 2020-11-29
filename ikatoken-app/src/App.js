import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import ikatoken from './ikatoken';
import { func } from 'prop-types';

function App() {

  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState(0);
  const [accounts, setAccounts] = useState({});

  useEffect(() => {
    console.log(ikatoken.options.address);
    console.log(ikatoken);
    ikatoken.methods.totalSupply().call().then(function (result) {
      setTotalSupply(result);
    }).catch(function (error) {
      console.log(error);
    });
  }, []);

  // useEffect(() => {
  //   ikatoken.methods.symbol().call().then(function (result) {
  //     setSymbol(result);
  //   }).catch(function (error) {
  //     console.log(error);
  //   });
  // }, []);

  // useEffect(() => {
  //   ikatoken.methods.totalSupply().call().then(function (result) {
  //     setTotalSupply(result);
  //   }).catch(function (error) {
  //     console.log(error);
  //   });
  // }, []);
  

  return (
    <div className="App">
      <h2>IkaToken Exchange</h2>
      <p>
        Token name: <b>{name}</b>
      </p>
      <p>
        Token symbol: <b>{symbol}</b>
      </p>
      <p>
        Total Supply: <b>{totalSupply}</b>
      </p>
    </div>
  );
}

export default App;

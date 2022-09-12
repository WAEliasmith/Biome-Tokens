import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import getConfig from "./config.js";
import * as nearAPI from "near-api-js";
import "./index.css";

// Initializing contract
async function initContract() {
  const nearConfig = getConfig(process.env.NODE_ENV || "testnet");

  // Initializing connection to the NEAR TestNet
  const near = await nearAPI.connect({
    deps: {
      keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
    },
    ...nearConfig,
  });

  // Needed to access wallet
  const walletConnection = new nearAPI.WalletConnection(near);

  // Initializing our contract APIs by contract name and configuration
  const contract = await new nearAPI.Contract(walletConnection.account(), nearConfig.contractName, {
    // View methods are read-only – they don't modify the state, but usually return some value
    viewMethods: ["getWinners", "getGameDetails", "getPlayersDetails", "getProfileDetails", "getActiveGames", "getCreatedGames", "getCompletedGames"],
    // Change methods can modify the state, but you don't receive the returned value when called
    changeMethods: ["createNewGame", "joinGame", "rollDice", "claimWinnings"],
    // Sender is the account ID to initialize transactions.
    // getAccountId() will return empty string if user is still unauthorized
    sender: walletConnection.getAccountId(),
  });

  return { contract, nearConfig, walletConnection };
}

window.nearInitPromise = initContract().then(({ contract, nearConfig, walletConnection }) => {
  ReactDOM.render(
    <React.StrictMode>
      <App contract={contract} nearConfig={nearConfig} wallet={walletConnection} />
    </React.StrictMode>,
    document.getElementById("root")
  );
});

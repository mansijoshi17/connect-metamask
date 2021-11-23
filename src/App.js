import React from "react";
import "./App.css";
import Web3 from "web3";
import Web3Modal from "web3modal";

function App() {
  const [account, setAccount] = React.useState("");
  const [balance, setBalance] = React.useState("");

  async function connectMetaMask() {
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    if (web3 !== "undefined") {
      const firstAccount = await web3.eth.getAccounts().then((data) => data[0]);
      setAccount(firstAccount);
      let accBalance = await web3.eth
        .getBalance(firstAccount)
        .then((balance) => web3.utils.fromWei(balance, "ether"));
      setBalance(parseFloat(accBalance).toFixed(2));
      provider.on("accountsChanged", async (accounts) => {
        setAccount(accounts[0]);
        accBalance = await web3.eth
          .getBalance(accounts[0])
          .then((balance) => web3.utils.fromWei(balance, "ether"));
        setBalance(parseFloat(accBalance).toFixed(2));
      });
    } else {
     alert("Please install metamask");
    }
  }

  const providerOptions = {};
  const web3Modal = new Web3Modal({
    network: "testnet",
    cacheProvider: true,
    providerOptions, // required
  });


  return (
    <div className="App">
      <button onClick={() => connectMetaMask()}>Connect Metamask</button>
      <h2>
        User Address: <p>{account}</p>
      </h2>
      <h2>
        User Balance: <p>{balance !== "" && balance + " " + "ethers"}</p>
      </h2>
    </div>
  );
}

export default App;

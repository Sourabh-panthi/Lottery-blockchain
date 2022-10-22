import { createContext, useState, useEffect, useContext } from "react";
import Web3 from "web3";
import CreateLotteryContract from "../utils/LotteryContract";
export const appContext = createContext();

export const AppProvider = ({ children }) => {
  const [web3, setWeb3] = useState();
  const [address, setAddress] = useState("");
  const [lotteryContract, setLotteryContract] = useState();
  const [lotteryPot, setLotteryPot] = useState();
  const [lotteryPlayers, setPlayers] = useState([]);
  const [lastWinner, setLastWinner] = useState([]);
  const [lotteryId, setLotteryId] = useState();
  const [etherscanUrl, setEtherscanUrl] = useState();

  const ConnectWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        // request wallet connection
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        // create a web3 instance
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        const accounts = await web3.eth.getAccounts();
        setAddress(accounts[0]);
        setLotteryContract(CreateLotteryContract(web3));

        window.ethereum.on("accountsChanged", async () => {
          const accounts = await web3.eth.getAccounts();
          setAddress(accounts[0]);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install the Metamask");
    }
  };

  const enterLottery = async () => {
    try {
      console.log("entering lottery");
      console.log("lotteryContract", lotteryContract);
      await lotteryContract.methods.enter().send({
        from: address,
        value: "15000000000000000",
        gas: 300000,
        gasPrice: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <appContext.Provider value={{ ConnectWallet, address, enterLottery }}>
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(appContext);
};

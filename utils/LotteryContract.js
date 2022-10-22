import { contractAddress, contractAbi } from "./constants";

const CreateLotteryContract = (web3) => {
  console.log("contractAddress", contractAddress);
  return new web3.eth.Contract(contractAbi, contractAddress);
};

export default CreateLotteryContract;

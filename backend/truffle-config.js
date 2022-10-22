const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");
module.exports = {
  mocha: {},
  compilers: {
    solc: {
      version: "0.8.15",
    },
  },
  networks: {
    inf_Lottery_goerli: {
      network_id: 5,
      gasPrice: 100000000000,
      provider: new HDWalletProvider(
        fs.readFileSync("../key.env", "utf-8"),
        "https://goerli.infura.io/v3/ff502fb518804d459de6963dd09e39c1"
      ),
    },
  },
};

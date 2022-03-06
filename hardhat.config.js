require("@nomiclabs/hardhat-waffle")

const fs = require("fs");
const privateKey = fs.readFileSync(".secret").toString();


module.exports = {

  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com/v1/cad0d678d5cdbe695c6ca08584dc510c0ad2fffb",
      accounts: [privateKey]
    },
    mainnet: {
      url: "https://rpc-mainnet.maticvigil.com/v1/cad0d678d5cdbe695c6ca08584dc510c0ad2fffb",
      accounts: [privateKey]
    }
  },
  solidity: "0.8.4",
};

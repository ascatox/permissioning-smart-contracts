const HDWalletProvider = require('@truffle/hdwallet-provider');
const path = require("path");
const dotenv = require('dotenv');

dotenv.config();

/* The address used when sending transactions to the node */
var address = process.env.BESU_NODE_PERM_ACCOUNT;

/* The private key associated with the address above */
var privateKey = process.env.BESU_NODE_PERM_KEY;

/* The endpoint of the Ethereum node */
var endpoint = process.env.BESU_NODE_PERM_ENDPOINT;
if (endpoint === undefined) {
  endpoint = "http://127.0.0.1:8545";
}

if (privateKey === undefined) {
  privateKey = '0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63'
}

module.exports = {
  networks: {
    besu: {
     provider: () => new HDWalletProvider(privateKey, endpoint),
     network_id: "*",
     from: address
    },
    ganache: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    }
  },

  contracts_build_directory: path.join(__dirname, "src/chain/contracts"),

  compilers: {
    solc: {
      version: "0.8.6",
      settings: {
       optimizer: {
         enabled: false,
         runs: 200
       },
      }
    }
  },

  mocha: {
    useColors: true,
    reporter: 'mocha-multi-reporters',
    reporterOptions: {
      configFile: './mocha-reporter-config.json',
    },
  },

  plugins: ['solidity-coverage']
};

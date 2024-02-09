import {
  getCoinMarketCapApiKey,
  getEtherscanApiKey,
  getInfuraApiKey,
  getPrivateKey
} from "./src/EnvParams";
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-solhint";
import "@nomiclabs/hardhat-etherscan";
import "@typechain/ethers-v5";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import { NetworksUserConfig } from "hardhat/types";

const getInfuraURL = (network: string) => {
  return `https://${network}.infura.io/v3/${getInfuraApiKey()}`;
};

const networks: NetworksUserConfig = {
  hardhat: {
    hardfork: "istanbul",
    allowUnlimitedContractSize: true,
    gasPrice: "auto",
    gas: 13000000,
    forking: {
      url: getInfuraURL("sepolia")
    }
  },
  sepolia: {
    url: getInfuraURL("sepolia"),
    chainId: 5,
    accounts: [getPrivateKey("sepolia")],
    gas: "auto", // 20000000
    gasPrice: 200000000000 //"auto"
  },
  mainnet: {
    url: getInfuraURL("mainnet"),
    chainId: 1,
    accounts: [getPrivateKey("mainnet")],
    gas: "auto", // 20000000
    gasPrice: "auto" // 100000000000
  }
};

export default {
  networks,

  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1,
        details: {
          yul: false
        }
      }
    }
  },
  namedAccounts: {
    deployer: {
      default: 0
    }
  },
  etherscan: {
    apiKey: {
      sepolia: getEtherscanApiKey(),
      mainnet: getEtherscanApiKey()
    }
  },
  gasReporter: {
    currency: "USD",
    coinmarketcap: getCoinMarketCapApiKey()
  },
  dodoc: {},
  typechain: {
    outDir: "typechain",
    target: "ethers-v5"
  }
};

import { run } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { getEnvParams } from "../src/EnvParams";

let admin: SignerWithAddress;

const func: DeployFunction = async ({
  // @ts-ignore
  getNamedAccounts,
  // @ts-ignore
  deployments,
  // @ts-ignore
  ethers,
  network
}) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  [, admin] = await ethers.getSigners();
  const env = getEnvParams(network.name);

  const constructorArguments = [
    env.NAME,
    env.SYMBOL,
    env.DECIMALS,
    env.LZENDPOINT
  ];

  const nativeOFTV2 = await deploy("NativeOFTV2", {
    from: deployer,
    args: constructorArguments,
    log: true
  });

  // verify contract with etherscan, if its not a local network or celo
  if (network.name !== "hardhat") {
    try {
      await run("verify:verify", {
        address: nativeOFTV2.address,
        constructorArguments
      });
    } catch (error) {
      if (
        !error.message.includes("Contract source code already verified") &&
        !error.message.includes("Reason: Already Verified")
      ) {
        throw error;
      }
    }
  }
};

func.tags = ["NativeOFTV2"];
export default func;

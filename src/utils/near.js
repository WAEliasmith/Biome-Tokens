import Big from "big.js";
import { connect, keyStores } from "near-api-js";
import { hexy } from "hexy";

export const txFee = Big(0.5)
  .times(10 ** 24)
  .toFixed();
export const GAS = Big(3)
  .times(10 ** 13)
  .toFixed();

export const txReturnArgsFromHash = async ({ hash, accountId }) => {
  const config = {
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };
  const near = await connect(config);

  const {
    receipts_outcome: [
      {
        outcome: { status },
      },
    ],
  } = await near.connection.provider.txStatus(hash, accountId);

  return status.SuccessValue;
};

export const decodeArgs = (args) => {
  const decodedArgs = Buffer.from(args, "base64");
  let prettyArgs;
  try {
    prettyArgs = JSON.parse(decodedArgs.toString());
    // prettyArgs = JSON.stringify(parsedJSONArgs, null, 2);
  } catch {
    prettyArgs = hexy(decodedArgs, { format: "twos" });
  }

  return prettyArgs;
};

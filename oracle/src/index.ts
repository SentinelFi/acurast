import { Keypair, Networks , contract} from "@stellar/stellar-sdk";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const RPC_URL = process.env.SOROBAN_RPC_URL;
if (!RPC_URL) {
  throw new Error("Missing required environment variable: SOROBAN_RPC_URL");
}

const NETWORK = process.env.IS_STELLAR_TESTNET === "true" ? Networks.TESTNET : Networks.PUBLIC;

const SECRET = process.env.STELLAR_SECRET_KEY;
if (!SECRET) {
  throw new Error("Missing required environment variable: STELLAR_SECRET_KEY");
}

const KEYPAIR = Keypair.fromSecret(SECRET);

const CONTRACT_ID = process.env.ORACLE_CONTRACT_ID;
if (!CONTRACT_ID) {
  throw new Error("Missing required environment variable: CONTRACT_ID");
}

declare const _STD_: any;

if (typeof _STD_ === "undefined") {
  // If _STD_ is not defined, we know it's not running in the Acurast Cloud.
  // Define _STD_ here for local testing.
  console.log("Running in local environment");
  (global as any)._STD_ = {
    app_info: { version: "local" },
    job: { getId: () => "local" },
    device: { getAddress: () => "local" },
  };
}

async function callContract() {
  if (!CONTRACT_ID || !RPC_URL) return;
  const { signTransaction } = contract.basicNodeSigner(KEYPAIR, NETWORK);
  const client : any = await contract.Client.from({
    contractId: CONTRACT_ID,
    networkPassphrase: NETWORK,
    rpcUrl: RPC_URL,
    publicKey: KEYPAIR.publicKey(),
    signTransaction,
  });
  console.log("Calling smart contract");
  try {
    const arbitrary_value = 99;
    const transaction = await client.provide_data({
      provider: KEYPAIR.publicKey(),
      value: arbitrary_value, // Value
      timestamp: Date.now(), // Current timestamp
      attestation: undefined // Not required
    });
    let { result: response } = await transaction.signAndSend();
    console.log('Contract response:');
    console.log(response);
  } catch (e) {
    console.log("Error calling contract:", e);
  }
}

async function compute() {
  try {
    const _ = await callContract();
    console.log("Finished");
  } catch (error) {
    console.log("Error:", error);
  }
}

compute();

# Sentinel Acurast Oracle

[![network](https://img.shields.io/badge/network-testnet-purple)](https://stellar.org)

Oracle [script ↗](./oracle/src/index.ts) to invoke Soroban smart contract from the [Acurast ↗](https://acurast.com/) Trusted Execution Environment (TEE). Configuration file is available [here ↗](./oracle/acurast.json).

> [!Warning]
> While we strive to ensure this software functions as intended, it is provided “as is” with no warranties or guarantees of any kind. By using this software, you acknowledge and agree that: You use it entirely at your own risk. You should perform your own due diligence. We do not accept any liability for any loss of funds, damages, or other consequences resulting from the use or misuse of this code.

## Getting Started

1. Install project dependencies:

```bash
cd oracle
npm install
```

2. Configure Environment

Edit environment variables in the `.env` file.
An example configuration is provided [here ↗](./oracle/.env.example).

3. Run Locally:

```bash
npm run bundle
node ./dist/bundle.js
```

4. Deploy to Acurast Compute

```bash
npm run deploy
```

---

## Troubleshooting

Ensure that certificates are correctly configured:

```bash
sudo apt-get update && sudo apt-get install --reinstall ca-certificates
export NODE_OPTIONS="--use-openssl-ca"
export NODE_EXTRA_CA_CERTS="/etc/ssl/certs/ca-certificates.crt"
```

To obtain testnet tokens, visit the [Acurast faucet ↗](https://faucet.acurast.com?address=) and fund your Acurast account.

## License

This project is licensed under the [Apache License 2.0](./LICENSE)

---

⚡ **Notice:** This is a work in progress. Expect updates. Join our [community ↗](https://x.com/sentinel_fi/) to stay updated on the latest developments.

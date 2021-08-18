import { GasPrice } from "@cosmjs/stargate";

export type NonEmptyArray<ElementType> = { readonly 0: ElementType } & readonly ElementType[];

export interface BackendSettings {
  readonly nodeUrls: NonEmptyArray<string>;
  readonly denominations: readonly string[];
  readonly addressPrefix: string;
  readonly gasPrice: GasPrice;
  readonly keplrChainInfo?: any;
}

const devnetSettings: BackendSettings = {
  nodeUrls: ["http://167.172.103.118:26657"],
  denominations: ["boot"],
  addressPrefix: "bostrom",
  gasPrice: GasPrice.fromString("0.01boot"),
  keplrChainInfo: {
    rpc: "http://167.172.103.118:26657",
    rest: "http://167.172.103.118:1317",
    chainId: "bostrom-testnet-4",
    chainName: "bostrom-testnet",
    stakeCurrency: {
      coinDenom: "boot",
      coinMinimalDenom: "boot",
      coinDecimals: 0,
    },
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: "bostrom",
      bech32PrefixAccPub: "bostrompub",
      bech32PrefixValAddr: "bostromvaloper",
      bech32PrefixValPub: "bostromvaloperpub",
      bech32PrefixConsAddr: "bostromvalcons",
      bech32PrefixConsPub: "bostromvalconspub",
    },
    currencies: [
      {
        coinDenom: "BOOT",
        coinMinimalDenom: "boot",
        coinDecimals: 0,
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "BOOT",
        coinMinimalDenom: "boot",
        coinDecimals: 0,
      },
    ],
    features: ["stargate"],
  },
};

// const devnetStargateSettings: BackendSettings = {
//   nodeUrls: ["http://167.172.103.118:26657"],
//   denominations: ["boot"],
//   addressPrefix: "bostrom",
//   gasPrice: GasPrice.fromString("0.01boot"),
// };

// const musselnetSettings: BackendSettings = {
//   nodeUrls: ["https://rpc.musselnet.cosmwasm.com"],
//   denominations: ["umayo", "ufrites"],
//   addressPrefix: "wasm",
//   gasPrice: GasPrice.fromString("0.25ucosm"),
// };

// const oysternetSettings: BackendSettings = {
//   nodeUrls: ["http://rpc.oysternet.cosmwasm.com"],
//   denominations: ["usponge"],
//   addressPrefix: "wasm",
//   gasPrice: GasPrice.fromString("0.25ucosm"),
//   keplrChainInfo: {
//     rpc: "http://rpc.oysternet.cosmwasm.com",
//     rest: "http://lcd.oysternet.cosmwasm.com",
//     chainId: "oysternet-1",
//     chainName: "Wasm Oysternet",
//     stakeCurrency: {
//       coinDenom: "SPONGE",
//       coinMinimalDenom: "usponge",
//       coinDecimals: 6,
//     },
//     bip44: {
//       coinType: 118,
//     },
//     bech32Config: {
//       bech32PrefixAccAddr: "wasm",
//       bech32PrefixAccPub: "wasmpub",
//       bech32PrefixValAddr: "wasmvaloper",
//       bech32PrefixValPub: "wasmvaloperpub",
//       bech32PrefixConsAddr: "wasmvalcons",
//       bech32PrefixConsPub: "wasmvalconspub",
//     },
//     currencies: [
//       {
//         coinDenom: "SPONGE",
//         coinMinimalDenom: "usponge",
//         coinDecimals: 6,
//       },
//     ],
//     feeCurrencies: [
//       {
//         coinDenom: "SPONGE",
//         coinMinimalDenom: "usponge",
//         coinDecimals: 6,
//       },
//     ],
//     features: ["stargate"],
//   },
// };

const knownBackends: Partial<Record<string, BackendSettings>> = {
  devnet: devnetSettings,
};

export function getCurrentBackend(): BackendSettings {
  const id = process.env.REACT_APP_BACKEND || "devnet";
  const backend = knownBackends[id];
  if (!backend) {
    throw new Error(`No backend found for the given ID "${id}"`);
  }
  return backend;
}

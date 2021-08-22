# react-ens-name

A React Component which resolves ENS Names. It does a reverse lookup of an Ethereum Address to accomplish this. This component also caches ENS names using Zustand on the client side.

If the address cannot be resolved, the address will be formatted for you. There are a variety of ways to format the address. The default is to display the last 4 digits of an ETH Address (0x...F314).

Note: `customDisplay` is favored over any other fallback address display preferences.

Note: No styling on the component is provided.

## Install

Using npm:

`npm install ethereum-ens-name`

Using yarn:

`yarn add ethereum-ens-name`

## Usage

### Basic

Provide ENSName component an ethereum address and it will resolve it

```javascript
const IndexPage = () => {
  return (
    <div className="index">
      Index
      <ENSName address="0xD286064cc27514B914BAB0F2FaD2E1a89A91F314"></ENSName>
      <style jsx>{`
        .index {
        }
      `}</style>
    </div>
  );
};
```

### Using Custom Provider

```javascript
const IndexPage = () => {
  import { ethers } from ethers

  const provider =new ethers.providers.JsonRpcProvider(
    "https://mainnet.infura.io/v3/<INFURA_KEY>"
  );

  return (
    <div className="index">
      Index
      <ENSName
        address="0xD286064cc27514B914BAB0F2FaD2E1a89A91F314",
        provider={provider}
      ></ENSName>
      <style jsx>{`
        .index {
        }
      `}</style>
    </div>
  );
};
```

### Using Custom Display

```javascript
const randomFormat = (address: string | undefined) => {
  return address.slice(0, getRandomInt(40) + 2)
}

const IndexPage = () => {
  import { ethers } from ethers

  return (
    <div className="index">
      Index
      <ENSName
        address="0xD286064cc27514B914BAB0F2FaD2E1a89A91F314",
        customDisplay={randomFormat}
      ></ENSName>
      <style jsx>{`
        .index {
        }
      `}</style>
    </div>
  );
};
```

### Params

- `address` - the ethereum address to resolve the ens name for
- `provider` - can choose to provide a custom provider to resolve the ENS name (infura, metamask). By default the mainnet will be used
- `displayType` - How to display the address if ENS can't resolve the name
  - "FULL", // display: 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B
  - "LAST4", // display: 0xeC9B
  - "LAST6", // display: 0x9aeC9B
  - "FIRST4", // display: 0xAb58
  - "FIRST6", // display: 0xAb5801
  - "FIRST4_LAST4", // display: 0xAb58...eC9B
  - "FIRST6_LAST6", // display: 0xAb5801...9aeC9B
- "withEllipses" - Adds "..." where it makes sense for the display
- `customDisplay` - provide a function which takes the address (0x...) and formats it in a custom way

### Formatting Options

## TODO

- Validate ETH Address
  - Handle API failure cleanly
- Use decentralized way of resolving ENS name (using The Graph subgraph for ENS?)
- Cleanup Codebase
- Request Feedback & Suggestions
- Component Styling?

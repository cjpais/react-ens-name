import { Provider } from "@ethersproject/providers";
import React, { useEffect } from "react";

// needed for function
import create from "zustand";
import { persist } from "zustand/middleware";

export enum AddressDisplayEnum {
  // Sample address is: 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B
  FULL = "FULL",
  LAST4 = "LAST4", // display: 0xeC9B
  LAST6 = "LAST6", // display: 0x9aeC9B
  FIRST4 = "FIRST4", // display: 0xAb58
  FIRST6 = "FIRST6", // display: 0xAb5801
  FIRST4_LAST4 = "FIRST4_LAST4", // display: 0xAb58...eC9B
  FIRST6_LAST6 = "FIRST6_LAST6", // display: 0xAb5801...9aeC9B
}

interface ENSNameProps {
  address?: string;
  provider?: Provider;
  displayType?: AddressDisplayEnum;
  withEllipses?: boolean;
  customDisplay?: (address: string | undefined) => string; // this overrides any paramater in displayType
}

type ENSStoreData = {
  name: string;
  lastUpdated: Date;
};

type ENSStoreState = {
  addressBook: Record<string, ENSStoreData>;
};

const useENSStore = create<ENSStoreState>(
  persist(
    () => ({
      addressBook: {},
    }),
    { name: "ens-address-book" }
  )
);

function ellipses(ellipses?: boolean) {
  return ellipses ? "..." : "";
}

function formatAddress(args: ENSNameProps) {
  let addr = args.address;
  let e = args.withEllipses;
  if (args.customDisplay) {
    return args.customDisplay(addr);
  }

  if (args.displayType) {
    switch (args.displayType) {
      case AddressDisplayEnum.FULL: {
        return `${addr}`;
      }
      case AddressDisplayEnum.FIRST4: {
        return `${addr?.slice(0, 6)}${ellipses(e)}`;
      }
      case AddressDisplayEnum.FIRST6: {
        return `${addr?.slice(0, 8)}${ellipses(e)}`;
      }
      case AddressDisplayEnum.LAST4: {
        return `0x${ellipses(e)}...${addr?.slice(addr.length - 4)}`;
      }
      case AddressDisplayEnum.LAST6: {
        return `0x${ellipses(e)}${addr?.slice(addr.length - 6)}`;
      }
      case AddressDisplayEnum.FIRST4_LAST4: {
        return `${addr?.slice(0, 6)}${ellipses(e)}${addr?.slice(
          addr.length - 4
        )}`;
      }
      case AddressDisplayEnum.FIRST6_LAST6: {
        return `${addr?.slice(0, 8)}${ellipses(e)}${addr?.slice(
          addr.length - 6
        )}`;
      }
    }
  } else {
    return `0x${ellipses(e)}${addr?.slice(addr.length - 4)}`;
  }
}

const useProviderLookup = (addr: string, provider: Provider) => {
  provider.lookupAddress(addr).then((name) => {
    if (name) {
      useENSStore.setState((state) => ({
        addressBook: {
          ...state.addressBook,
          [addr]: { name, lastUpdated: new Date() },
        },
      }));
    } else {
      useENSStore.setState((state) => ({
        addressBook: {
          ...state.addressBook,
          [addr]: { name: addr, lastUpdated: new Date() },
        },
      }));
    }
  });
};

const useAPILookup = (addr: string) => {
  let name = addr;

  fetch(`https://api.ensideas.com/ens/resolve/${addr}`)
    .then((v) => {
      return v.json();
    })
    .then((data) => {
      if (data.name != null) {
        name = data.name;
        useENSStore.setState((state) => ({
          addressBook: {
            ...state.addressBook,
            [addr]: { name, lastUpdated: new Date() },
          },
        }));
      } else {
        useENSStore.setState((state) => ({
          addressBook: {
            ...state.addressBook,
            [addr]: { name: addr, lastUpdated: new Date() },
          },
        }));
      }
    });
};

const useENSName = (args: ENSNameProps) => {
  const addr = args.address?.toLowerCase();

  const ensName = useENSStore((state) =>
    addr ? state.addressBook[addr] || addr : null
  );

  useEffect(() => {
    if (!addr || !ensName) return;
    if (ensName.name && ensName.name.toLowerCase() != addr) return;

    // only attempt to update the names once a day
    if (ensName.lastUpdated) {
      const now = new Date();
      const plusDay = new Date(
        new Date(ensName.lastUpdated).getTime() + 1 * 86400000
      );

      if (now < plusDay) return;
    }

    if (args.provider) {
      useProviderLookup(addr, args.provider);
    } else {
      useAPILookup(addr);
    }
  }, [ensName]);

  return ensName?.name?.toLowerCase() == addr
    ? formatAddress(args)
    : ensName?.name;
};

export const ENSName = (props: ENSNameProps) => {
  const name = useENSName(props);

  return <>{name}</>;
};

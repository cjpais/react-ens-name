import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ethers } from "ethers";

import { AddressDisplayEnum, ENSName } from "../ENSName";

export default {
  title: "Example/ENSName",
  component: ENSName,
} as ComponentMeta<typeof ENSName>;

const Template: ComponentStory<typeof ENSName> = (args) => (
  <ENSName {...args} />
);

const provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/9e55ae7e1685411abf37e7e1af924d22"
);

export const ValidLookup = Template.bind({});
ValidLookup.args = {
  address: "0xD286064cc27514B914BAB0F2FaD2E1a89A91F314",
  provider: provider,
};

export const ValidLookupNoProvider = Template.bind({});
ValidLookupNoProvider.args = {
  address: "0xD286064cc27514B914BAB0F2FaD2E1a89A91F314",
};

export const BasicInvalidLookup = Template.bind({});
BasicInvalidLookup.args = {
  address: "0x91f10670090796f3dc0229ED99e7370C7c73a5e1",
  provider: provider,
};

export const BasicInvalidLookupEllipses = Template.bind({});
BasicInvalidLookupEllipses.args = {
  address: "0x91f10670090796f3dc0229ED99e7370C7c73a5e1",
  provider: provider,
  withEllipses: true,
};

export const BasicInvalidLookupNoProvider = Template.bind({});
BasicInvalidLookupNoProvider.args = {
  address: "0x91f10670090796f3dc0229ED99e7370C7c73a5e1",
};

export const Full = Template.bind({});
Full.args = {
  address: "0x91f10670090796f3dc0229ED99e7370C7c73a5e1",
  provider: provider,
  displayType: AddressDisplayEnum.FULL,
};

export const First4 = Template.bind({});
First4.args = {
  address: "0x91f10670090796f3dc0229ED99e7370C7c73a5e1",
  provider: provider,
  displayType: AddressDisplayEnum.FIRST4,
};

export const First6 = Template.bind({});
First6.args = {
  address: "0x91f10670090796f3dc0229ED99e7370C7c73a5e1",
  provider: provider,
  displayType: AddressDisplayEnum.FIRST6,
};

export const Last4 = Template.bind({});
Last4.args = {
  address: "0x91f10670090796f3dc0229ED99e7370C7c73a5e1",
  provider: provider,
  displayType: AddressDisplayEnum.LAST4,
};

export const Last6 = Template.bind({});
Last6.args = {
  address: "0x91f10670090796f3dc0229ED99e7370C7c73a5e1",
  provider: provider,
  displayType: AddressDisplayEnum.LAST6,
};

export const First4Last4 = Template.bind({});
First4Last4.args = {
  address: "0x91f10670090796f3dc0229ED99e7370C7c73a5e1",
  provider: provider,
  displayType: AddressDisplayEnum.FIRST4_LAST4,
};

export const First6Last6 = Template.bind({});
First6Last6.args = {
  address: "0x91f10670090796f3dc0229ED99e7370C7c73a5e1",
  provider: provider,
  displayType: AddressDisplayEnum.FIRST6_LAST6,
};

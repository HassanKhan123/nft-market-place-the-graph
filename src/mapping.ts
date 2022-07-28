import { BigInt } from "@graphprotocol/graph-ts";
import {
  ItemBought,
  ItemCancelled,
  ItemListed,
} from "../generated/NftMarketPlace/NftMarketPlace";

export function handleItemBought(event: ItemBought): void {}

export function handleItemCancelled(event: ItemCancelled): void {}

export function handleItemListed(event: ItemListed): void {}

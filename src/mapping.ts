import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  ItemBought as ItemBoughtEvent,
  ItemCancelled as ItemCancelledEvent,
  ItemListed as ItemListedEvent,
} from "../generated/NftMarketPlace/NftMarketPlace";
import {
  ItemBought,
  ActiveItem,
  ItemCancelled,
  ItemListed,
} from "../generated/schema";

export function handleItemBought(event: ItemBoughtEvent): void {
  let itemBought = ItemBought.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );

  if (!itemBought) {
    itemBought = new ItemBought(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }

  itemBought.buyer = event.params.buyer;
  itemBought.tokenId = event.params.tokenId;
  itemBought.nftAddress = event.params.nftAddress;
  activeItem!.buyer = event.params.buyer;

  itemBought.save();
  activeItem!.save();
}

export function handleItemCancelled(event: ItemCancelledEvent): void {
  let itemCancelled = ItemCancelled.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );

  if (!itemCancelled) {
    itemCancelled = new ItemCancelled(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }

  itemCancelled.seller = event.params.seller;
  itemCancelled.tokenId = event.params.tokenId;
  itemCancelled.nftAddress = event.params.nftAddress;
  activeItem!.buyer = Address.fromString(
    "0x000000000000000000000000000000000000dEaD"
  );

  itemCancelled.save();
  activeItem!.save();
}

export function handleItemListed(event: ItemListedEvent): void {
  let itemListed = ItemListed.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );

  if (!itemListed) {
    itemListed = new ItemListed(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  if (!activeItem) {
    activeItem = new ActiveItem(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }

  itemListed.seller = event.params.seller;
  itemListed.tokenId = event.params.tokenId;
  itemListed.nftAddress = event.params.nftAddress;
  itemListed.price = event.params.price;

  activeItem!.seller = event.params.seller;
  activeItem!.nftAddress = event.params.nftAddress;
  activeItem!.tokenId = event.params.tokenId;
  activeItem!.price = event.params.price;

  itemListed.save();
  activeItem!.save();
}

function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
  return tokenId.toHexString() + nftAddress.toHexString();
}

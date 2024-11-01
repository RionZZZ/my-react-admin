export enum AssetStatusEnum {
  IDLE = 0,
  RECEIVE = 1,
  BORROW = 2,
  DISPOSAL = 3,
  MAINTENANCE = 4,
}

export enum AssetSourceEnum {
  PURCHASE = "1",
  LEASE = "2",
  BUILD = "3",
  DONATION = "4",
  OTHER = "5",
}

export enum AssetTypeEnum {
  RECEIVE = "0",
  RETURN = "1",
  BORROW = "2",
  REVERT = "3",
  DISPOSAL = "4",
  MAINTENANCE = "5",
}

export enum DisposalTypeEnum {
  SCRAP = 0,
  LOSSES = 1,
  SELL = 2,
  INVENTORY_LOSS = 3,
  DONATION = 4,
  TERMINATE_LEASE = 5,
  OTHER = 6,
}

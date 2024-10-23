export enum ExceptionEnum {
  PAGE_NOT_ACCESS = 403,
  PAGE_NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export enum GenderEnum {
  MALE = 0,
  FEMALE = 1,
}

export enum DeleteEnum {
  FALSE = 0,
  TRUE = 1,
}

export enum UserStatusEnum {
  ENABLE = 0,
  DISABLE = 1,
}

export enum LabelTypeEnum {
  BARCODE = 1,
  QRCODE = 2,
}

export enum LabelSelectEnum {
  SELECTED = 0,
  UNSELECTED = 1,
}

export enum AssetStatusEnum {
  IDLE = 0, //"闲置"
  INUSE = 1, //"在用"
  BORROW = 2, //"借用"
  HANDLED = 3, //"已处置"
  MAINTENANCE = 4, //"维护"
}

export enum AssetSourceEnum {
  PURCHASE = 1,
  LEASE = 2,
  BUILD = 3,
  DONATION = 4,
  OTHER = 5,
}

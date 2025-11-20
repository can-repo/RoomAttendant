export interface RoomDetail {
  Room: string;
  ReservationID: string;
  StatusHK: string;
  StatusFO: string;
  Guestname: string;
  ArrivalDate: Date;
  DepatureDate: Date;
  FlagDoubleLock: number;
  FlagDND: number;
  FlagRejectFORCleaning: number;
  FlagNL: number;
  FlagGuestSick: number;
  FlagGuestHandicap: number;
  BorrowedItem: number;
  FlagMSG: number;
  FlagHoneymooner: number;
  FlagComplain: number;
  FlagSleepOUT: number;
  FlagLockedMinibar: number;
  FlagMR: number;
  FlagTransactionClose: number;
  Vplevel: number;
  NoteRoommessage: string;
  NotePrefer: string;
}

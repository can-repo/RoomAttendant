export interface RoomDetail {
  room: string
  folio: string
  status_hk: string
  status_fo: string
  guestname: string
  arrivaldate: Date
  departuredate: Date // Fixed typo from "depaturedate" to "departuredate"
  flagdoublelock: number
  flagdnd: number
  flagrejectforcleaning: number
  flagnl: number
  flagguestsick: number
  flagguesthandicap: number
  borroweditem: number
  flagmsg: number
  flaghoneymooner: number
  flagcomplain: number
  flagsleepout: number
  flaglockedminibar: number
  flagmr: number
  flagtransactionclose: number
  vplevel: number
  noteroommessage: string
  noteprefer: string
}

export interface Ticket {
  num: number;
  idExcursion: number;
  userId: number;
  etat: string;
  prix: number;
  nbAdultes: number;
  nbEnfants: number;
  nbBebe: number;
  dateVente: Date;
}

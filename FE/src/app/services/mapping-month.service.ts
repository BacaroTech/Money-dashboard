import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MappingMonthService {
  private months = new Map([
        ["01", "gennaio"],
        ["02", "febbraio"],
        ["03", "marzo"],
        ["04", "aprile"],
        ["05", "maggio"],
        ["06", "giugno"],
        ["07", "luglio"],
        ["08", "agosto"],
        ["09", "settembre"],
        ["10", "ottobre"],
        ["11", "novembre"],
        ["12", "dicembre"],
    ]);

  convertToName(numberMonth: string): string {
    return this.months.get(numberMonth) as string;
}
}

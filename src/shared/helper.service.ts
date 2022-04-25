import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class HelperService {
  constructor() { }

  /**
   * Method that creates the parameters url
   * @param formulario 
   * @returns string
   */
  public getUrl(params: any): string {
    let url = "?";

    for (const key in params) {
      if (params[key] !== null && params[key] !== '') {
        url += key + "=" + encodeURIComponent(params[key]) + "&";
      }
    }

    // Removes the last character '&'
    return url.substr(0, url.length - 1);
  }

  /**
   * Method that creates the Data Table options
   * @param paging 
   * @param pageLength 
   * @returns 
   */
  public createDataTableOptions(paging?: boolean, pageLength?: number): DataTables.Settings {     
    // The last column (Edit) should not be orderable
    const configColumns = [
      { orderable: false, targets: -1 },
    ]

    return {
      pagingType: "simple_numbers",
      paging: paging,
      pageLength: pageLength,
      searching: false,
      lengthChange: false,
      info: false,
      order: [0, "asc"],
      columnDefs: configColumns,
    } as DataTables.Settings;
  }
}
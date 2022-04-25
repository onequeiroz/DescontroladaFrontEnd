import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, timer } from "rxjs";
import { catchError, map, mergeMap, retryWhen } from "rxjs/operators";
import { environment } from "src/environments/environment";

export class CommunicationService {
    private baseUrl = environment.baseUrl;
    private attemptsLimit = 5;

    constructor(
        private readonly moduleName: string,
        public readonly http: HttpClient,
    ) { }

    /**
     * Calls the Get request
     * @param method 
     * @param params 
     * @returns Any
     */
    get(method: string, params: any): any {
        let header = new HttpHeaders();
        header = header.append('Content-Type', 'application/json');

        const url = this.baseUrl + '/' + this.moduleName + '/' + method + params;

        return this.http
            .get(url, { headers: header })
            .pipe(
                map((data: any) => {
                    return data ? data : null;
                }), retryWhen(this.tryAgain),
                catchError((res: HttpErrorResponse | any) => {
                    return this.error(res);
                })
            );
    }

    /**
     * Calls the Post request
     * @param method 
     * @param obj 
     * @returns Any
     */
    post(method: string, obj: any): Observable<any> {
        let header = new HttpHeaders();
        header = header.append('Content-Type', 'application/json');

        const url = this.baseUrl + '/' + this.moduleName + '/' + method;

        return this.http
            .post(url, obj, { headers: header })
            .pipe(
                map((data: any) => {
                    if (data && data.status === 1) {
                        return data.object;
                    } else {
                        return null;
                    }
                }),
                retryWhen(this.tryAgain),
                catchError((res: HttpErrorResponse | any) => {
                    return this.error(res);
                })
            );
    }

    /**
     * Calls the Put request
     * @param method 
     * @param obj 
     * @returns Any
     */
    put(method: string, obj: any) {
        let header = new HttpHeaders().append('Content-Type', 'application/json');

        const url = this.baseUrl + '/' + this.moduleName + '/' + method;

        return this.http
            .put(url, obj, { headers: header })
            .pipe(
                map((data: any) => {
                    if (data && data.status === 1) {
                        return data.object;
                    } else {
                        return null;
                    }
                }),
                retryWhen(this.tryAgain),
                catchError((res: HttpErrorResponse | any) => {
                    return this.error(res);
                })
            );
    }

    /**
     * Calls the Delete request
     * @param method 
     * @param param 
     * @returns Any
     */
    delete(method: string, param: any): Observable<any> {
        let header = new HttpHeaders();
        header = header.append('Content-Type', 'application/json');

        const url = this.baseUrl + '/' + this.moduleName + '/' + method + '?id=' + param;

        return this.http
            .delete(url, { headers: header })
            .pipe(
                map((data: any) => {
                    if (data) {
                        alert('Item deletado com sucesso');
                        return data;
                    } else {
                        return null;
                    }
                }),
                retryWhen(this.tryAgain),
                catchError((res: HttpErrorResponse | any) => {
                    return this.error(res);
                })
            );
    }

    /**
     * The method retries the requets until reach {attemptsLimit} value
     * @param attempts 
     * @returns 
     */
    private tryAgain(attempts: Observable<any>) {
        return attempts.pipe(
            mergeMap((error, attempt) => {
                if (attempt === this.attemptsLimit || error.status === 500) {
                    return throwError(() => new Error(error));
                } else {
                    return timer(1000);
                }
            })
        );
    }

    /**
     * Alerts the error message or a default error message
     * @param res 
     * @returns 
     */
    private error(res: HttpErrorResponse | any): any {
        if (res.error && Array.isArray(res.error.ErrorResponse) && res.error.ErrorResponse.length && res.error.ErrorResponse[0].Message) {
            alert(res.error.ErrorResponse[0].Message);
        } else {
            alert('Serviço temporariamente indisponível.');
        }
        return throwError(() => new Error(res.error));
    }
}
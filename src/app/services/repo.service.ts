import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import { IRepo, IRepoTitle } from "../model/interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class RepoService {
  constructor(private http: HttpClient) {}

  getRepos(): Observable<IRepo[]> {
    return this.http
      .get<IRepo[]>(`${environment.apiUrl}/orgs/nodejs/repos`)
      .pipe(
        map((item: IRepo[]) => {
          return item;
        }),
        catchError(this.handleError)
      );
  }

  getRepoDetails(reponame: string): Observable<IRepoTitle[]> {
    return this.http
      .get<IRepoTitle[]>(
        `${environment.apiUrl}/repos/nodejs/${reponame}/issues?state=open`
      )
      .pipe(
        map((item: IRepoTitle[]) => {
          return item;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error("server error:", error);
    if (error.error instanceof Error) {
      let errMessage = error.error.message;
      return Observable.throw(errMessage);
    }
    return Observable.throw(error);
  }
}

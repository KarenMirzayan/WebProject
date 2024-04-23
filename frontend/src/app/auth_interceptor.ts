import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {UserService} from "./user.service";
import {Token} from "./models";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: UserService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const access = localStorage.getItem("access");
    if (access) {
      const newReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${access}`)
      });
      return next.handle(newReq).pipe(
        catchError((error: any) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            return this.handle401Error(req, next);
          }
          return throwError(() => { return error});
        })
      );
    }

    return next.handle(req);
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Handle token refreshing here
    return this.authService.refreshToken().pipe(
      switchMap((newAccessToken: string) => {
        const newReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${newAccessToken}`)
        });
        localStorage.setItem("access", newAccessToken);
        return next.handle(newReq);
      }),
      catchError((error: any) => {
        this.authService.logout();
        this.router.navigate(['/login']);
        return throwError(() => { return error});
      })
    );
  }
}

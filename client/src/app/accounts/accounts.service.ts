import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReplaySubject, of } from 'rxjs';
import { IUser } from '../shared/models/User';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  baseUrl = environment.apiUrl;
  // jwtHelper = new JwtHelperService();
  decodedToken: any;
  occupation: string;
  currentUser: IUser;
  private currentUserSource: ReplaySubject<IUser> = new ReplaySubject<IUser>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  // tslint:disable-next-line:typedef
  loadCurrentUser(token: string) {
    if (token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    // let headers = new HttpHeaders();
    // headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'api/Account').pipe(
      map((user: IUser) => {
        if (user) {
          this.currentUser = user;
          localStorage.setItem('token', user.token);
          // this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.occupation = user.occupation;
          this.currentUserSource.next(user);
        }
      })
    );

  }

  // tslint:disable-next-line:typedef
  login(values: any) {
    return this.http.post(this.baseUrl + 'api/Account/login', values).pipe(
      map((user: IUser) => {
        if (user) {
          this.currentUser = user;
          localStorage.setItem('token', user.token);
         // this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.occupation = user.occupation;
          this.setCurrentUser(user);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  // tslint:disable-next-line:typedef
  registerClient(values: any) {
    const data = {
      displayName : values.contactName,
      email: values.email,
      password: values.password
    };
    return this.http.post(this.baseUrl + 'api/Account/register', data).pipe(
      map((user: IUser) => {
        if (user) {
          this.currentUser = user;
          localStorage.setItem('token', user.token);
          this.setCurrentUser(user);
          this.currentUserSource.next(user);
          return user;
        }
      })
    );
  }
  setCurrentUser(user: IUser): void {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }
  getDecodedToken(token): any {
    return JSON.parse(atob(token.split('.')[1]));
  }
  // tslint:disable-next-line:typedef
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser = null;
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }
  // tslint:disable-next-line:typedef
  loggedIn() {
    // const token = localStorage.getItem('token');
    // return !this.jwtHelper.isTokenExpired(token);
  }
  // tslint:disable-next-line:typedef
  checkEmailExists(email: string) {
    return this.http.get(this.baseUrl + 'account/emailexists?email=' + email);
  }
  // tslint:disable-next-line:typedef
  changeMemberPhoto(photoUrl: string) {
    this.currentUser.avatar = photoUrl;
    this.currentUserSource.next(this.currentUser);
  }
}

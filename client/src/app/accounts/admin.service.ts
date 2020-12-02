import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/Models/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsersWithRoles(): Observable<any> {
    return this.http.get<Partial<IUser[]>>(this.baseUrl + 'api/Admin/users-with-roles');
  }

  updateUserRoles(username: string, roles: string[]): Observable<any> {
    return this.http.post(this.baseUrl + 'api/admin/edit-roles/' + username + '?roles=' + roles, {});
  }
}

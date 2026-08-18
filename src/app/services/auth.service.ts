import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://portofolio-alfin-backend.vercel.app/api/admin';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        if (res && res.token) {
          localStorage.setItem('admin_token', res.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('admin_token');
  }

  getToken(): string | null {
    return localStorage.getItem('admin_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
  }

  // Admin CRUD helper calls
  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, data, { headers: this.getHeaders() });
  }

  addHighlight(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/highlights`, data, { headers: this.getHeaders() });
  }

  deleteHighlight(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/highlights/${id}`, { headers: this.getHeaders() });
  }

  addEducation(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/education`, data, { headers: this.getHeaders() });
  }

  updateEducation(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/education/${id}`, data, { headers: this.getHeaders() });
  }

  deleteEducation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/education/${id}`, { headers: this.getHeaders() });
  }

  addExperience(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/experiences`, data, { headers: this.getHeaders() });
  }

  updateExperience(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/experiences/${id}`, data, { headers: this.getHeaders() });
  }

  deleteExperience(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/experiences/${id}`, { headers: this.getHeaders() });
  }

  addSkill(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/skills`, data, { headers: this.getHeaders() });
  }

  updateSkill(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/skills/${id}`, data, { headers: this.getHeaders() });
  }

  deleteSkill(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/skills/${id}`, { headers: this.getHeaders() });
  }

  addCertificate(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/certificates`, data, { headers: this.getHeaders() });
  }

  updateCertificate(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/certificates/${id}`, data, { headers: this.getHeaders() });
  }

  deleteCertificate(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/certificates/${id}`, { headers: this.getHeaders() });
  }

  addProject(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/projects`, data, { headers: this.getHeaders() });
  }

  updateProject(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/projects/${id}`, data, { headers: this.getHeaders() });
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/projects/${id}`, { headers: this.getHeaders() });
  }
}

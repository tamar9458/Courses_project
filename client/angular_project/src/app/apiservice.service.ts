import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from './moduls/login/user.model';
import { Lacture } from './moduls/lacture/lacture.model';
import { Course } from './moduls/course/course.model';
import { Category } from './moduls/course/category.model';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private _http: HttpClient) {  }
  //user
  getAllUser(): Observable<User[]> {
    return this._http.get<User[]>(``);
  }
  getUser(user:string): Observable<User> {
    return this._http.get<User>(`/user/${user}`);
  }
  putUser(user: User): Observable<boolean> {
    return this._http.put<boolean>(``, {});
  }
  postUser(user: User): Observable<boolean> {
    return this._http.post<boolean>(``, {});
  }
  deleteUser(user: User): Observable<boolean> {
    return this._http.delete<boolean>(``);
  }
  //lacture
  getAllLacture(): Observable<Lacture[]> {
    return this._http.get<Lacture[]>(``);
  }
  getLactureById(id: number): Observable<Lacture> {
    return this._http.get<Lacture>(`/`);
  }
  putLacture(lacture: User): Observable<boolean> {
    return this._http.put<boolean>(``, {});
  }
  postLacture(lacture: User): Observable<boolean> {
    return this._http.post<boolean>(``, {});
  }
  deleteLacture(lacture: User): Observable<boolean> {
    return this._http.delete<boolean>(``);
  }
  //Course
  getAllCourse(): Observable<Course[]> {
    return this._http.get<Course[]>(``);
  }
  getCourseById(id: number): Observable<Course> {
    return this._http.get<Course>(`/`);
  }
  putCourse(course: Course): Observable<boolean> {
    return this._http.put<boolean>(``, {});
  }
  postCourse(course: Course): Observable<boolean> {
    return this._http.post<boolean>(``, {});
  }
  deleteCourse(course: Course): Observable<boolean> {
    return this._http.delete<boolean>(``);
  }
  getCourseOfCaegory(cat: Category): Observable<Course[]> {
    return this._http.get<Course[]>(`/api/s/cat=` + cat.name);
  }
  getCourseOfType(type: Category): Observable<Course[]> {
    return this._http.get<Course[]>(`/api/s/type=` + type);
  }
  getCourseOfName(name: string): Observable<Course[]> {
    if (name != "")
      return this._http.get<Course[]>("/api/s/name=" + name)
    else return this._http.get<Course[]>("/api/s/name=_")
  }
  //Category
  getAllCategory(): Observable<Category[]> {
    return this._http.get<Category[]>(``);
  }
  getCategoryById(id: number): Observable<Category> {
    return this._http.get<Category>(`/`);
  }
  putCategory(cat: Category): Observable<boolean> {
    return this._http.put<boolean>(``, {});
  }
  postCategory(cat: Category): Observable<boolean> {
    return this._http.post<boolean>(``, {});
  }
  deleteCategory(cat: Category): Observable<boolean> {
    return this._http.delete<boolean>(``);
  }
}

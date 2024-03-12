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
    return this._http.get<User[]>(`/api/User`);
  }
  getUser(user:string): Observable<User> {
    return this._http.get<User>(`/api/User/${user}`);
  }
  putUser(user: User): Observable<boolean> {
    return this._http.put<boolean>(``, {});
  }
  postUser(user: User): Observable<boolean> {
    return this._http.post<boolean>(`/api/User`, user);
  }
  deleteUser(user: User): Observable<boolean> {
    return this._http.delete<boolean>(``);
  }
  //lacture
  getAllLacture(): Observable<Lacture[]> {
    return this._http.get<Lacture[]>(`/api/Lecturer`);
  }
  getLactureById(id: number): Observable<Lacture> {
    return this._http.get<Lacture>(`/`);
  }
  getLactureByName(name: string): Observable<Lacture> {
    return this._http.get<Lacture>(`/api/Lecturer/${name}`);
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
    return this._http.get<Course[]>(`/api/Course`);
  }
  getCourseById(id: number): Observable<Course> {
    return this._http.get<Course>(`/`);
  }
  putCourse(course: Course): Observable<boolean> {
    return this._http.put<boolean>(`/api/Course/${course.id}`, course);
  }
  postCourse(course: Course): Observable<boolean> {
    return this._http.post<boolean>(`/api/Course`, course);
  }
  deleteCourse(course: Course): Observable<boolean> {
    return this._http.delete<boolean>(`/api/Course/${course.id}`);
  }
  getCourseOfCaegory(catId: number): Observable<Course[]> {
     return this._http.get<Course[]>(`/api/Course/category/` + catId);
  }
  getCourseOfType(type: number): Observable<Course[]> {
    return this._http.get<Course[]>(`/api/Course/type/` + type);
  }
  getCourseOfName(name: string): Observable<Course[]> {
    if (name != "")
      return this._http.get<Course[]>("/api/Course/name/" + name)
    else return this._http.get<Course[]>("/api/Course/name/_")
  }
  //Category
  getAllCategory(): Observable<Category[]> {
    return this._http.get<Category[]>(`/api/Category`);
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

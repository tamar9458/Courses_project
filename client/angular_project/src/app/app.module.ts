import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './moduls/login/login/login.component';
import { RegisterComponent } from './moduls/login/register/register.component';
import { AllCoursesComponent } from './moduls/course/all-courses/all-courses.component';
import { AddCourseComponent } from './moduls/course/add-course/add-course.component';
import { EditCourseComponent } from './moduls/course/edit-course/edit-course.component';
import { CourseDetailComponent } from './moduls/course/course-detail/course-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AllCoursesComponent,
    AddCourseComponent,
    EditCourseComponent,
    CourseDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

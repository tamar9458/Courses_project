import { NgModule } from "@angular/core";
import { AllCoursesComponent } from "./all-courses/all-courses.component";
import { CourseDetailComponent } from "./course-detail/course-detail.component";
import { EditCourseComponent } from "./edit-course/edit-course.component";
import { CommonModule, NgClass, NgSwitch } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CourseRoutingModule } from "./course-routing.module";
import { IconPipe } from './icon.pipe';


@NgModule({
    declarations:[EditCourseComponent,AllCoursesComponent,CourseDetailComponent, IconPipe],
    imports:[CommonModule,NgClass,NgSwitch,FormsModule,HttpClientModule,CourseRoutingModule,ReactiveFormsModule],
    providers:[],
    exports:[AllCoursesComponent,CourseDetailComponent]
})
export class CourseModule{

}
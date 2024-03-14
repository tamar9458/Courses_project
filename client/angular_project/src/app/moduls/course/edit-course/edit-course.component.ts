import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/apiservice.service';
import { Course } from '../course.model';
import { Category } from '../category.model';
import { Lacture } from '../../lacture/lacture.model';
import { FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: []
})
export class EditCourseComponent {
  constructor(private _api: APIService, private _router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const add = params['add'];
      this.isEdit = add == ":add" ? false : true;
    });

    this.route.queryParams.subscribe(params => {
      if (params['course']) {
        this.courseParam = JSON.parse(params['course']) as Course;
        this.course = this.courseParam
      }
      else {
        this.course = new Course()
      }
    })

    this._api.getAllCategory().subscribe(res => {
      this.categories = res;
    })
    this._api.getAllLacture().subscribe(res => {
      this.lactures = res;
    })

  }
  isEdit: boolean;
  courseParam: Course;
  lactures: Lacture[];
  categories: Category[];
  syllabus;
  controls;

  private _course: Course;
  public get course(): Course {
    return this._course;
  }
  @Input()
  public set course(c: Course) {
    this._course = c;
    this.courseForm = new FormGroup({
      "name": new FormControl(this.course?.name, [Validators.required]),
      "amount": new FormControl(this.course?.amount, [Validators.required]),
      "image": new FormControl(this.course?.image, [Validators.minLength(3), this.imageValidator]),
      "learningType": new FormControl(this.course?.learningType, [Validators.required]),
      "beginDate": new FormControl(this.course?.beginDate, [Validators.required]),
      "categoryId": new FormControl(this.course?.categoryId,),
      "lecturerId": new FormControl("", []),
      "syllabus": this.fb.array([])
    })
    this.course.syllabus?.forEach(sillibo => {
      (this.courseForm.get('syllabus') as FormArray).push(new FormControl(sillibo));
    });
    this.addSyllabus();
    this.syllabus = this.courseForm.get('syllabus') as FormArray;
    this.controls = this.syllabus.controls;
  }
  courseForm: FormGroup = new FormGroup({});

  cancel() {
    this.courseForm.patchValue({
      ...this.courseParam
    });
    this._router.navigate([`/course`])
  }
  fillCourse() {
    this.course.name = this.courseForm.value["name"];
    this.course.amount = this.courseForm.controls["amount"].value;
    this.course.image = this.courseForm.controls["image"].value;
    this.course.learningType = this.courseForm.controls["learningType"].value;
    this.course.beginDate = this.courseForm.controls["beginDate"].value;
    this.course.categoryId = this.courseForm.controls["categoryId"].value;
    this.course.lecturerId = this.courseForm.controls["lecturerId"].value;
    this.course.id = this.isEdit ? this.courseParam?.id : 0;
    const syllabusArray = this.courseForm.get('syllabus') as FormArray;
    this.course.syllabus = syllabusArray.getRawValue();
    this.course.syllabus.pop()
  }
  onSubmit() {
    var ss = this.courseForm.value;
    this.fillCourse();
    ss.syllabus.pop();
    if (!this.isEdit) {
      this._api.postCourse(
        this.course
      )
        .subscribe(s => {
          if (s) {
            alert("add course");
          }
          else {
            alert("failed to add course");
          }
        })
    }
    else {
      this._api.putCourse(this.course).subscribe(s => {
        if (s) {
          alert("edit course");
        }
        else {
          alert("failed to edit course");
        }
      })
    }
    this._router.navigate([`/course`])
  }
  addSyllabus(): void {
    (this.courseForm.get('syllabus') as FormArray).push(new FormControl());
  }

  removeSyllabus(index: number): void {
    (this.courseForm.get('syllabus') as FormArray).removeAt(index);
  }
  getSyllabusControl(index: number) {

    return (this.courseForm.get('syllabus') as FormArray).controls[index] as FormControl;
  }
  onSyllabusChange(index: number, value: any) {
    const syllabusArray = this.courseForm.get('syllabus') as FormArray;
    const lastIndex = syllabusArray.length - 1;

    if (value.target.value !== '' && index === lastIndex) {
      this.addSyllabus();
    } else if (value.target.value === '' && index !== lastIndex) {
      syllabusArray.removeAt(index);
    }
  }
  imageValidator(control: FormControl) {
    const imageUrl = control.value;
    if (/(jpg)$/.test(imageUrl)) {
      return null;
    } else {
      return { invalidImage: true };
    }
  }
}

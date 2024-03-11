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
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent {
  constructor(private _api: APIService, private _router: Router, private route: ActivatedRoute,private fb: FormBuilder) { }

   
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const add = params['add'];
      this.isEdit = add=="add"?false:true;
     
    });
    this.route.queryParams.subscribe(params => {
      if (params['course']) {
        this.courseParam = JSON.parse(params['course']) as Course;
        console.log("curseParam",this.courseParam);
        
      }})
  this._api.getAllCategory().subscribe(res=>{
    this.categories=res;
    console.log("cats",this.categories,res);
    
  })
  this._api.getAllLacture().subscribe(res=>{
    this.lactures=res;
    console.log("lactures",this.lactures,res);

  }) 
  
  }
  isEdit:boolean;
  courseParam:Course;
  lactures:Lacture[];
  categories:Category[]; 
  courseForm=this.fb.group({
    id: [0],
    name: [''],
    categoryId: [],
    amount: [],
    beginDate: [],
    syllabus: this.fb.array(['']),
    learningType: [],
    lecturerId: [],
    image: ['']
  }); 
  // courseForm = new FormGroup({
  //   "id": new FormControl(0, []),
  //   "name": new FormControl("", []),
  //   "categoryId": new FormControl("", []),
  //   "amount": new FormControl("", []),
  //   "beginDate": new FormControl("", []),
  //   "syllabus": new FormGroup("", []),
  //   "learningType": new FormControl("", []),
  //   "lecturerId": new FormControl("", []),
  //   "image": new FormControl("", []),
  
  // })
  initializeSyllabus(): void {
    const syllabusArray = this.courseForm.get('syllabus') as FormArray;
    this.courseParam.syllabus.forEach(syllabusItem => {
      syllabusArray.push(this.fb.control(syllabusItem));
    });
  }
  private _course!: Course | null;
  @Input()
  public set course(value: Course) {
    this._course = value;
  }
  cancel(){  
    this.courseForm.patchValue({
      
    });
  }
  onSubmit() {
    var ss = this.courseForm.value;
    console.log("ss", ss);
    if(this.isEdit){
    this._api.postCourse(({id:ss?.id,name:ss?.name,categoryId:ss?.categoryId,
      lecturerId:ss?.lecturerId,learningType:ss?.learningType,image:ss?.image,
      syllabus:ss?.syllabus,beginDate:ss?.beginDate,amount:ss?.amount}))
      .subscribe(s=>{
      if(s){
        console.log("add course");
      }
      else{
        console.log("failed to add course");
      }
    })}
    else{
      this._api.putCourse({}).subscribe(s=>{
        if(s){
          console.log("edit course");
        }
        else{
          console.log("failed to edit course");
        }
      })
    }
    this._router.navigate([`/course`])
  }
  addSyllabus(): void {
    (this.courseForm.get('syllabus') as FormArray).push(this.fb.control(''));
  }
  
  removeSyllabus(index: number): void {
    (this.courseForm.get('syllabus') as FormArray).removeAt(index);
  }
}

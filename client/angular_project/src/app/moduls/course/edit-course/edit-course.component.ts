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
      console.log(params,"params");
      
      const add = params['add'];
      console.log("addparam",add);
      
      this.isEdit = add==":add"?false:true;
     console.log("isEdit",this.isEdit?"edit":"add");
     
    });

    this.route.queryParams.subscribe(params => {
      console.log("in param");
      
      if (params['course']) {
        this.courseParam = JSON.parse(params['course']) as Course;
        console.log("curseParam",this.courseParam);
        this.course=this.courseParam
      }
      else{
        this.course=new Course()
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
  syllabus;
  controls;
  // courseForm=this.fb.group({
  //   id: [0],
  //   name: [''],
  //   categoryId: [],
  //   amount: [],
  //   beginDate: [],
  //   syllabus: this.fb.array(['']),
  //   learningType: [],
  //   lecturerId: [],
  //   image: ['']
  // });
  private _course: Course;
  public get course(): Course {
    return this._course;
  } 
  @Input()
  public set course(c: Course) {
    console.log("in set courseForm");
    
    this._course = c;
    this.courseForm = new FormGroup({
      "name": new FormControl(this.course?.name, [Validators.required]),
      "amount": new FormControl(this.course?.amount, [Validators.required]),
      "image": new FormControl(this.course?.image, [Validators.minLength(3),this.imageValidator]),
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
  // initializeSyllabus(): void {
  //   const syllabusArray = this.courseForm.get('syllabus') as FormArray;
  //   this.courseParam.syllabus.forEach(syllabusItem => {
  //     syllabusArray.push(this.fb.control(syllabusItem));
  //   });
  // }
  // private _course!: Course | null;
  // @Input()
  // public set course(value: Course) {
  //   this._course = value;
  // }
  cancel(){  
    this.courseForm.patchValue({
      ...this.courseParam
    });
  }
  fillCourse() {
    this.course.name = this.courseForm.value["name"];
    this.course.amount = this.courseForm.controls["amount"].value;
    this.course.image = this.courseForm.controls["image"].value;
    this.course.learningType = this.courseForm.controls["learningType"].value;
    this.course.beginDate = this.courseForm.controls["beginDate"].value;
    this.course.categoryId = this.courseForm.controls["categoryId"].value;
    this.course.lecturerId=this.courseForm.controls["lecturerId"].value;
    this.course.id=this.isEdit?this.courseParam?.id:0;
    const syllabusArray = this.courseForm.get('syllabus') as FormArray;
    this.course.syllabus = syllabusArray.getRawValue();
    this.course.syllabus.pop()
  }
  onSubmit() {
    var ss = this.courseForm.value;
    this.fillCourse();
    ss.syllabus.pop();
    console.log("ss", ss);
    console.log("this.course", this.course);
console.log("add/edit",this.isEdit?"edit":"add");

    if(!this.isEdit){
    this._api.postCourse(
      // ({id:ss?.id,name:ss?.name,categoryId:ss?.categoryId,
      // lecturerId:ss?.lecturerId,learningType:ss?.learningType,image:ss?.image,
      // syllabus:ss?.syllabus,beginDate:ss?.beginDate,amount:ss?.amount})
      this.course
      )
      .subscribe(s=>{
      if(s){
        console.log("add course");
      }
      else{
        console.log("failed to add course");
      }
    })}
    else{
      this._api.putCourse(this.course).subscribe(s=>{
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
   // (this.courseForm.get('syllabus') as FormArray).push(this.fb.control(''));
    (this.courseForm.get('syllabus') as FormArray).push(new FormControl());
  }
  
  removeSyllabus(index: number): void {
    (this.courseForm.get('syllabus') as FormArray).removeAt(index);
    // const sillibosArray = this.courseForm.get('sillibos') as FormArray;
    // sillibosArray.removeAt(index);
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
    if (/^(http|https):\/\/.*\.(jpg)$/.test(imageUrl)) {
      return null; // Validation passed
    } else {
      return { invalidImage: true }; // Validation failed
    }
  }
}

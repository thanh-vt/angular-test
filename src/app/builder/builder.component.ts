import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Question} from "../model/question";
import {Subscription} from "rxjs";
import {ModalService} from "../service/modal.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {
  @ViewChild('modal', {read: ViewContainerRef})
  entry!: ViewContainerRef;
  sub!: Subscription;
  questionFormArray: FormArray = this.fb.array([]);
  questionFormGroup: FormGroup = this.fb.group({
    questions: this.questionFormArray
  });
  questionList: Question[] = [];
  questionId = 0;

  constructor(private fb: FormBuilder, private modalService: ModalService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  showDialog() {
    this.sub = this.modalService
    .openModal(this.entry)
    .subscribe(question => {
      console.log('add', question);
      this.addControl(question);
    });

  }

  closeDialog() {
    this.modalService.closeModal();
  }

  validateCheckboxGroup(): ValidatorFn {
    return (control: AbstractControl) => {
       if ((control as FormArray).getRawValue().some(e => !!e)) {
         return null;
       } else {
         return {required: true}
       }
    }
  }

  addControl(question: Question): void {
    this.questionList.push(question);
    let formControl: AbstractControl;
    if (question.type === 'paragraph') {
      formControl = this.fb.control('');
      if (question.required) {
        formControl.addValidators(Validators.required);
      }
    } else {
      formControl = this.fb.array(question.options?.map(_ => this.fb.control(false)) ?? []);
      if (question.allowAddAnswer) {
        (formControl as FormArray).push(this.fb.control(false));
      }
      if (question.required) {
        formControl.addValidators(this.validateCheckboxGroup());
      }
    }

    (this.questionFormGroup.get('questions') as FormArray).push(formControl);
  }

  changeOtherAnswer(event: Event, question: Question) {
    question.otherAnswer = (event.target as any)['value'];
  }

  submit(): void {
    this.questionFormGroup.markAllAsTouched();
    if (this.questionFormGroup.invalid) {
      return;
    }
    const questionsWithAnswers = this.questionFormGroup.getRawValue()
    .questions
    .map((answer: string[] | string | null, i: number) => {
      const question = this.questionList[i];
      if (question.type === 'paragraph') {
        question.answer = answer;
      } else {
        const options = question.options ?? [];
        const allOptions = question.allowAddAnswer ? [...options, question.otherAnswer ?? 'Other'] : options;
        question.answer = allOptions.filter((option: string, i: number) => !!answer?.[i]);
      }
      return question;
    });
    console.log(questionsWithAnswers);
    this.router.navigate(['answers'], {state: {questionsWithAnswers: questionsWithAnswers}})
  }
}

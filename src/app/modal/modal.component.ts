import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Question} from "../model/question";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup, ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder) {}

  @Output() closeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<Question>();
  optionBoxVisible: boolean = false;
  questionTemplateForm: FormGroup = this.fb.group({
    type: this.fb.control('paragraph', [Validators.required]),
    content: this.fb.control('', [Validators.required]),
    options: this.fb.array([]),
    allowAddAnswer: this.fb.control(false),
    required: this.fb.control(false),
    nextOption: this.fb.control('')
  }, {validators: [this.validateOptions()]});

  validateOptions(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.get('type')?.value === 'checkbox-list' && control.get('options')?.value?.length === 0) {
        return {
          message: 'Control type checkbox list must have at least 1 option'
        }
      } else return null;
    }
  }

  ngOnInit(): void {
    console.debug('Modal init');
  }

  close() {
    this.closeEvent.emit();
  }

  confirm() {
    this.questionTemplateForm.markAllAsTouched();
    if (this.questionTemplateForm.invalid) {
      console.debug(this.questionTemplateForm.errors);
      return;
    }
    const question: Question = {
      ...this.questionTemplateForm.getRawValue()
    }
    if (question.allowAddAnswer) {
      question.otherAnswer = 'Other';
    }
    this.confirmEvent.emit(question);
  }

  showOptionBox() {
    this.optionBoxVisible = true;
  }

  addOption() {
    const val = this.questionTemplateForm.get('nextOption')?.value;
    (this.questionTemplateForm.get('options') as FormArray).push(this.fb.control(val));
    this.optionBoxVisible = false;
    this.questionTemplateForm.get('nextOption')?.reset();
  }

  ngOnDestroy(): void {
    console.debug(' Modal destroyed');
  }
}

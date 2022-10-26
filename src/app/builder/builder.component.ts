import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Question} from "../model/question";
import {Subscription} from "rxjs";
import {ModalService} from "../service/modal.service";

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {
  @ViewChild('modal', {read: ViewContainerRef})
  entry!: ViewContainerRef;
  sub!: Subscription;
  questionForm: FormGroup = this.fb.group({});
  questionList: Question[] = [];
  questionId = 0;

  constructor(private fb: FormBuilder, private modalService: ModalService) {
  }

  ngOnInit(): void {
  }

  showDialog() {
    this.sub = this.modalService
    .openModal(this.entry)
    .subscribe(question => {
      //your logic
      console.log('add', question);
      this.addControl(question);
    });

  }

  closeDialog() {
    this.modalService.closeModal();
  }

  addControl(question: Question): void {
    question.name = `q${this.questionId++}`;
    this.questionList.push(question);
    if (question.type === 'paragraph') {
      this.questionForm.addControl(question.name, this.fb.control(''));
    } else {
      this.questionForm.addControl(question.name, this.fb.control(null));
    }
    console.log()
  }

}

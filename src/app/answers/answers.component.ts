import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Question} from "../model/question";

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  questions: Question[] = [];
  constructor(private router: Router) {
    const currentNav = this.router.getCurrentNavigation();
    const tmp = currentNav?.extras?.state?.['questionsWithAnswers'];
    if (tmp) {
      this.questions = tmp;
    }
    console.log(this.questions);
  }

  ngOnInit(): void {

  }

}

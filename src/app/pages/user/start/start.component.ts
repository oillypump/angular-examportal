import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid:any
  questions:any

  constructor(
    private locationStrategy:LocationStrategy,
    private _route:ActivatedRoute,
    private _questionService:QuestionsService
  ) { }

  ngOnInit(): void {
    this.preventBackButton()
    this.qid = this._route.snapshot.params['qid']
    
    console.log(this.qid)
    this.loadQuestions()
  }
  loadQuestions() {
    this._questionService.getQuestionOfQuizForTest(this.qid).subscribe(
      (data:any) => {
        this.questions = data
        console.log(data)
      },
      (error) => {
        console.log(error)
        Swal.fire('Error','Error in loading questions of quiz', 'error')
      }
    )
  }


  preventBackButton(){
    history.pushState(null, '', location.href)
    this.locationStrategy.onPopState(() => {
      history.pushState(null, '', location.href)
    })
  }
}

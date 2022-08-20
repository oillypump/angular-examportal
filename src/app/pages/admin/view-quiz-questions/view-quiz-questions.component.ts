import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId: any
  qTitle: any
  questions: any=[]

  constructor(
    private _route: ActivatedRoute,
    private _question:QuestionsService
 
  ) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid']
    this.qTitle = this._route.snapshot.params['title']
    this._question.getQuestionOfQuiz(this.qId).subscribe(
      (data:any) => {
        console.log(data)
        this.questions=data
      }, 
      (error) => {
        console.log(error); 
        
      }
    )
    console.log(this.qId)
    console.log(this.qTitle)
  }

}

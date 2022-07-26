import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId:any
  quizzes:any

  constructor(
    private _route:ActivatedRoute,
    private _quizService:QuizService

  ) { }

  ngOnInit(): void {

    // this.catId = this._route.snapshot.params['catId']
    // console.log(this.catId)
    this._route.params.subscribe((params) => {
      this.catId=params['catId']
      // console.log(params)
      if (this.catId == 0) {
        console.log('load all the quiz')
  
        this._quizService.getActiveQuizzes().subscribe(
          (data:any) => {
            this.quizzes =data
            console.log(this.quizzes)
          },
          (error) => {
            console.log(error)
            alert('error in loading all quizzes')
          }
        )
      } else {
        console.log('load specific quiz')
        this._quizService.getActiveQuizzesOfCategory(this.catId).subscribe(
          (data:any) => {
            this.quizzes = data
            console.log(this.quizzes)
          }, 
          (error) => {
            alert("error in loading quiz data")
          }
        )
      }
    })

  }

}

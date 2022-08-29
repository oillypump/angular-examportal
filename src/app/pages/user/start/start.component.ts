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

  marksGot = 0
  correctAnswer = 0
  attempted = 0

  isSubmit = false

  timer:any

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
        console.log(this.questions.length)

        this.timer = this.questions.length * 2 * 60
        
        console.log(this.timer)
        this.questions.forEach((q:any) => {
          q['givenAnswer'] = ''
        })
        console.log(this.questions)
        this.startTimer()
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

  submitQuiz(){
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: `Submit`,

      icon:'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz()
        // calculation
        // this.isSubmit = true

        // this.questions.forEach((q:any) => {
        //   if(q.givenAnswer == q.answer) {
        //     this.correctAnswer++
        //     let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length
        //     this. marksGot += marksSingle
            
        //   }

        //   if (q.givenAnswer.trim() != '') {
        //     this.attempted++

        //   }

        //   console.log("Correct Answer", this.correctAnswer)
        //   console.log("Marks Got", this.marksGot)
        //   console.log('attempted' ,this.attempted)
        //   console.log(this.questions)


        // })
      } 
    })
  }

  startTimer() {
    let t:any = window.setInterval(() => {
      // code
      if(this.timer <= 0){
        this.evalQuiz( )
        // this.submitQuiz()
        clearInterval(t);
      } else {
        this.timer--
      }
    },1000)
  }

  getFormattedTimer() {
    let mm = Math.floor(this.timer/60)
    let ss = this.timer-mm*60
    return `${mm} min : ${ss} sec`
  }

  evalQuiz() {
     
  }
}

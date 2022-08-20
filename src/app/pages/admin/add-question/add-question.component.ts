import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  qId:any
  qTitle:any
  question={
    quiz:{
      qId:Number,
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  }

  constructor(
    private _route:ActivatedRoute,
    private _questionService: QuestionsService
  ) { }

  ngOnInit(): void {

    this.qId = this._route.snapshot.params['qid']
    this.qTitle=this._route.snapshot.params['title']
    
    this.question.quiz['qId']=this.qId;

  }

  formSubmit() {
    if(this.question.content.trim()=='' || this.question.content == null) {
      return;
    }
    if (this.question.option1.trim()=='' || this.question.content == null) {  
      return;
    }
    if (this.question.option2.trim()=='' || this.question.option2 == null) {  
      return;
    }
    if (this.question.option3.trim()=='' || this.question.option3 == null) {  
      return;
    }
    if (this.question.option4.trim()=='' || this.question.option4 == null) {  
      return;
    }
    if (this.question.answer.trim()=='' || this.question.answer == null) {  
      return;
    }

    // form submit
    this._questionService.addQuestion(this.question).subscribe(
      (data:any) => {
        Swal.fire('Success ','Question Added, Add Another one','success')
        this.question.content = ''
        this.question.option1 = ''
        this.question.option2 = ''
        this.question.option3 = ''
        this.question.option4 = ''
        this.question.answer = ''

      },
      (error) => {
        Swal.fire('Erro','Error in adding question', 'error')
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {


  // quizzes=[
  //   {
  //     qId:1,
  //     title:'Basic Java',
  //     description:'asdasdasd',
  //     maxMarks:'100',
  //     numberOfQuestion:'20',
  //     active:'',
  //     category: {
  //       title: 'Programming'
  //     }
  //   },
  //   {
  //     qId:1,
  //     title:'Basic Java',
  //     description:'asdasdasd',
  //     maxMarks:'100',
  //     numberOfQuestion:'20',
  //     active:'',
  //     category: {
  //       title: 'Programming'
  //     }
  //   },
  //   {
  //     qId:1,
  //     title:'Basic Java',
  //     description:'asdasdasd',
  //     maxMarks:'100',
  //     numberOfQuestion:'20',
  //     active:'',
  //     category: {
  //       title: 'Programming'
  //     }
  //   },
  // ]
  quizzes:any
  
  constructor(private _quiz:QuizService) { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any)=> {
        this.quizzes=data;
        console.log(this.quizzes)
      },
      (error) => {
        console.log(error)
        Swal.fire('Error','Error in loading data !', 'error');
      }
    )
  }

  // delete quiz(qId)
  deleteQuiz(qId:any) {
    Swal.fire({
      icon:'info', 
      title:'Are you sure ?',
      confirmButtonText:'Delete',
      showCancelButton:true,

    }).then((result)=>{
      if(result.isConfirmed){

        // delete
        this._quiz.deleteQuiz(qId).subscribe(
          (data) => {
            
            this.quizzes = this.quizzes.filter(
              (quiz:any) => quiz.qId!=qId
            )
            Swal.fire('Succes','Quiz deleted','success')
          },
          (error) => {
            console.log(error)
            Swal.fire('Error','error in deleting quiz','error')
          }
        )
      }
    }
    )
     
  }

}

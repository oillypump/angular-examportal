import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(
    private _http:HttpClient
  ) { }

  public getQuestionOfQuiz(qid:any) {
    return this._http.get(`${baseUrl}/question/quiz/${qid}`)
  }
}
 
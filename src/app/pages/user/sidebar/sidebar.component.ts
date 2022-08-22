import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories:any

  constructor(
    private _category:CategoryService,
    private _snack:MatSnackBar
  ) { }

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data) => {
        this.categories=data
      },
      (error) => {
        this._snack.open('Error in loading categories','', {
          duration:3000,
        })
      }
    )
  }

}

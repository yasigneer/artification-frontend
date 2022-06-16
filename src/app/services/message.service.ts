import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(
    private snackBar: MatSnackBar
  ) { }
  showSuccessMessage(message:string){
    this.snackBar.open(message,'',{
      panelClass: ['snack-success'],
      duration:3000
    })
  }
  showInfoMessage(message:string){
    this.snackBar.open(message,'',{
      panelClass: ['snack-info'],
      duration:5000,
      verticalPosition: 'top'
    })
  }
  showErrorMessage(message:string){
    this.snackBar.open(message,'',{
      panelClass: ['snack-error'],
      duration:3000
    })
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  static imageExtensionValidator(fileType: string): boolean{
    let validFiles: string[] = ['images/jpeg','images/jpg', "images/png"]
    return validFiles.includes(fileType);
  }
}

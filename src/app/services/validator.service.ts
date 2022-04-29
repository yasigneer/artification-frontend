import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  public imageExtensionValidator(fileType: string): boolean{
    let validFiles: string[] = ['image/jpeg','image/jpg', "image/png"]
    return validFiles.includes(fileType);
  }
}

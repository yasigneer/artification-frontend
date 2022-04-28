import { Component, OnInit } from '@angular/core';
import {ValidatorService} from "../../services/validator.service";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  isDragged = false;
  constructor(protected validatorService:ValidatorService) { }
  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-cart',
  templateUrl: './post-cart.component.html',
  styleUrls: ['./post-cart.component.scss']
})
export class PostCartComponent implements OnInit {
  isHovered: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}

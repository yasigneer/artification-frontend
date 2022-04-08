import {AfterViewInit, Component, HostBinding} from '@angular/core';
import {fromEvent} from "rxjs";
import {distinctUntilChanged, filter, map, pairwise, share, throttleTime} from "rxjs/operators";
import {animate, state, style, transition, trigger} from "@angular/animations";

enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden'
}

enum Direction {
  Up = 'Up',
  Down = 'Down'
}

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  animations: [
    trigger('toggle', [
      state(
        VisibilityState.Hidden,
        style({ opacity: 0, transform: 'translateY(-100%)' })
      ),
      state(
        VisibilityState.Visible,
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
      transition('* => *', animate('200ms ease-in'))
    ])
  ]
})
export class NavigationBarComponent implements  AfterViewInit {
  private isVisible: boolean = true;

  @HostBinding('@toggle')
  get toggle(): VisibilityState{
    return this.isVisible? VisibilityState.Visible : VisibilityState.Hidden;
  }
  ngAfterViewInit(): void {
     const scroll$ = fromEvent(window,'scroll').pipe(
      throttleTime(10),
      map( () => window.pageYOffset ),
      pairwise(),
      map(([firstY,secondY]): Direction => secondY > firstY ? Direction.Down : Direction.Up),
      distinctUntilChanged(),
       share()
    );
    const scrollUp$ = scroll$.pipe(
      filter( direction => direction === Direction.Up )
    )
    const scrollDown$ = scroll$.pipe(
      filter( direction => direction === Direction.Down )
    )
    scrollDown$.subscribe(() => this.isVisible = false);
    scrollUp$.subscribe(() => this.isVisible = true);
    console.log(this.isVisible);
  }
}

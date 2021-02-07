import { Component, HostListener } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';
import {filter ,take} from 'rxjs/operators'
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Uowcos';
  loading:Boolean =true;

  inMobile:Boolean

  @HostListener("window:resize", [])
  onResize() {
    var width = window.innerWidth;
    console.log(width)
    if(width <= 460) {
      // console.log(" this.inMobile"+ this.inMobile);

return  this.inMobile = true;

    }
    // console.log(" this.inMobile"+ this.inMobile);

    return this.inMobile = false;
  }
//   constructor(private router: Router) {
//     router.events.pipe(filter(e => e instanceof NavigationEnd), take(1))
//                  .subscribe((e) => {
//                     this.loading = true;
//                 });
// }
// Sets initial value to true to show loading spinner on first load

constructor(private router: Router) {
  this.router.events.subscribe((e : RouterEvent) => {
     this.navigationInterceptor(e);
   })
}

// Shows and hides the loading spinner during RouterEvent changes
navigationInterceptor(event: RouterEvent): void {
  if (event instanceof NavigationStart) {
    this.loading = true
  }
  if (event instanceof NavigationEnd) {
    this.loading = false
  }

  // Set loading state to false in both of the below events to hide the spinner in case a request fails
  if (event instanceof NavigationCancel) {
    this.loading = false
  }
  if (event instanceof NavigationError) {
    this.loading = false
  }
}
}
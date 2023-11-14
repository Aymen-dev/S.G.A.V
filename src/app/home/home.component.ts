import { Component } from '@angular/core';
import { ExcursionService } from 'src/services/excursions.service';
import { Excursion } from 'src/services/excursion';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {

  constructor(private excursionService: ExcursionService) { }

  excursions: Excursion[] = [];

  ngOnInit() {
    this.excursionService.getExcursions()
      .subscribe({
        next: (response) => {
          if (response.status_code == 200)
            if (Array.isArray(response.data))
              this.excursions = response.data;
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  openLink(event: Event, linkName: string) {
    const x = document.getElementsByClassName("myLink");
    for (let i = 0; i < x.length; i++) {
      (x[i] as HTMLElement).style.display = "none";
    }

    const tablinks = document.getElementsByClassName("tablink");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
    }

    const targetElement = document.getElementById(linkName);
    if (targetElement) {
      targetElement.style.display = "block";
      (event.currentTarget as HTMLElement).className += " w3-red";
    }
  }

  ngAfterViewInit() {
    const firstTablink = document.getElementsByClassName("tablink")[0];
    if (firstTablink) {
      (firstTablink as HTMLElement).click();
    }
  }

}

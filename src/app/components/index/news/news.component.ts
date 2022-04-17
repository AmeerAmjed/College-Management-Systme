import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  loadingData: Boolean = true;
  post: any;

  constructor(
    private DashboardService: DashboardService

  ) { }

  ngOnInit(): void {
    this.DashboardService.post.subscribe(data => {
      let datapost = [];
      this.post = data;
      data.forEach(index => {
        // if (index.status == 'private')
        if (index.status == 'public')
          datapost.push(index);

      });
      this.post = datapost;
      this.loadingData = false;
    });


  }

}

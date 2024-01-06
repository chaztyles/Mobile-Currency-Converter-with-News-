import { Component, OnInit } from '@angular/core';
import { CurrencyNewsService } from '../currency-news.service';


@Component({
  selector: 'tab3-home',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  public title : string = 'News';
  public newsData: any[] = []; 

  constructor(private apiService: CurrencyNewsService) {}

  ngOnInit() {
    this.apiService.getNews().subscribe(
      (data) => {
        console.log('API Response:', data);
        this.newsData = data.articles; 
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
}

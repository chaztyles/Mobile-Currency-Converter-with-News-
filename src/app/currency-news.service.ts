import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyNewsService {
  private apiURL = 'https://newsapi.org/v2/everything?'; 
  private apiKey = '9e9f0e311434488abfe92007c8ffd9ea'; //replace with your API KEY
  constructor(private http: HttpClient) { }

  getNews(): Observable<any> {
    const currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; 
    let day = currentDate.getDate();
    

    const formattedTime = `${year}-${month}-${--day}`;
    const params = new HttpParams()
    
      .set('q', 'Currency')
      .set('from', formattedTime)
      .set('sortBy', 'popularity')
      .set('apiKey', this.apiKey);
      const apiUrlWithParams = `${this.apiURL}${params.toString()}`;
      console.log('API URL:', apiUrlWithParams);
      return this.http.get(this.apiURL,{params})
  }
  postData(data: any): Observable<any> {
    return this.http.post('${this.apiUrl}/endpoint',data);
  }

}


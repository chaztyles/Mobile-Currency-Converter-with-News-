import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CurrencyDataService {

  private apiUrl = 'https://api.fastforex.io';
  private apiKey = '313fbfac3a-c4ae9e5721-s6u8vo'; //replace with your API KEY

  constructor(private http: HttpClient) {}

  private selectedCurrencyCodeSubject = new BehaviorSubject<string>('');
  private favoriteCurrenciesSubject = new BehaviorSubject<string[]>([]);
  private secondBaseCurrency = new BehaviorSubject<string>('');
  private targetCurrency = new BehaviorSubject<string>('');



  setSelectedCurrencyCode(code: string) {
    this.selectedCurrencyCodeSubject.next(code);
  }

  getSelectedCurrencyCode(): Observable<string> {
    return this.selectedCurrencyCodeSubject.asObservable();
  }

  notifyCurrencyCodeUpdated() {
    this.selectedCurrencyCodeSubject.next(this.selectedCurrencyCodeSubject.value);
  }

  setSelectedSecondBaseCurrency(code: string) {
    this.secondBaseCurrency.next(code);
  }

  getSelectedSecondBaseCurrency(): Observable<string> {
    return this.secondBaseCurrency.asObservable();
  }

  notifySelectedSecondBaseCurrency() {
    this.secondBaseCurrency.next(this.selectedCurrencyCodeSubject.value);
  }

  setSelectedTargetCurrency(code: string) {
    this.targetCurrency.next(code);
  }

  getSelectedTargetCurrency(): Observable<string> {
    return this.targetCurrency.asObservable();
  }

  notifySelectedTargetCurrency() {
    this.targetCurrency.next(this.selectedCurrencyCodeSubject.value);
  }

  // Method to set the favorite currencies
  setFavoriteCurrencies(favoriteCurrencies: string[]) {
    localStorage.setItem('firstFavoriteCurrency', favoriteCurrencies[0]);
    localStorage.setItem('secondFavoriteCurrency', favoriteCurrencies[1]);
    localStorage.setItem('thirdFavoriteCurrency', favoriteCurrencies[2]);
    localStorage.setItem('fourthFavoriteCurrency', favoriteCurrencies[3]);

    // Update the subject and notify subscribers
    this.favoriteCurrenciesSubject.next(favoriteCurrencies);
  }

 // Inside CurrencyDataService
 getFavoriteCurrencies(): Observable<string[]> {
  return this.favoriteCurrenciesSubject.asObservable();
}

  updateFavoriteCurrencies(newFavoriteCurrencies: string[]): void {
  this.favoriteCurrenciesSubject.next(newFavoriteCurrencies);
}


  //one to one exchange rate
  fetchExchangeRate(from: string, to: string): Observable<any> {
    const url = `${this.apiUrl}/fetch?from=${from}&to=${to}`;
    const params = new HttpParams().set('api_key', this.apiKey);

    return this.http.get(url, {
      params: params,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  //one to many exchange rate
  fetchMultiExchangeRates(from: string, to: string[]): Observable<any> {
    const url = `${this.apiUrl}/fetch-multi?from=${from}&to=${to.join(',')}`;
    const params = new HttpParams().set('api_key', this.apiKey);

    return this.http.get(url, {
      params: params,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  //one to all exchange rate
  fetchAllExchangeRates(base: string): Observable<any> {
    const url = `${this.apiUrl}/fetch-all?from=${base}`;
    const params = new HttpParams().set('api_key', this.apiKey);

    return this.http.get(url, {
      params: params,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // fetch all currencies
  fetchAllCurrencies(): Observable<any> {
    const url = `${this.apiUrl}/currencies`;
    const params = new HttpParams().set('api_key', this.apiKey);

    return this.http.get(url, {
      params: params,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Modify the fetchAllCurrenciesByName method
  fetchAllCurrenciesByName(): Observable<{ [code: string]: string }> {
    const url = `${this.apiUrl}/currencies`;
    const params = new HttpParams().set('api_key', this.apiKey);
  
    return this.http.get<{ currencies: { [code: string]: string } }>(url, {
      params: params,
      headers: {
        'Content-Type': 'application/json',
      },
    }).pipe(
      map((response: { currencies: { [code: string]: string } }) => response.currencies),
    );
  }

  getConversionRate(from: string, to: string, amount: number): Observable<any> {
    const url = `${this.apiUrl}/convert?from=${from}&to=${to}&amount=${amount}&api_key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      tap(
        (data) => console.log('API Response:', data),
        (error) => console.error('API Error:', error)
      ),
      catchError((error) => {
        console.error('API Error:', error);
        throw error;
      })
    );
  }
  
  

}

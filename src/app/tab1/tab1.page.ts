import { Component, OnInit } from '@angular/core';
import { Observable, of} from 'rxjs';
import { CurrencyDataService } from '../currency-data.service';
import { ModalController, NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  private loading: any;
  

  //titles
  public pageTitle : string = 'Rates';
  public pageSubtitle : string[] = ['Base', 'Favorites', 'Popular'];

 // Retrieve values from local storage or use default values
  public baseCurrency: string = localStorage.getItem('firstBaseCurrency') || 'PHP';
  private currency1: string = localStorage.getItem('firstFavoriteCurrency') || 'CNY';
  private currency2: string = localStorage.getItem('secondFavoriteCurrency') || 'GBP';
  private currency3: string = localStorage.getItem('thirdFavoriteCurrency') || 'JPY';
  private currency4: string = localStorage.getItem('fourthFavoriteCurrency') || 'AUD';

  // Create an array of favorite currencies
  private favoriteCurrency: string[] = [this.currency1, this.currency2, this.currency3, this.currency4];
    
    
  public favoriteCurrencyPairs: string[][] = [];
  private popularCurrencies: string[] = ['USD', 'JPY', 'GBP', 'AUD', 'CAD'];
  public exchangeRate: number = 0;
  
  //images
  public imagePath: string = '../../assets/flags/' + this.baseCurrency + '.svg';

  //fetching data
  public items: any[] = []; 
  public forexData: any;
  public page = 1;
  public searchTerm: string = '';
  public filteredItems: any[] = [];
  
  //logo for currency
  private currencyLogo: { [key: string]: string } = {
    'AED': '../../assets/flags/AED.svg',
    'AFN': '../../assets/flags/AFN.svg',
    'ALL': '../../assets/flags/ALL.svg',
    'AMD': '../../assets/flags/AMD.svg',
    'ANG': '../../assets/flags/ANG.svg',
    'AOA': '../../assets/flags/AOA.svg',
    'ARS': '../../assets/flags/ARS.svg',
    'AUD': '../../assets/flags/AUD.svg',
    'AWG': '../../assets/flags/AWG.svg',
    'AZN': '../../assets/flags/AZN.svg',
    'BAM': '../../assets/flags/BAM.svg',
    'BBD': '../../assets/flags/BBD.svg',
    'BDT': '../../assets/flags/BDT.svg',
    'BGN': '../../assets/flags/BGN.svg',
    'BHD': '../../assets/flags/BHD.svg',
    'BIF': '../../assets/flags/BIF.svg',
    'BMD': '../../assets/flags/BMD.svg',
    'BND': '../../assets/flags/BND.svg',
    'BOB': '../../assets/flags/BOB.svg',
    'BRL': '../../assets/flags/BRL.svg',
    'BSD': '../../assets/flags/BSD.svg',
    'BTN': '../../assets/flags/BTN.svg',
    'BWP': '../../assets/flags/BWP.svg',
    'BZD': '../../assets/flags/BZD.svg',
    'CAD': '../../assets/flags/CAD.svg',
    'CDF': '../../assets/flags/CDF.svg',
    'CHF': '../../assets/flags/CHF.svg',
    'CLF': '../../assets/flags/CLF.svg',
    'CLP': '../../assets/flags/CLP.svg',
    'CNH': '../../assets/flags/CNH.svg',
    'CNY': '../../assets/flags/CNY.svg',
    'COP': '../../assets/flags/COP.svg',
    'CUP': '../../assets/flags/CUP.svg',
    'CVE': '../../assets/flags/CVE.svg',
    'CZK': '../../assets/flags/CZK.svg',
    'DJF': '../../assets/flags/DJF.svg',
    'DKK': '../../assets/flags/DKK.svg',
    'DOP': '../../assets/flags/DOP.svg',
    'DZD': '../../assets/flags/DZD.svg',
    'EGP': '../../assets/flags/EGP.svg',
    'ERN': '../../assets/flags/ERN.svg',
    'ETB': '../../assets/flags/ETB.svg',
    'EUR': '../../assets/flags/EUR.svg',
    'FJD': '../../assets/flags/FJD.svg',
    'FKP': '../../assets/flags/FKP.svg',
    'GBP': '../../assets/flags/GBP.svg',
    'GEL': '../../assets/flags/GEL.svg',
    'GHS': '../../assets/flags/GHS.svg',
    'GIP': '../../assets/flags/GIP.svg',
    'GMD': '../../assets/flags/GMD.svg',
    'GNF': '../../assets/flags/GNF.svg',
    'GTQ': '../../assets/flags/GTQ.svg',
    'GYD': '../../assets/flags/GYD.svg',
    'HKD': '../../assets/flags/HKD.svg',
    'HNL': '../../assets/flags/HNL.svg',
    'HRK': '../../assets/flags/HRK.svg',
    'HTG': '../../assets/flags/HTG.svg',
    'HUF': '../../assets/flags/HUF.svg',
    'IDR': '../../assets/flags/IDR.svg',
    'ILS': '../../assets/flags/ILS.svg',
    'INR': '../../assets/flags/INR.svg',
    'IQD': '../../assets/flags/IQD.svg',
    'IRR': '../../assets/flags/IRR.svg',
    'ISK': '../../assets/flags/ISK.svg',
    'JMD': '../../assets/flags/JMD.svg',
    'JOD': '../../assets/flags/JOD.svg',
    'JPY': '../../assets/flags/JPY.svg',
    'KES': '../../assets/flags/KES.svg',
    'KGS': '../../assets/flags/KGS.svg',
    'KHR': '../../assets/flags/KHR.svg',
    'KMF': '../../assets/flags/KMF.svg',
    'KPW': '../../assets/flags/KPW.svg',
    'KRW': '../../assets/flags/KRW.svg',
    'KWD': '../../assets/flags/KWD.svg',
    'KYD': '../../assets/flags/KYD.svg',
    'KZT': '../../assets/flags/KZT.svg',
    'LAK': '../../assets/flags/LAK.svg',
    'LBP': '../../assets/flags/LBP.svg',
    'LKR': '../../assets/flags/LKR.svg',
    'LRD': '../../assets/flags/LRD.svg',
    'LSL': '../../assets/flags/LSL.svg',
    'LYD': '../../assets/flags/LYD.svg',
    'MAD': '../../assets/flags/MAD.svg',
    'MDL': '../../assets/flags/MDL.svg',
    'MGA': '../../assets/flags/MGA.svg',
    'MKD': '../../assets/flags/MKD.svg',
    'MMK': '../../assets/flags/MMK.svg',
    'MNT': '../../assets/flags/MNT.svg',
    'MOP': '../../assets/flags/MOP.svg',
    'MRU': '../../assets/flags/MRU.svg',
    'MUR': '../../assets/flags/MUR.svg',
    'MVR': '../../assets/flags/MVR.svg',
    'MWK': '../../assets/flags/MWK.svg',
    'MXN': '../../assets/flags/MXN.svg',
    'MYR': '../../assets/flags/MYR.svg',
    'MZN': '../../assets/flags/MZN.svg',
    'NAD': '../../assets/flags/NAD.svg',
    'NGN': '../../assets/flags/NGN.svg',
    'NOK': '../../assets/flags/NOK.svg',
    'NPR': '../../assets/flags/NPR.svg',
    'NZD': '../../assets/flags/NZD.svg',
    'OMR': '../../assets/flags/OMR.svg',
    'PAB': '../../assets/flags/PAB.svg',
    'PEN': '../../assets/flags/PEN.svg',
    'PGK': '../../assets/flags/PGK.svg',
    'PHP': '../../assets/flags/PHP.svg',
    'PKR': '../../assets/flags/PKR.svg',
    'PLN': '../../assets/flags/PLN.svg',
    'PYG': '../../assets/flags/PYG.svg',
    'QAR': '../../assets/flags/QAR.svg',
    'RON': '../../assets/flags/RON.svg',
    'RSD': '../../assets/flags/RSD.svg',
    'RUB': '../../assets/flags/RUB.svg',
    'RWF': '../../assets/flags/RWF.svg',
    'SAR': '../../assets/flags/SAR.svg',
    'SCR': '../../assets/flags/SCR.svg',
    'SDG': '../../assets/flags/SDG.svg',
    'SEK': '../../assets/flags/SEK.svg',
    'SGD': '../../assets/flags/SGD.svg',
    'SHP': '../../assets/flags/SHP.svg',
    'SLL': '../../assets/flags/SLL.svg',
    'SOS': '../../assets/flags/SOS.svg',
    'SRD': '../../assets/flags/SRD.svg',
    'SYP': '../../assets/flags/SYP.svg',
    'SZL': '../../assets/flags/SZL.svg',
    'THB': '../../assets/flags/THB.svg',
    'TJS': '../../assets/flags/TJS.svg',
    'TMT': '../../assets/flags/TMT.svg',
    'TND': '../../assets/flags/TND.svg',
    'TOP': '../../assets/flags/TOP.svg',
    'TRY': '../../assets/flags/TRY.svg',
    'TTD': '../../assets/flags/TTD.svg',
    'TWD': '../../assets/flags/TWD.svg',
    'TZS': '../../assets/flags/TZS.svg',
    'UAH': '../../assets/flags/UAH.svg',
    'UGX': '../../assets/flags/UGX.svg',
    'USD': '../../assets/flags/USD.svg',
    'UYU': '../../assets/flags/UYU.svg',
    'UZS': '../../assets/flags/UZS.svg',
    'VND': '../../assets/flags/VND.svg',
    'VUV': '../../assets/flags/VUV.svg',
    'WST': '../../assets/flags/WST.svg',
    'XAF': '../../assets/flags/XAF.svg',
    'XCD': '../../assets/flags/XCD.svg',
    'XDR': '../../assets/flags/XDR.svg',
    'XOF': '../../assets/flags/XOF.svg',
    'XPF': '../../assets/flags/XPF.svg',
    'YER': '../../assets/flags/YER.svg',
    'ZAR': '../../assets/flags/ZAR.svg',
    'ZMW': '../../assets/flags/ZMW.svg'
  };

  public conversionResultsMap: { [key: string]: Observable<number> } = {};
 
  constructor(public modalController: ModalController, 
    private currencyDataService: CurrencyDataService,
    private loadingController: LoadingController,
    private router: Router,
    private navCtrl: NavController) {}
    

    ngOnInit() {

      
    // Check if local storage is empty and initialize with default values
    if (!localStorage.getItem('firstBaseCurrency')) {
      localStorage.setItem('firstBaseCurrency', this.baseCurrency);
    }

    if (!localStorage.getItem('firstFavoriteCurrency')) {
      localStorage.setItem('firstFavoriteCurrency', this.currency1);
    }

    if (!localStorage.getItem('secondFavoriteCurrency')) {
      localStorage.setItem('secondFavoriteCurrency', this.currency2);
    }

    if (!localStorage.getItem('thirdFavoriteCurrency')) {
      localStorage.setItem('thirdFavoriteCurrency', this.currency3);
    }

    if (!localStorage.getItem('fourthFavoriteCurrency')) {
      localStorage.setItem('fourthFavoriteCurrency', this.currency4);
    }

      this.favoriteCurrencyPairs = this.chunkArray(this.favoriteCurrency, 2);

      this.currencyDataService.getSelectedCurrencyCode().subscribe((code) => {
        this.baseCurrency = code || localStorage.getItem('firstBaseCurrency')!;
        this.imagePath = '../../assets/flags/' + this.baseCurrency + '.svg';
        this.fetchMultiExchangeRates();
        this.fetchAllExchangeRates();
      });
    
      this.currencyDataService.getFavoriteCurrencies().subscribe((favoriteCurrencies) => {
        console.log('Favorite currencies updated:', favoriteCurrencies);
      
        if (favoriteCurrencies && favoriteCurrencies.length >= 4) {

          this.favoriteCurrency = [
            favoriteCurrencies[0],
            favoriteCurrencies[1],
            favoriteCurrencies[2],
            favoriteCurrencies[3]
          ];
      
          this.favoriteCurrencyPairs = this.chunkArray(this.favoriteCurrency, 2);
          console.log('Favorite currency pairs:', this.favoriteCurrencyPairs);
      
          this.fetchMultiExchangeRates();
          this.fetchAllExchangeRates();
        }
      });
      
      
    }


    // Fetch multi exchange rates for one-to-many conversion
    fetchMultiExchangeRates() {
      this.currencyDataService
        .fetchMultiExchangeRates(this.baseCurrency, this.favoriteCurrency)
        .subscribe(
          (response) => {
            console.log('Multi exchange rates response:', response);
  

            this.favoriteCurrency.forEach((currency, index) => {
              this.conversionResultsMap[currency] = of(response.results[currency]);
            });
          },
          (error) => {
            console.error('Error fetching multi exchange rates:', error);
          }
        );
    }
  
    // Fetch all exchange rates for popular currencies
    fetchAllExchangeRates() {
      this.currencyDataService
        .fetchMultiExchangeRates(this.baseCurrency, this.popularCurrencies)
        .subscribe(
          (response) => {
            console.log('Multi exchange rates response:', response);
  
            this.items = Object.keys(response.results).map((currencyCode) => ({
              code: currencyCode,
              value: response.results[currencyCode],
            }));
          },
          (error) => {
            console.error('Error fetching multi exchange rates:', error);
          }
        );
    }

    chunkArray(arr: any[], size: number): any[][] {
      return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
      );
    }

    navigateToEditFavoritesPage() {
      this.navCtrl.navigateForward('/editfavorites', {
        state: {
          navCtrl: this.navCtrl,  
        },
      });
    }

    private fetchFavoriteCurrencies() {
      this.favoriteCurrency = [
        localStorage.getItem('firstFavoriteCurrency')!,
        localStorage.getItem('secondFavoriteCurrency')!,
        localStorage.getItem('thirdFavoriteCurrency')!,
        localStorage.getItem('fourthFavoriteCurrency')!,
      ];
    
      console.log('Favorite Currencies:', this.favoriteCurrency);
    
      // Recreate favorite currency pairs
      this.favoriteCurrencyPairs = this.chunkArray(this.favoriteCurrency, 2);
    
      console.log('Favorite Currency Pairs:', this.favoriteCurrencyPairs);
    }
  
    getCurrencyLogo(code: string): string {
      return this.currencyLogo[code] || '../../assets/flags/ZAR.svg';
    }
  
    async presentLoading() {
      this.loading = await this.loadingController.create({
        message: 'Loading...',
        translucent: true,
      });
      await this.loading.present();
    }
  
    dismissLoading() {
      if (this.loading) {
        this.loading.dismiss();
      }
    }
  
    async loadData() {
      this.presentLoading();
      this.dismissLoading();
    }
}




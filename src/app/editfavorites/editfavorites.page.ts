import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyDataService } from '../currency-data.service';
import { LoadingController, NavController} from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editfavorites',
  templateUrl: './editfavorites.page.html',
  styleUrls: ['./editfavorites.page.scss'],
})
export class EditfavoritesPage implements OnInit {

  public title : string = 'Edit Favorite Curencies';
  public subtitle : string = 'Please select 4 currencies';
  private currencies: any[] = [];
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
  public filteredCurrencies: any[] = [];
  public searchQuery: string = '';
  public currencyCode : string = '';
  private selectedCurrencies: string[] = [];
  

  constructor(public router: Router, 
    private currencyDataService: CurrencyDataService,  
    private loadingController: LoadingController,
    private toastController: ToastController,
    private navCtrl: NavController) { }

    async ngOnInit() {

     const loading = await this.showLoading();
    
     this.fetchCurrencies();
 
     loading.dismiss();
  }

  onCheckboxChange(currency: any, event: any) {
    if (event.detail.checked) {
      this.selectedCurrencies.push(currency.code);
    } else {
      const index = this.selectedCurrencies.indexOf(currency.code);
      if (index !== -1) {
        this.selectedCurrencies.splice(index, 1);
      }
    }
  }

  onSaveClick() {
    console.log('Selected currencies:', this.selectedCurrencies);
  
    if (this.selectedCurrencies.length !== 4) {
      this.presentToast('Please select exactly 4 currencies.');
  
      this.selectedCurrencies = this.getSelectedCurrencies();
      if (this.selectedCurrencies.length !== 4) {
        return;
      }
    }
    localStorage.setItem('firstFavoriteCurrency', this.selectedCurrencies[0]);
    localStorage.setItem('secondFavoriteCurrency', this.selectedCurrencies[1]);
    localStorage.setItem('thirdFavoriteCurrency', this.selectedCurrencies[2]);
    localStorage.setItem('fourthFavoriteCurrency', this.selectedCurrencies[3]);
    this.presentToast('Favorite currencies updated.');

    this.currencyDataService.updateFavoriteCurrencies(this.selectedCurrencies);

    // Navigate back to Tab1Page
    this.navCtrl.back();
  }
  async fetchCurrencies() {
    this.currencyDataService.fetchAllCurrencies().subscribe(
      (data: any) => {
        console.log(data); 

        if (data && data.currencies) {
          this.currencies = Object.entries(data.currencies).map(([code, name]) => ({ code, name }));
          this.filteredCurrencies = [...this.currencies];
        }
      },
      (error) => {
        console.error('Error fetching currencies:', error);
      }
    );
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...', 
    });

    await loading.present();
    return loading;
  }

  applySearchFilter() {
    console.log('Applying search filter');
    console.log('Search Query:', this.searchQuery);
    console.log('All Currencies:', this.currencies);

    if (!this.searchQuery) {
      this.filteredCurrencies = [...this.currencies];
    } else {
      this.filteredCurrencies = this.currencies.filter((currency) =>
        currency.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    console.log('Filtered Currencies:', this.filteredCurrencies);
  }
  
  getCurrencyLogo(code: string): string {
    return this.currencyLogo[code] || '../../assets/flags/ZAR.svg';
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, 
      position: 'top', 
      color: 'cashless' 
    });

    toast.present();
  }

  getSelectedCurrencies(): string[] {
    const selected: string[] = [];

    const checkboxes = document.querySelectorAll('ion-checkbox');
    checkboxes.forEach((checkbox: any) => {
      if (checkbox.checked) {
        const currencyCode = checkbox.parentElement.querySelector('p').textContent; 
        selected.push(currencyCode);
      }
    });

    return selected;
  }

}


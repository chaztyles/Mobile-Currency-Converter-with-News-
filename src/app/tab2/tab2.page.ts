import { Component, OnInit } from '@angular/core';
import { CurrencyDataService } from '../currency-data.service';
import { NgZone } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { forkJoin, map } from 'rxjs';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public title : string = 'Convert';
  public btnConvert : string = 'Convert';
  public btnReverse : string = 'Reverse';

  //currencies
  public conversionResult: any;
  public targetCurrency: string = localStorage.getItem('targetCurrency') || 'JPY';
  public baseCurrency: string = localStorage.getItem('secondBaseCurrency') || 'USD';
  public amount : number = 1;
  public baseCurrencyName : string = '';
  public targetCurrencyName : string = '';
  public allCurrencies: any[] = [];
  private stramount = localStorage.getItem('amount')!;

  //logos
  public firstLogo: string = '../../assets/flags/' + this.baseCurrency + '.svg';
  public secondLogo: string = '../../assets/flags/' + this.targetCurrency + '.svg';
  public currencyLogo: { [key: string]: string } = {
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


  constructor(private currencyDataService: CurrencyDataService, private zone: NgZone, private cdr: ChangeDetectorRef) {}

  ngOnInit() {

    // Check if local storage is empty and initialize with default values if necessary
    if (!localStorage.getItem('targetCurrency')) {
      localStorage.setItem('targetCurrency', this.targetCurrency);
    }

    if (!localStorage.getItem('secondBaseCurrency')) {
      localStorage.setItem('secondBaseCurrency', this.baseCurrency);
    }

    this.amount = parseInt(this.stramount, 10);;

    console.log('Base Currency:', this.baseCurrency);
    console.log('Target Currency:', this.targetCurrency);

    this.fetchData();

     // Fetch baseCurrencyName and targetCurrencyName
  this.currencyDataService.fetchAllCurrenciesByName().subscribe(
    (currencyNames) => {
      this.baseCurrencyName = currencyNames[this.baseCurrency] || 'Unknown';
      console.log('Base Currency Name:', this.baseCurrencyName);

      this.targetCurrencyName = currencyNames[this.targetCurrency] || 'Unknown';
      console.log('Target Currency Name:', this.targetCurrencyName);
    },
    (error) => {
      console.error('Error fetching currency names:', error);
    }
    
  );
  

    this.currencyDataService.fetchAllCurrencies().subscribe(
      (currencies) => {
        this.allCurrencies = currencies;
      },
      (error) => {
        console.error('Error fetching currencies:', error);
      }
    );

    //get from local storage
    this.targetCurrency =  localStorage.getItem('targetCurrency')!;
    this.baseCurrency = localStorage.getItem('secondBaseCurrency')!;

    //retrieve the basecurrency from local storage :))
    this.currencyDataService.getSelectedSecondBaseCurrency().subscribe((code) => {
      this.baseCurrency = code || localStorage.getItem('secondBaseCurrency')!;
      this.firstLogo = '../../assets/flags/' + this.baseCurrency + '.svg';
      this.fetchData();
    });

    //retrieve the targetcurrency from local storage :)
    this.currencyDataService.getSelectedTargetCurrency().subscribe((code) => {
      this.targetCurrency = code || localStorage.getItem('targetCurrency')!;
      this.secondLogo = '../../assets/flags/' + this.targetCurrency + '.svg';
      this.fetchData();
    });

    
 
  }

  fetchData() {
    // Use properties from the component
    const from = this.baseCurrency;
    const to = this.targetCurrency;
    const amount = this.amount;
  
    // Fetch conversion rate and currency names
    forkJoin([
      this.currencyDataService.getConversionRate(from, to, amount),
      this.currencyDataService.fetchAllCurrenciesByName(),
    ]).subscribe(
      ([conversionData, currencyNames]) => {
        this.conversionResult = conversionData.result[to];
  
        this.baseCurrencyName = currencyNames[from] || 'Unknown';
  
        this.targetCurrencyName = currencyNames[to] || 'Unknown';
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  

  convert() {
    this.currencyDataService.getConversionRate(this.baseCurrency, this.targetCurrency, this.amount).subscribe(
      (data) => {
        if ('result' in data) {
          this.conversionResult = data.result[this.targetCurrency];
        } else {
          console.error('API response does not have a "result" property:', data);
        }
      },
      (error) => {
        console.error('Error during conversion:', error);
      }
    );

    const stringifiedAmount = JSON.stringify(this.amount);
    localStorage.setItem('amount', stringifiedAmount);
  }
  
  
  reverseCurrencies() {
    const tempCurrency = this.baseCurrency;
    this.baseCurrency = this.targetCurrency;
    localStorage.setItem('secondBaseCurrency', this.baseCurrency)
    this.targetCurrency = tempCurrency;
    localStorage.setItem('targetCurrency', this.targetCurrency)

    const tempAmount = this.conversionResult;
    this.conversionResult = this.amount;
    this.amount = tempAmount;

    const stringifiedAmount = JSON.stringify(this.amount);
    localStorage.setItem('amount', stringifiedAmount);


  
    this.firstLogo = '../../assets/flags/' + this.baseCurrency + '.svg';
    this.secondLogo = '../../assets/flags/' + this.targetCurrency + '.svg';

    this.currencyDataService.fetchAllCurrenciesByName().subscribe(
      (currencies) => {
        this.baseCurrencyName = currencies[this.baseCurrency] || 'Unknown';
        this.targetCurrencyName = currencies[this.targetCurrency] || 'Unknown';
      },
      (error) => {
        console.error('Error fetching currency names:', error);
      }
    );

    this.convert();
  }
  
}



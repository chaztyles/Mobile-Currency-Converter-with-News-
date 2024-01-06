import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  public title : string = 'Settings';
  public subtitle : string[] = ['General', 'Developers'];
  public terms : string = 'Terms and Conditions';
  public privacy : string = 'Privacy and Data Usage';
  public rate : string = 'Rate the App';
  public developers = ['kleesus', 'churrochi', 'VortexEra'];
  public version : string = 'Version 1.0.0';

  constructor() { }

  ngOnInit() {
  }

}

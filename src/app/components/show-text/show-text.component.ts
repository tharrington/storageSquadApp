import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-show-text',
  templateUrl: './show-text.component.html',
  styleUrls: ['./show-text.component.scss'],
})
export class ShowTextComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}
  submit() {
    this.modalCtrl.dismiss({submit: true},'submit');
  }
}

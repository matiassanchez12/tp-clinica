import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() title: string = '';

  public isOpenModal: boolean = false;

  public closeModal() {
    this.isOpenModal = false;
  }

  public openModal() {
    this.isOpenModal = true;
  }
}

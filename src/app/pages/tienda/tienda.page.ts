import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, AnimationController } from '@ionic/angular';
import { Animation } from '@ionic/core';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements AfterViewInit {

  @ViewChild('modal', { static: false }) modal!: IonModal;

  email!: string;
  password!: string;

  constructor(private router: Router, private animationCtrl: AnimationController) {
    // Obtiene los datos del estado de navegación si existen
    if (this.router.getCurrentNavigation()?.extras.state) {
      const datosUsuario = this.router.getCurrentNavigation()?.extras.state;
      this.email = datosUsuario?.['email'];
      this.password = datosUsuario?.['password'];

      console.log('Email:', this.email);
      console.log('Password:', this.password);
    }
  }

  ngAfterViewInit() {
    if (this.modal) {
      const enterAnimation = (baseEl: HTMLElement) => {
        const root = baseEl.shadowRoot || baseEl;

        const backdropElement = root.querySelector('ion-backdrop');
        const wrapperElement = root.querySelector('.modal-wrapper');

        const backdropAnimation = backdropElement
          ? this.animationCtrl
              .create()
              .addElement(backdropElement)
              .fromTo('opacity', '0.01', 'var(--backdrop-opacity)')
          : null;

        const wrapperAnimation = wrapperElement
          ? this.animationCtrl
              .create()
              .addElement(wrapperElement)
              .keyframes([
                { offset: 0, opacity: '0', transform: 'scale(0)' },
                { offset: 1, opacity: '0.99', transform: 'scale(1)' },
              ])
          : null;

        const animations = [backdropAnimation, wrapperAnimation].filter(
          Boolean
        ) as Animation[];

        return this.animationCtrl
          .create()
          .addElement(baseEl)
          .easing('ease-out')
          .duration(500)
          .addAnimation(animations);
      };

      const leaveAnimation = (baseEl: HTMLElement) => {
        return enterAnimation(baseEl).direction('reverse');
      };

      this.modal.enterAnimation = enterAnimation;
      this.modal.leaveAnimation = leaveAnimation;
    } else {
      console.error('Modal is undefined');
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.dismiss();
    }
  }
}  

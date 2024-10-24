import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  // Centro del mapa y nivel de zoom
  center: google.maps.LatLngLiteral = { lat: 37.7749, lng: -122.4194 }; // Coordenadas de ejemplo (San Francisco)
  zoom = 12;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 15,
    minZoom: 8,
  };

  constructor() { }

  ngOnInit() { }

}


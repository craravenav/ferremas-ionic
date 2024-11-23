import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router'; // Importamos Router

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit, AfterViewInit {

  center!: google.maps.LatLngLiteral;
  zoom = 12;
  options!: google.maps.MapOptions;
  map!: google.maps.Map;
  marker!: google.maps.Marker;
  usuario: string = "Camila"; // Usuario de ejemplo

  constructor(private router: Router) {} // Inyectamos Router

  async ngOnInit() {
    // Inicializamos el mapa con coordenadas por defecto
    // Coordenadas por defecto (DUOC PLAZA NORTE)
    this.center = { lat: -33.36344, lng: -70.6807601 }; 
    this.options = {
      mapTypeId: 'roadmap',
      zoomControl: true,
      scrollwheel: true,
      disableDoubleClickZoom: false,
      maxZoom: 15,
      minZoom: 8,
    };

    // Obtenemos la ubicación actual del usuario
    const coordinates = await this.getCurrentLocation();
    if (coordinates) {
      this.center = { lat: coordinates.latitude, lng: coordinates.longitude };
    }
  }

  ngAfterViewInit() {
    this.initMap();
  }

  // Método para inicializar el mapa
  initMap() {
    if (typeof google !== 'undefined') {
      const mapElement = document.getElementById('map') as HTMLElement;
      this.map = new google.maps.Map(mapElement, {
        center: this.center,
        zoom: this.zoom,
        ...this.options,
      });

      // Añadir un marcador en la ubicación actual
      this.marker = new google.maps.Marker({
        position: this.center,
        map: this.map,
        title: 'Mi ubicación',
      });
    } else {
      console.error('Google Maps script not loaded or google is undefined.');
    }
  }

  // Método para obtener la ubicación actual usando Capacitor Geolocation
  async getCurrentLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      return position.coords;
    } catch (error) {
      console.error('Error getting location', error);
      return null;
    }
  }

  // Método para redirigir a la página 'carrito'
  goToCarrito() {
    this.router.navigate(['/carrito']); // Navegamos a la página del carrito
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  ws: WebSocket;

  constructor() {
    // Initialize WebSocket connection
    this.ws = new WebSocket('ws://0.0.0.0:8080/ws');

    // Handle onmessage event
    this.ws.onmessage = (event) => {
      // Handle incoming WebSocket data
      const data = event.data;
      console.log('Received WebSocket message:', data);
      // You can emit this data to Angular components using BehaviorSubject or other mechanisms.
    };

    // Handle onopen event
    this.ws.onopen = (event) => {
      console.log('WebSocket connection opened');
    };

    // Handle onclose event
    this.ws.onclose = (event) => {
      console.log('WebSocket connection closed');
    };

    // Handle onerror event
    this.ws.onerror = (event) => {
      console.error('WebSocket error:', event);
    };
  }
}

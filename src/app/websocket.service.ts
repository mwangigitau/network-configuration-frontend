import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket('ws://0.0.0.0:8080/ws'); // Replace with your WebSocket URL
  }

  getWebSocket() {
    return this.socket$;
  }
}

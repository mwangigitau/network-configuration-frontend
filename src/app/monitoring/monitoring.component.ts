// monitoring.component.ts

import { Component, OnInit } from '@angular/core';
import { MonitoringService } from '../monitoring.service';
import { HttpClient } from '@angular/common/http';
import { ChatService } from '../chat.service';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css'],
})
export class MonitoringComponent implements OnInit {
  ipData: Map<string, { uptime: number; downtime: number }> = new Map();
  chatData: any = []

  constructor
  (
    private monitoringService: MonitoringService,
    private chatService: ChatService,
    private http: HttpClient,
    private websocketService: WebsocketService,
    ) {}

  ngOnInit() {
    this.getMessages();
    this.websocketService.getWebSocket().subscribe((message: any) => {
      this.getMonitoringData();
      this.getMessages();
    });
  }
  
  sendMessage(message: string) {
    var send_chat: HTMLElement | any = document.getElementById("chat_message_textarea")
    send_chat.value = ""
    this.chatService.sendChat(message).subscribe(
      (response) => {
        this.getMessages()
      },
      (error) => {
        console.error("Error sending message:", error);
      }
    );
  }

  getMessages() {
    this.chatService.getChats().subscribe(
      (data: any) => {
        this.chatData = this.chatService.processChatData(data["data"]);
        console.log(this.chatData)
      },
      (error) => {
        console.error('Error fetching chat messages:', error);
      }
    );
  }  

  getMonitoringData() {
    this.monitoringService.getMonitoringData().subscribe(
      (data) => {
        this.ipData = this.monitoringService.processMonitoringData(data);
        // console.log(this.ipData)
      },
      (error) => {
        console.error('Error fetching monitoring data:', error);
      }
    );
  }
}

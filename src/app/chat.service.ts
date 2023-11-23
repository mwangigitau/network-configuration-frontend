import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { WebsocketService } from "./websocket.service";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  chatData: any[] = [];

  constructor(private http: HttpClient, private websocketService: WebsocketService) {
    this.websocketService.getWebSocket().subscribe((message: any) => {
      this.getChats();
    });
  }

  sendChat(message: string): Observable<any> {
    // Add the message to chatData immediately
    this.chatData.push({ type: "sender", message, status: "sending" });

    const url = "http://0.0.0.0:8080/chat/add";
    const requestData = { database: "test", collection: "chat", type: "sender", message };

    return this.http.post(url, requestData).pipe(
      tap(() => {
        // Update the status when the message is successfully sent
        const index = this.chatData.findIndex(item => item.message === message && item.status === "sending");
        if (index !== -1) {
          this.chatData[index].status = "sent";
        }
      }),
      catchError((error) => {
        console.error("Error sending chat message:", error);
        return of([]);
      })
    );
  }

  getChats(): Observable<any[]> {
    const url = "http://0.0.0.0:8080/chat/all";
    const requestData = { database: "test", collection: "chat" };

    return this.http.post<any[]>(url, requestData).pipe(
      catchError((error) => {
        console.error("Error fetching chat messages:", error);
        return of([]);
      })
    );
  }

  processChatData(data: any): any {
    // Process chat data as before
    const chatData: any = [];
    data.forEach((item: any) => {
      const type = item['type'];

      if (type === "sender") {
        const message = item.message;
        chatData.push({ type: "sender", message });
      } else {
        const response = item.result;
        chatData.push({ type: "recipient", message: response });
      }
    });

    return chatData;
  }
}

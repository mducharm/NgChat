import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private connection?: signalR.HubConnection;

  public newMessage$?: Observable<any>;

  public async startConnection() {
    this.connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl("/chat")
      .build();
      
      this.newMessage$ = new Observable(observer => {
        this.connection?.on("ReceiveMessage", (user, msg) => {
          
          console.log(`Received: ${user}: ${msg}`);
          observer.next({user, msg});
        })
      });

      try {
        await this.connection.start();
        console.log("Started connection.")
      } catch (error) {
        console.error("Unable to start conection connection : " + error);
      }
  }

  public async sendMessage(user: string, msg: string) {
    console.log(`${user}: ${msg}`);
    
    this.connection?.invoke("SendMessage", user, msg);
  }

}

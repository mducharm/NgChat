import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SignalRService } from '../services/signalr.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  userId = Date.now().toString();

  messages?: any[] = [];

  constructor(public signalRService: SignalRService) { }

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.newMessage$?.subscribe(msg => this.messages?.push(msg));
  }

  public sendMessage(input: HTMLInputElement)  {
    console.log(input.value);
    this.signalRService.sendMessage(this.userId, input.value);
    input.value = "";
  }

}

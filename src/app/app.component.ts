import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-test-app wieeeKLAAAARe';

  constructor(private appService: AppService) {}

  users: any = [];


  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.appService.getUsers().subscribe(users => (this.users = users));

  }
}

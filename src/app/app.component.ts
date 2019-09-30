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
  recipes: any = [];
  loggedIn = false;


  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.appService.getUsers().subscribe(users => (this.users = users));
  }
  logUsers() {
    console.log(this.users);
  }
}

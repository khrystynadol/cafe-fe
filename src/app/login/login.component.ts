import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  SERVER_ADDRESS = 'http://127.0.0.1:5000';

  errorMessage: string;
  email = "";
  password = "";

  constructor(private http: HttpClient, public router: Router) { }

  ngOnInit() {}

  onSubmit(): void {
    const data = {
      "email": this.email,
      "password": this.password
    };

    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
    console.log(data);

    this.http.post<any>(this.SERVER_ADDRESS + '/user/login', data, { headers }).subscribe(
      response => {
        localStorage.setItem('email', this.email);
        localStorage.setItem('password', this.password);
        localStorage.setItem('id', response.id);
        if (response.role === 'client') {
          this.router.navigate(['client']);
        } else if (response.role === 'manager') {
          this.router.navigate(['admin']);
        }
      },
      error => {
        if (error.status === 412) {
          this.errorMessage = 'Email or password is incorrect';
        }
        else {
          this.errorMessage = 'Login failed for some unknown reason';
        }
        // console.error('Error:', error);
        // alert('Login failed.');
      }
    );
  }

  onUpdateEmail(event: any) {
    this.email = event.target.value;
    // console.log(this.serverName);
  }
  onUpdatePassword(event: any) {
    this.password = event.target.value;
    // console.log(this.serverName);
  }
}

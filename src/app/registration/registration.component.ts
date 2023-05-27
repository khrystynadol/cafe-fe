import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router";

const SERVER_ADDRESS = 'http://127.0.0.1:5000';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  constructor(private http: HttpClient, private router: Router) {}
  user = {
    surname: ''
  };
  submitted = false;
  errorMessage: string;

  onAddUser(form: NgForm, event: Event) {
    event.preventDefault(); // Prevent form submission and page reload
    this.submitted = true;

  if (form.invalid) {
    return;
  }

    const name = form.value.name;
    const surname = form.value.surname;
    const phone = form.value.phone;
    const email = form.value.email;
    const password = form.value.password;

    const data = {
      "name": name,
      "surname": surname,
      "phone": phone,
      "email": email,
      "password": password
    };

    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});

    this.http.post<any>(`${SERVER_ADDRESS}/user`, data, { headers }).subscribe(
      (response) => {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("id", response.id);
        console.log(response);
        this.router.navigate(['/']);
      },
      (error) => {
        if (error.status === 409) {
          this.errorMessage = 'Email or phone number is not unique';
        }
        else if (error.status === 400) {
          this.errorMessage = 'Validation error';
        }
        else {
          this.errorMessage = 'Registration failed for some unknown reason';
        }
        // console.error("Error:", error);
        // alert("Registration failed.");
      }
    );
  }
}

// import { Component } from '@angular/core';
// import { NgForm } from '@angular/forms';
//
// @Component({
//   selector: 'app-registration',
//   templateUrl: './registration.component.html',
//   styleUrls: ['./registration.component.scss']
// })
// export class RegistrationComponent {
//   user = {
//     surname: ''
//   };
//   submitted = false;
//
//   onAddUser(form: NgForm) {
//     this.submitted = true;
//     if (form.invalid) {
//       return;
//     }
//     console.log('User data:', this.user);
//   }
//
// }

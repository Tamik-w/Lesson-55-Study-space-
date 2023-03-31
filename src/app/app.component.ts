import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'home-work';
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z ]+')]],
      email: ['', [Validators.required, Validators.email], [this.checkEmail]],
      password: ['', [Validators.required, Validators.minLength(7)]],
    });
  }

  submit() {
    console.log(this.userForm.value);
  }

  checkEmail(control: any): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
          .subscribe(users => {
            const emailExists = users.some(user => user.email === control.value);
            if (emailExists) {
              control.markAllAsTouched();
              resolve({ uniqEmail: true });
            } else {
              resolve(null);
            }
          });
      }, 2000);
    });
  }
}

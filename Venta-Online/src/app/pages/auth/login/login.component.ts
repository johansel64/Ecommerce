import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginFormBase } from 'src/app/shared/Utils/loginForms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  hide = true; // Variable para ver el password, si su estado es false el password es visible y si su estado el true el password no se muestra
  constructor(
    public loginForm: LoginFormBase,
    private srvAuth: AuthService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loginForm.reset();
  }

  onLogin() {
    if (this.loginForm.baseForm.invalid) {
      return;
    }

    const valor = this.loginForm.baseForm; // Obtiene los valores del email y password con el que el usuario se logea
    /* const error = this.loginForm.getErrorMessage(); */
    console.log(valor);
    const dataUser = this.loginForm.baseForm.value;

    this.srvAuth.onLogin(dataUser).subscribe(
      (res) => {
        this.route.navigate(['home']);
        console.log(res);
      },
      (error) => {
        alert(error);
      }
    );
  }

  navigateRegister() {
    this.route.navigate(['register']);
  }
}

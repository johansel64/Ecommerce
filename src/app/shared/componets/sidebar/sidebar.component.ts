import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  panelOpenState = false;
  computo = 'computo';
  telefonia = 'telefonia';
  isLog = false;
  role: any;

  constructor(private router: Router, private authSrv: AuthService) {}

  ngOnInit(): void {
    this.authSrv.getUser$().subscribe((user) => {
      this.isLog = user?.token!=null;
      this.role = user?.role;
    });
    this.isLog = localStorage.getItem('userToken') != null;
    this.role = localStorage.getItem('userRole');

  }

  refreshUser() {
    this.authSrv.getUser$().subscribe((data) => {
      window.location.reload();
    });
  }

  comprar(): void {
    if (window.location.toString() == environment.URLProductos) {
      window.location.reload();
    } else {
      this.router.navigate(['/productos']);
    }
  }

  guardarType(type: string): void {
    sessionStorage.setItem('typeProd', type);
  }

  borrarType(): void {
    sessionStorage.removeItem('typeProd');
  }
}

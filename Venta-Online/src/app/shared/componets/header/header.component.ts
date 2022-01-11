import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLog = false;
  role: any;
  constructor(private authSrv: AuthService) { }

  @Output() toggleSideNav = new EventEmitter<void>();


  ngOnInit(): void {
    this.authSrv.getUser$().subscribe((user) => {
      this.isLog = user?.token!=null;
      this.role = user?.role;
    });
    this.isLog = localStorage.getItem('userToken') != null;
    this.role = localStorage.getItem('userRole');

  }

  onToggleSideNav(): void {
    this.toggleSideNav.emit();
  }

  onLogout(){
    this.authSrv.onLogout();
    this.isLog = false;
  }


}

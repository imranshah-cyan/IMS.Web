import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  showButton: boolean = false;
  btnAdminText: string = 'admin';
  icon: string = 'login'

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.url.subscribe(segments => {
      const fullUrl = window.location.href;
      if (fullUrl == 'http://localhost:4200/#/cts/admin') {
        this.showButton = true
      }
    });
    
  }

  ngOnInit() {
  }

  adm() {
    if (this.btnAdminText == 'admin' && sessionStorage.getItem('token') == undefined) {
      this.btnAdminText = 'dashboard'
      this.router.navigate(['cts', 'login']);
    }
    else if (this.btnAdminText == 'dashboard') {
      this.btnAdminText = 'admin'
      this.router.navigate(['cts', 'dashboard']);
    }
    else if (this.btnAdminText == 'admin' && sessionStorage.getItem('token') != undefined) {
      this.showButton = true
      this.btnAdminText = 'dashboard'
      this.router.navigate(['cts', 'admin']);
    }
  }

  logout() {
    this.showButton = false
    sessionStorage.clear()
    this.btnAdminText = 'admin'
    this.router.navigate(['cts', 'dashboard']);

  }
}

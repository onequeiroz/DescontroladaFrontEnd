import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Redirects to the Home page
   */
  public routeProductsPage(): void {
    this.router.navigate(["/"]);
  }

  /**
   * Redirects to the Register page
   */
  public routeRegisterPage(): void {
    this.router.navigate(["/products/register"]);
  }

}

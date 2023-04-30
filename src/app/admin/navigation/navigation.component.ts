import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  isSidebarActive = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}
  toggleSidebar() {
    const sidebar = this.el.nativeElement.querySelector('.sidebar');
    this.renderer.addClass(sidebar, 'active');
    this.isSidebarActive = !this.isSidebarActive;

    const sidebarBtn = this.el.nativeElement.querySelector('.sidebarBtn i');
    if (this.isSidebarActive) {
      this.renderer.removeClass(sidebarBtn, 'bx-menu');
      this.renderer.addClass(sidebarBtn, 'bx-menu-alt-right');
    } else {
      this.renderer.removeClass(sidebarBtn, 'bx-menu-alt-right');
      this.renderer.addClass(sidebarBtn, 'bx-menu');
    }
  }
}

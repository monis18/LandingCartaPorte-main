// Angular
import { AfterViewInit, Component, OnInit } from '@angular/core';
// Layout
import { LayoutConfigService, SubheaderService, ToggleOptions } from '../../../../core/_base/layout';

@Component({
  selector: 'kt-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss']
})
export class HeaderMobileComponent implements OnInit, AfterViewInit {
  // Public properties
  headerLogo: string;
  asideDisplay: boolean;

  toggleOptions: ToggleOptions = {
    target: 'body',
    targetState: 'kt-header__topbar--mobile-on',
    togglerState: 'kt-header-mobile__toolbar-topbar-toggler--active'
  };

  public desc = '';
  public title = '';

  /**
   * Component constructor
   *
   * @param layoutConfigService: LayoutConfigService
   */
  constructor(
    private layoutConfigService: LayoutConfigService,
    public subheaderService: SubheaderService
  ) {
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit() {
    this.headerLogo = this.layoutConfigService.getLogo();
    this.asideDisplay = this.layoutConfigService.getConfig('aside.self.display');
  }

  ngAfterViewInit(): void {

    this.subheaderService.title$.subscribe(bt => {
      // breadcrumbs title sometimes can be undefined
      if (bt) {
        Promise.resolve(null).then(() => {
          this.title = bt.title;
          this.desc = bt.desc;
        });
      }
    });
  }
}

// Angular
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
// Object-Path
import * as objectPath from 'object-path';
// RxJS
import { Subscription } from 'rxjs';
// Layout
import { LayoutConfigService, MenuConfigService, PageConfigService } from '../../../core/_base/layout';
import { LayoutConfig } from '../../../core/_config/layout.config';
import { MenuConfig } from '../../../core/_config/menu.config';
import { PageConfig } from '../../../core/_config/page.config';
import { HtmlClassService } from '../html-class.service';

@Component({
  selector: 'kt-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseComponent implements OnInit, OnDestroy {
  // Public variables
  selfLayout: string;
  asideDisplay: boolean;
  asideSecondary: boolean;
  subheaderDisplay: boolean;
  fluid: boolean;

  // Private properties
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private layoutConfigService: LayoutConfigService,
    private menuConfigService: MenuConfigService,
    private pageConfigService: PageConfigService,
    private htmlClassService: HtmlClassService,) {
    // this.loadRolesWithPermissions();

    // register configs by demos
    this.layoutConfigService.loadConfigs(new LayoutConfig().configs);
    this.menuConfigService.loadConfigs(new MenuConfig().configs);
    this.pageConfigService.loadConfigs(new PageConfig().configs);

    // setup element classes
    this.htmlClassService.setConfig(this.layoutConfigService.getConfig());

    const subscr = this.layoutConfigService.onConfigUpdated$.subscribe(layoutConfig => {
      // reset body class based on global and page level layout config, refer to html-class.service.ts
      document.body.className = '';
      this.htmlClassService.setConfig(layoutConfig);
    });
    this.unsubscribe.push(subscr);
  }

  ngOnInit(): void {
    const config = this.layoutConfigService.getConfig();
    this.selfLayout = objectPath.get(config, 'self.layout');
    this.asideDisplay = objectPath.get(config, 'aside.self.display');
    this.asideSecondary = objectPath.get(config, 'aside-secondary.self.display');
    this.subheaderDisplay = objectPath.get(config, 'subheader.display');
    this.fluid = objectPath.get(config, 'content.width') === 'fluid';

    // let the layout type change
    const subscr = this.layoutConfigService.onConfigUpdated$.subscribe(cfg => {
      setTimeout(() => {
        this.selfLayout = objectPath.get(cfg, 'self.layout');
      });
    });
    this.unsubscribe.push(subscr);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }

  // loadRolesWithPermissions() {
  //   this.currentUserPermissions$ = this.store.pipe(select(currentUserPermissions));
  //   const subscr = this.currentUserPermissions$.subscribe(res => {
  //     if (!res || res.length === 0) {
  //       return;
  //     }

  //     this.permissionsService.flushPermissions();
  //     res.forEach((pm: Permission) => this.permissionsService.addPermission(pm.name));
  //   });
  //   this.unsubscribe.push(subscr);
  // }
}

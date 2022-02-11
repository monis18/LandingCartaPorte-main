import { LayoutConfigModel } from '../_base/layout';

export class LayoutConfig {
  public defaults: LayoutConfigModel = {
    demo: 'demo3',
    // == Base Layout
    self: {
      layout: 'fluid', // fluid|boxed
      body: {
        'background-image': './assets/media/visoor/icono/azul/72x72.png',
      },
      logo: './assets/media/visoor/icono/blanco/72x72.png',
    },
    // == Page Splash Screen loading
    loader: {
      enabled: true,
      type: 'spinner-logo',
      logo: './assets/media/visoor/logo/192x192.png',
      message: 'Cargando...',
    },
    // == Colors for javascript
    colors: {
      state: {
        brand: '#4ac1e0',
        light: '#ffffff',
        dark: '#282a3c',
        primary: '#5867dd',
        success: '#1dc9b7',
        info: '#5578eb',
        warning: '#ffb822',
        danger: '#e0464e',
        // #4ac1e0
        ingresos: 'rgba(74, 193, 224, 1)',
        // #5969ad
        egresos: 'rgba(89, 105, 173, 1)',
        // #006eff
        cobrado: 'rgba(0, 110, 255, 1)',
        // #00decd
        pagado: 'rgba(0, 222, 205, 1)',
        // #243746
        undefined: 'rgba(36, 55, 70, 1)',
      },
      base: {
        label: [
          '#c5cbe3',
          '#a1a8c3',
          '#3d4465',
          '#3e4466',
        ],
        shape: [
          '#f0f3ff',
          '#d9dffa',
          '#afb4d4',
          '#646c9a',
        ],
      },
    },
    header: {
      self: {
        width: 'fluid',
        skin: 'light',
        fixed: {
          desktop: true,
          mobile: true,
        },
      },
      menu: {
        self: {
          display: true,
          'root-arrow': false,
          layout: 'tab',
        },
        desktop: {
          arrow: true,
          toggle: 'click',
          submenu: {
            skin: 'light',
            arrow: true,
          },
        },
        mobile: {
          submenu: {
            skin: 'dark',
            accordion: true,
          },
        },
      },
    },
    subheader: {
      display: false,
      fixed: false,
      layout: 'subheader-v3',
      width: 'fluid',
      style: 'solid',
    },
    content: {
      width: 'fluid',
    },
    brand: {
      self: {
        skin: 'navy',
      },
    },
    aside: {
      self: {
        display: true,
        fixed: true,
        minimize: {
          toggle: true,
          default: false,
        },
      },
      footer: {
        self: {
          display: true,
        },
      },
      menu: {
        'root-arrow': false,
        dropdown: true,
        scroll: false,
        submenu: {
          accordion: false,
          dropdown: {
            arrow: true,
            'hover-timeout': 500,
          },
        },
      },
    },
    footer: {
      self: {
        width: 'fluid',
        fixed: false,
      },
    },
  };

  /**
   * Good place for getting the remote config
   */
  public get configs(): LayoutConfigModel {
    return this.defaults;
  }
}

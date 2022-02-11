export class PageConfig {
  public defaults: any = {
    dashboard: {
      page: {
        title: 'Dashboard',
        desc: 'Latest updates and statistic charts'
      },
    },
    movimientos: {
      page: {
        title: 'Movimientos',
        desc: 'Entradas / Salidas / Nóminas / Pagos'
      },
    },
    facturacion: {
      page: { title: 'Facturación' },
      borrador: {
        page: { title: 'Editar Borrador', desc: '' }
      },
    },
    'estados-de-cuenta': {
      page: {
        title: 'Estados de Cuenta',
        desc: 'Estados de Cuenta Bancarios'
      },
    },
    conciliacion: {
      page: {
        title: 'Conciliación',
        desc: 'Relaciona tus facturas con tus movimientos Bancarios'
      },
    },
    nomina: {
      page: {
        title: 'Nómina',
        desc: 'Pagos a Trabajadores'
      },
    },
    diot: {
      page: {
        title: 'DIOT',
        desc: 'Proveedores'
      },
    },
    'listas-negras': {
      page: {
        title: 'Listas Negras',
        desc: 'Proveedores'
      },
    },
    cuenta: {
      page: {
        title: 'Cuenta',
        desc: 'Configuración Básica'
      },
    },
    'user-management': {
      users: {
        page: { title: 'Users', desc: '' }
      },
      roles: {
        page: { title: 'Roles', desc: '' }
      }
    },
    header: {
      actions: {
        page: { title: 'Actions', desc: 'Actions example page' }
      }
    },
    profile: {
      page: { title: 'User Profile', desc: '' }
    },
    error: {
      404: {
        page: { title: '404 Not Found', desc: '', subheader: false }
      },
      403: {
        page: { title: '403 Access Forbidden', desc: '', subheader: false }
      }
    },
  };

  public get configs(): any {
    return this.defaults;
  }
}

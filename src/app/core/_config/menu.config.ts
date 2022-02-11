export class MenuConfig {
  public defaults: any = {
    header: {
      self: {},
      items: [
        {
          title: 'Crear Factura',
          root: true,
          alignment: 'left',
          page: '/facturacion',
          activeFullUrl: true,
          id: 'add-invoice',
        },
        {
          title: 'Crear Recibo de Pago',
          root: true,
          alignment: 'left',
          page: '/facturacion',
          activeFullUrl: true,
          queryParams: { tipo: 'pago' },
          id: 'add-payment',
        },
        {
          title: 'Movimientos',
          root: true,
          alignment: 'left',
          page: '/movimientos',
          id: 'movements',
        },
      ]
    },
    aside: {
      self: {},
      items: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          root: true,
          icon: 'flaticon2-pie-chart',
          page: '/dashboard',
          bullet: 'dot',
        },
        {
          id: 'movements',
          title: 'Movimientos',
          root: true,
          icon: 'flaticon2-chart',
          page: '/movimientos'
        },
        // {
        //   title: 'Conciliación',
        //   root: true,
        //   icon: 'flaticon2-notepad',
        //   page: '/conciliacion'
        // },
        {
          id: 'invoices',
          title: 'Facturación',
          root: true,
          icon: 'flaticon2-soft-icons-1',
          page: '/facturacion'
        },
        {
          id: 'payroll',
          title: 'Nómina',
          root: true,
          page: '/nomina',
          icon: 'flaticon2-checking'
        },
        {
          id: 'diot',
          title: 'DIOT',
          root: true,
          page: '/diot',
          icon: 'flaticon2-file'
        },
        {
          id: 'black-list',
          title: 'Listas Negras',
          root: true,
          page: '/listas-negras',
          icon: 'flaticon2-list-1'
        },
      ]
    },
  };

  public get configs(): any {
    return this.defaults;
  }
}

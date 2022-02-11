export enum InvoiceCatTipoDeduccion {
  'Seguridad social' = '001',
  'ISR' = '002',
  'Aportaciones a retiro, cesantía en edad avanzada y vejez.' = '003',
  'Otros' = '004',
  'Aportaciones a Fondo de vivienda' = '005',
  'Descuento por incapacidad' = '006',
  'Pensión alimenticia' = '007',
  'Renta' = '008',
  'Préstamos provenientes del Fondo Nacional de la Vivienda para los Trabajadores' = '009',
  'Pago por crédito de vivienda' = '010',
  'Pago de abonos INFONACOT' = '011',
  'Anticipo de salarios' = '012',
  'Pagos hechos con exceso al trabajador' = '013',
  'Errores' = '014',
  'Pérdidas' = '015',
  'Averías' = '016',
  'Adquisición de artículos producidos por la empresa o establecimiento' = '017',
  'Cuotas para la constitución y fomento de sociedades cooperativas y de cajas de ahorro' = '018',
  'Cuotas sindicales' = '019',
  'Ausencia (Ausentismo)' = '020',
  'Cuotas obrero patronales' = '021',
  'Impuestos Locales' = '022',
  'Aportaciones voluntarias' = '023',
  'Ajuste en Gratificación Anual (Aguinaldo) Exento' = '024',
  'Ajuste en Gratificación Anual (Aguinaldo) Gravado' = '025',
  'Ajuste en Participación de los Trabajadores en las Utilidades PTU Exento' = '026',
  'Ajuste en Participación de los Trabajadores en las Utilidades PTU Gravado' = '027',
  'Ajuste en Reembolso de Gastos Médicos Dentales y Hospitalarios Exento' = '028',
  'Ajuste en Fondo de ahorro Exento' = '029',
  'Ajuste en Caja de ahorro Exento' = '030',
  'Ajuste en Contribuciones a Cargo del Trabajador Pagadas por el Patrón Exento' = '031',
  'Ajuste en Premios por puntualidad Gravado' = '032',
  'Ajuste en Prima de Seguro de vida Exento' = '033',
  'Ajuste en Seguro de Gastos Médicos Mayores Exento' = '034',
  'Ajuste en Cuotas Sindicales Pagadas por el Patrón Exento' = '035',
  'Ajuste en Subsidios por incapacidad Exento' = '036',
  'Ajuste en Becas para trabajadores y/o hijos Exento' = '037',
  'Ajuste en Horas extra Exento' = '038',
  'Ajuste en Horas extra Gravado' = '039',
  'Ajuste en Prima dominical Exento' = '040',
  'Ajuste en Prima dominical Gravado' = '041',
  'Ajuste en Prima vacacional Exento' = '042',
  'Ajuste en Prima vacacional Gravado' = '043',
  'Ajuste en Prima por antigüedad Exento' = '044',
  'Ajuste en Prima por antigüedad Gravado' = '045',
  'Ajuste en Pagos por separación Exento' = '046',
  'Ajuste en Pagos por separación Gravado' = '047',
  'Ajuste en Seguro de retiro Exento' = '048',
  'Ajuste en Indemnizaciones Exento' = '049',
  'Ajuste en Indemnizaciones Gravado' = '050',
  'Ajuste en Reembolso por funeral Exento' = '051',
  'Ajuste en Cuotas de seguridad social pagadas por el patrón Exento' = '052',
  'Ajuste en Comisiones Gravado' = '053',
  'Ajuste en Vales de despensa Exento' = '054',
  'Ajuste en Vales de restaurante Exento' = '055',
  'Ajuste en Vales de gasolina Exento' = '056',
  'Ajuste en Vales de ropa Exento' = '057',
  'Ajuste en Ayuda para renta Exento' = '058',
  'Ajuste en Ayuda para artículos escolares Exento' = '059',
  'Ajuste en Ayuda para anteojos Exento' = '060',
  'Ajuste en Ayuda para transporte Exento' = '061',
  'Ajuste en Ayuda para gastos de funeral Exento' = '062',
  'Ajuste en Otros ingresos por salarios Exento' = '063',
  'Ajuste en Otros ingresos por salarios Gravado' = '064',
  'Ajuste en Jubilaciones, pensiones o haberes de retiro Exento' = '065',
  'Ajuste en Jubilaciones, pensiones o haberes de retiro Gravado' = '066',
  'Ajuste en Pagos por separación Acumulable' = '067',
  'Ajuste en Pagos por separación No acumulable' = '068',
  'Ajuste en Jubilaciones, pensiones o haberes de retiro Acumulable' = '069',
  'Ajuste en Jubilaciones, pensiones o haberes de retiro No acumulable' = '070',
  'Ajuste en Subsidio para el empleo (efectivamente entregado al trabajador)' = '071',
  'Ajuste en Ingresos en acciones o títulos valor que representan bienes Exento' = '072',
  'Ajuste en Ingresos en acciones o títulos valor que representan bienes Gravado' = '073',
  'Ajuste en Alimentación Exento' = '074',
  'Ajuste en Alimentación Gravado' = '075',
  'Ajuste en Habitación Exento' = '076',
  'Ajuste en Habitación Gravado' = '077',
  'Ajuste en Premios por asistencia' = '078',
  'Ajuste en Pagos distintos a los listados y que no deben considerarse como ingreso por sueldos, salar' = '079',
  'Ajuste en Viáticos gravados' = '080',
  'Ajuste en Viáticos (entregados al trabajador)' = '081',
  'Ajuste en Fondo de ahorro Gravado' = '082',
  'Ajuste en Caja de ahorro Gravado' = '083',
  'Ajuste en Prima de Seguro de vida Gravado' = '084',
  'Ajuste en Seguro de Gastos Médicos Mayores Gravado' = '085',
  'Ajuste en Subsidios por incapacidad Gravado' = '086',
  'Ajuste en Becas para trabajadores y/o hijos Gravado' = '087',
  'Ajuste en Seguro de retiro Gravado' = '088',
  'Ajuste en Vales de despensa Gravado' = '089',
  'Ajuste en Vales de restaurante Gravado' = '090',
  'Ajuste en Vales de gasolina Gravado' = '091',
  'Ajuste en Vales de ropa Gravado' = '092',
  'Ajuste en Ayuda para renta Gravado' = '093',
  'Ajuste en Ayuda para artículos escolares Gravado' = '094',
  'Ajuste en Ayuda para anteojos Gravado' = '095',
  'Ajuste en Ayuda para transporte Gravado' = '096',
  'Ajuste en Ayuda para gastos de funeral Gravado' = '097',
  'Ajuste a ingresos asimilados a salarios gravados' = '098',
  'Ajuste a ingresos por sueldos y salarios gravados' = '099',
  'Ajuste en Viáticos exentos' = '100',
}

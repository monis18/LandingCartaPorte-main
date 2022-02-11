// tslint:disable: max-line-length
import { InvoiceAddendasModel } from '@addendas/invoice-addenda.model';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceComplementoDonatariasModel } from '@complementos/invoice-complemento-donatarias.model';
import { InvoiceComplementosModel } from '@complementos/invoice-complemento.model';
import { InvoiceComplementoPagoDoctoRelacionadoModel } from '@complementos/pagos/invoice-complemento-pago-docto-relacionado.model';
import { InvoiceComplementoPagoModel } from '@complementos/pagos/invoice-complemento-pago.model';
import { InvoiceComplementoPagosModel } from '@complementos/pagos/invoice-complemento-pagos.model';
import { InvoiceCatImpuesto } from '@enums/catalogues/invoice-cat-impuesto.enum';
import { InvoiceCatTipoFactor } from '@enums/catalogues/invoice-cat-tipo-factor.enum';
import { InvoiceImpuestoIvaTraslado } from '@enums/invoice-impuesto-iva-traslado.enum';
import { InvoiceType } from '@enums/invoice-type.enum';
import { InvoiceTotals } from '@interfaces/invoice-totals.interface';
import { validateInvoicePagosAutocomplete, validateMaxLengthModelField, validateNotEmptyModelFields, validateRequiredIfFormArrayExist } from '@layout';
import { InvoiceSenderClientModel } from '@models/invoice-sender/invoice-sender-client.model';
import { InvoiceSenderProductModel } from '@models/invoice-sender/invoice-sender-product.model';
import { InvoiceConceptoImpuestoRetencionModel } from '@models/invoice/conceptos/impuestos/invoice-concepto-impuesto-retencion.model';
import { InvoiceConceptoImpuestoTrasladoModel } from '@models/invoice/conceptos/impuestos/invoice-concepto-impuesto-traslado.model';
import { InvoiceConceptoImpuestoModel } from '@models/invoice/conceptos/impuestos/invoice-concepto-impuesto.model';
import { InvoiceConceptoModel } from '@models/invoice/conceptos/invoice-concepto.model';
import { InvoiceImpuestosRetencionModel } from '@models/invoice/impuestos/invoice-impuestos-retencion.model';
import { InvoiceImpuestosTrasladoModel } from '@models/invoice/impuestos/invoice-impuestos-traslado.model';
import { InvoiceImpuestosModel } from '@models/invoice/impuestos/invoice-impuestos.model';
import { InvoiceCatClaveProdServModel } from '@models/invoice/invoice-cat-clave-prod-serv.model';
import { InvoiceCatClaveUnidadModel } from '@models/invoice/invoice-cat-clave-unidad.model';
import { InvoiceCfdiRelacionadoModel } from '@models/invoice/invoice-cfdi-relacionado.model';
import { InvoiceCfdiRelacionadosModel } from '@models/invoice/invoice-cfdi-relacionados.model';
import { InvoiceEmisorModel } from '@models/invoice/invoice-emisor.model';
import { InvoiceReceptorModel } from '@models/invoice/invoice-receptor.model';
import { InvoiceModel } from '@models/invoice/invoice.model';
import { ExtendedFormControl, prepareDate } from '@utils';
import { validateRequiredFields } from '../_base/layout/validators/validate-required-fields.validator';
// tslint:enable: max-line-length

@Injectable({ providedIn: 'root' })
export class InvoiceEditFormBuilderService {

  public readOnly = false;
  public emails: string[] = [];
  public invoiceForm: FormGroup;
  public addendas: InvoiceAddendasModel = new InvoiceAddendasModel();
  public complementos: InvoiceComplementosModel = new InvoiceComplementosModel();

  constructor(
    private invoiceFB: FormBuilder,
  ) { }

  /**
   * Limpia los complementos
   */
  clearComplementos(invoiceType: string) {

    let removeDonat = false;
    let removePagos = false;
    switch (invoiceType) {
      case InvoiceType.Ingreso:
      case InvoiceType.Arrendamiento:
      case InvoiceType['Nota de Crédito']:
      case InvoiceType['Recibo de Honorarios']:
        removeDonat = true;
        removePagos = true;
        break;
      case InvoiceType['Recibo de Donativos']:
        removePagos = true;
        break;
      case InvoiceType['Recibo de Pago']:
        removeDonat = true;
        break;
    }

    const donatForm = this.invoiceForm.get('Complementos').get('Donatarias') as FormGroup;
    const pagosForm = this.invoiceForm.get('Complementos').get('ComplementoPagos') as FormGroup;
    if (donatForm && removeDonat) {
      (this.invoiceForm.get('Complementos') as FormGroup).removeControl('Donatarias');
    }

    if (pagosForm && removePagos) {
      (this.invoiceForm.get('Complementos') as FormGroup).removeControl('ComplementoPagos');
    }
  }

  /**
   * Setea las variables de la clase
   * Se usa para limpiar el servicio al resetar facuración
   */
  init(invoice: InvoiceModel) {
    this.emails = invoice.Emails ? invoice.Emails : [];
    this.invoiceForm = null;
    this.addendas = new InvoiceAddendasModel();
    this.complementos = new InvoiceComplementosModel();
  }

  createForm(invoice: InvoiceModel) {
    const date = new Date(invoice.Fecha);
    const addendas = Object.assign(new InvoiceAddendasModel(), invoice.Addendas);
    const complementos = Object.assign(new InvoiceComplementosModel(), invoice.Complementos);
    this.invoiceForm = this.invoiceFB.group({
      id: [invoice.id],
      EmisorId: [invoice.EmisorId],
      Serie: [{ value: invoice.Serie, disabled: this.readOnly }, [Validators.required, Validators.maxLength(25)]],
      Folio: [{ value: invoice.Folio, disabled: this.readOnly }, [Validators.required, , Validators.maxLength(40)]],
      Fecha: [{ value: date, disabled: this.readOnly }, Validators.required],
      Total: [invoice.Total],
      SubTotal: [invoice.SubTotal],
      Descuento: [{ value: invoice.Descuento, disabled: this.readOnly }],
      FormaPago: [{ value: invoice.FormaPago, disabled: this.readOnly }, Validators.required],
      CondicionesDePago: [{ value: invoice.CondicionesDePago, disabled: this.readOnly }, Validators.maxLength(1000)],
      Moneda: [{ value: invoice.Moneda, disabled: this.readOnly }, Validators.required],
      TipoCambio: [{ value: invoice.TipoCambio, disabled: this.readOnly }],
      TipoDeComprobante: [{ value: invoice.TipoDeComprobante, disabled: this.readOnly }, Validators.required],
      MetodoPago: [{ value: invoice.MetodoPago, disabled: this.readOnly }, Validators.required],
      LugarExpedicion: [{ value: invoice.LugarExpedicion, disabled: this.readOnly }, Validators.required],
      Version: [invoice.Version],
      Certificado: [invoice.Certificado],
      Sello: [invoice.Sello],
      NoCertificado: [invoice.NoCertificado],
      Confirmacion: [invoice.Confirmacion],
      Observaciones: [invoice.Confirmacion],
      Emisor: this.emisorForm(invoice.Emisor),
      Receptor: this.receptorForm(invoice.Receptor),
      Conceptos: this.invoiceFB.array(
        invoice.Conceptos.map(concepto => this.conceptoRow(concepto)),
      ),
      Impuestos: this.invoiceFB.array(
        invoice.Impuestos.map(impuesto => this.impuestosRow(impuesto)),
      ),
      Complementos: this.complementosForm(complementos),
      CfdiRelacionados: this.cfdiRelacionadosForm(invoice.CfdiRelacionados),
      Addendas: this.addendasForm(addendas),
    });

    this.complementos = complementos;
    this.addendas = addendas;
  }

  emisorForm(emisor: InvoiceEmisorModel): FormGroup {
    return this.invoiceFB.group({
      id: [emisor.id],
      invoiceId: [emisor.invoiceId],
      Rfc: [{ value: emisor.Rfc, disabled: this.readOnly }, Validators.required],
      Nombre: [emisor.Nombre],
      RegimenFiscal: [{ value: emisor.RegimenFiscal, disabled: this.readOnly }, Validators.required],
    });
  }

  receptorForm(receptor: InvoiceReceptorModel): FormGroup {
    return this.invoiceFB.group({
      ReceptorAutocomplete: new ExtendedFormControl(
        {
          value: Object.assign(new InvoiceSenderClientModel(), InvoiceReceptorModel.InvoiceSenderClientToInvoiceReceptor(receptor)),
          disabled: this.readOnly
        },
        [validateRequiredFields('Name', 'Rfc')]
      ),
      id: [receptor.id],
      invoiceId: [receptor.invoiceId],
      Rfc: [{ value: receptor.Rfc, disabled: this.readOnly }, Validators.required],
      Nombre: [receptor.Nombre],
      ResidenciaFiscal: [receptor.ResidenciaFiscal],
      NumRegIdTrib: [receptor.NumRegIdTrib],
      UsoCFDI: [{ value: receptor.UsoCFDI, disabled: this.readOnly }, Validators.required],
    });
  }

  runInvoicesAutocompleteValidation(): void {
    const complementos = this.invoiceForm.get('Complementos') as FormGroup;
    const complementoPagos = complementos.get('ComplementoPagos') as FormGroup;
    if (!!complementoPagos) {
      complementoPagos.get('InvoicesAutocomplete').updateValueAndValidity();
    }
  }

  complementosForm(complemento: InvoiceComplementosModel): FormGroup {
    const complementosForm = this.invoiceFB.group({});

    if (complemento.ComplementoPagos) {
      complementosForm.addControl(
        'ComplementoPagos',
        this.complementoPagosForm(complemento.ComplementoPagos)
      );
    }

    if (complemento.Donatarias) {
      complementosForm.addControl(
        'Donatarias',
        this.donatariasForm(complemento.Donatarias)
      );
    }

    return complementosForm;
  }

  donatariasForm(donat: InvoiceComplementoDonatariasModel): FormGroup {

    if (!donat) {
      return null;
    }

    return this.invoiceFB.group({
      version: [donat.version, Validators.required],
      noAutorizacion: [donat.noAutorizacion, Validators.required],
      fechaAutorizacion: [donat.fechaAutorizacion, Validators.required],
      leyenda: [donat.leyenda, Validators.required],
    });
  }

  complementoPagosForm(complementoPagos: InvoiceComplementoPagosModel): FormGroup {
    // console.log('complementoPago', complementoPagos);

    if (!complementoPagos) {
      return this.invoiceFB.group({
        Version: [null],
        Pagos: this.invoiceFB.array([]),
        InvoicesAutocomplete: [],
      });
    }

    return this.invoiceFB.group({
      Version: [complementoPagos.Version],
      Pagos: this.invoiceFB.array(
        complementoPagos.Pagos.map(pago => this.complementoPagoRow(pago)) || [],
      ),
      InvoicesAutocomplete: new ExtendedFormControl('', validateInvoicePagosAutocomplete()),
    });
  }

  complementoPagoRow(complementoPago: InvoiceComplementoPagoModel): FormGroup {
    // console.log('complementoPagoRow', complementoPago);
    if (!complementoPago) {
      return null;
    }

    const date = new Date(complementoPago.FechaPago);
    const rfcPattern = '^XEXX010101000|[A-Z&Ñ]{3}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]$';
    const ctaPattern = '^[A-Z0-9_]{10,50}$';
    return this.invoiceFB.group({
      id: [complementoPago.id],
      invoiceId: [complementoPago.invoiceId],
      FechaPago: [date],
      FormaDePagoP: [complementoPago.FormaDePagoP],
      MonedaP: [complementoPago.MonedaP],
      TipoCambioP: [{ value: complementoPago.TipoCambioP, disabled: this.readOnly }, [Validators.min(0.000001)]],
      Monto: [complementoPago.Monto],
      NumOperacion: [
        { value: complementoPago.NumOperacion, disabled: this.readOnly },
        [Validators.minLength(1), Validators.maxLength(100)]
      ],
      RfcEmisorCtaOrd: [
        { value: complementoPago.RfcEmisorCtaOrd, disabled: this.readOnly },
        [Validators.pattern(rfcPattern)]
      ],
      NomBancoOrdExt: [
        { value: complementoPago.NomBancoOrdExt, disabled: this.readOnly },
        [Validators.minLength(1), Validators.maxLength(300)]
      ],
      CtaOrdenante: [{ value: complementoPago.CtaOrdenante, disabled: this.readOnly }, [Validators.pattern(ctaPattern)]],
      RfcEmisorCtaBen: [{ value: complementoPago.RfcEmisorCtaBen, disabled: this.readOnly }, [Validators.pattern(rfcPattern)]],
      CtaBeneficiario: [{ value: complementoPago.CtaBeneficiario, disabled: this.readOnly }, [Validators.pattern(ctaPattern)]],
      TipoCadPago: [complementoPago.TipoCadPago],
      CertPago: [complementoPago.CertPago],
      CadPago: [complementoPago.CadPago],
      SelloPago: [complementoPago.SelloPago],
      DoctoRelacionados: this.invoiceFB.array(
        // tslint:disable-next-line: max-line-length
        complementoPago.DoctoRelacionados ? complementoPago.DoctoRelacionados.map(doc => this.complementoPagoDoctoRelacionadoRow(doc)) : [],
        [Validators.required]
      ),
      Impuestos: this.invoiceFB.array(
        complementoPago.Impuestos ? complementoPago.Impuestos.map(impuesto => this.impuestosRow(impuesto)) : [],
      ),
    });
  }

  complementoPagoDoctoRelacionadoRow(doctoRelacionado: InvoiceComplementoPagoDoctoRelacionadoModel): FormGroup {
    const idDocPattern = '([a-f0-9A-F]{8}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{12})|([0-9]{3}-[0-9]{2}-[0-9]{9})';
    return this.invoiceFB.group({
      id: [doctoRelacionado.id],
      invoicePagoId: [doctoRelacionado.invoicePagoId],
      IdDocumento: [{ value: doctoRelacionado.IdDocumento, disabled: this.readOnly }, [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(36),
        Validators.pattern(idDocPattern)
      ]],
      Serie: [{ value: doctoRelacionado.Serie, disabled: true }, [Validators.minLength(1), Validators.maxLength(25)]],
      Folio: [{ value: doctoRelacionado.Folio, disabled: true }, [Validators.minLength(1), Validators.maxLength(40)]],
      MonedaDR: [{ value: doctoRelacionado.MonedaDR, disabled: true }, [Validators.required]],
      TipoCambioDR: [doctoRelacionado.TipoCambioDR],
      MetodoDePagoDR: [{ value: doctoRelacionado.MetodoDePagoDR, disabled: true }, [Validators.required]],
      NumParcialidad: [doctoRelacionado.NumParcialidad],
      ImpSaldoAnt: [doctoRelacionado.ImpSaldoAnt],
      ImpPagado: [doctoRelacionado.ImpPagado, Validators.required],
      ImpSaldoInsoluto: [{ value: doctoRelacionado.ImpSaldoInsoluto, disabled: true }],
    });
  }

  cfdiRelacionadosForm(cfdiRelacionados: InvoiceCfdiRelacionadosModel): FormGroup {
    if (!cfdiRelacionados) {
      cfdiRelacionados = new InvoiceCfdiRelacionadosModel();
    }

    return this.invoiceFB.group({
      id: [cfdiRelacionados.id],
      invoiceId: [cfdiRelacionados.invoiceId],
      TipoRelacion: [cfdiRelacionados.TipoRelacion, validateRequiredIfFormArrayExist('CfdiRelacionado')],
      CfdiRelacionado: this.invoiceFB.array(
        cfdiRelacionados.CfdiRelacionado.map(cfdiRelacionado => this.cfdiRelacionadoRow(cfdiRelacionado)),
      ),
      CfdiRelacionadoAutocomplete: [],
    });
  }

  cfdiRelacionadoRow(cfdiRelacionado: InvoiceCfdiRelacionadoModel): FormGroup {
    return this.invoiceFB.group({
      id: [cfdiRelacionado.id],
      invoiceCfdiRelacionadosId: [cfdiRelacionado.invoiceCfdiRelacionadosId],
      UUID: [cfdiRelacionado.UUID],
    });
  }

  addendasForm(addenda: InvoiceAddendasModel): FormGroup {
    const addendasForm = this.invoiceFB.group({});
    return addendasForm;
  }

  impuestosRow(impuesto: InvoiceImpuestosModel): FormGroup {
    return this.invoiceFB.group({
      id: [{ value: impuesto.id, disabled: this.readOnly }],
      invoiceId: [{ value: impuesto.invoiceId, disabled: this.readOnly }],
      TotalImpuestosRetenidos: [{ value: impuesto.TotalImpuestosRetenidos, disabled: this.readOnly }],
      TotalImpuestosTrasladados: [{ value: impuesto.TotalImpuestosTrasladados, disabled: this.readOnly }],
      Retenciones: this.invoiceFB.array(
        []
      ),
      Traslados: this.invoiceFB.array(
        []
      ),
    });
  }

  getImpuestosFixed(concepto: InvoiceConceptoModel): InvoiceTotals {
    const impuestos = concepto.Impuestos;
    const traslados = impuestos[0] ? impuestos[0].Traslados : [];
    const retenciones = impuestos[0] ? impuestos[0].Retenciones : [];

    const iva = traslados.find(t => t.Impuesto === InvoiceCatImpuesto.IVA);
    const ieps = traslados.find(t => t.Impuesto === InvoiceCatImpuesto.IEPS);
    const retIva = retenciones.find(t => t.Impuesto === InvoiceCatImpuesto.IVA);
    const retIeps = retenciones.find(t => t.Impuesto === InvoiceCatImpuesto.IEPS);
    const retIsr = retenciones.find(t => t.Impuesto === InvoiceCatImpuesto.ISR);

    return {
      Iva: !!iva ? Number(iva.TasaOCuota) : null,
      Ieps: !!ieps ? Number(ieps.TasaOCuota) : null,
      RetIva: !!retIva ? this.roundNumber(Number(retIva.TasaOCuota) * 100) : null,
      RetIeps: !!retIeps ? Number(retIeps.TasaOCuota) : null,
      RetIsr: !!retIsr ? this.roundNumber(Number(retIsr.TasaOCuota) * 100) : null,
      TrasladosLocales: 0,
      RetencionesLocales: 0,
    };
  }

  conceptoRow(concepto: InvoiceConceptoModel): FormGroup {
    const taxes = this.getImpuestosFixed(concepto);
    return this.invoiceFB.group({
      id: [{ value: concepto.id, disabled: this.readOnly }],
      invoiceId: [{ value: concepto.invoiceId, disabled: this.readOnly }],
      ClaveProdServ: [{ value: concepto.ClaveProdServ, disabled: this.readOnly }, Validators.required],
      NoIdentificacion: [{ value: concepto.NoIdentificacion, disabled: this.readOnly }, [Validators.maxLength(100)]],
      Cantidad: [{ value: concepto.Cantidad, disabled: this.readOnly }, [Validators.required, Validators.min(0.000001)]],
      ClaveUnidad: [{ value: concepto.ClaveUnidad, disabled: this.readOnly }, Validators.required],
      Unidad: [{ value: concepto.Unidad, disabled: this.readOnly }, Validators.maxLength(20)],
      Descripcion: [{ value: concepto.Descripcion, disabled: this.readOnly }, [Validators.required, Validators.maxLength(1000)]],
      ValorUnitario: [{ value: concepto.ValorUnitario, disabled: this.readOnly }, Validators.required],
      ValorUnitarioWithIva: [{ value: concepto.ValorUnitario, disabled: this.readOnly }, Validators.required],
      Importe: [{ value: concepto.Importe, disabled: this.readOnly }, Validators.required],
      Descuento: [{ value: concepto.Descuento, disabled: this.readOnly }],
      DescripcionAutocomplete: new ExtendedFormControl(
        {
          value: Object.assign(new InvoiceSenderProductModel(), { Description: concepto.Descripcion || '' }),
          disabled: this.readOnly
        },
        [validateNotEmptyModelFields('Description'), validateMaxLengthModelField('Description', 1000)]
      ),
      ClaveProdServAutocomplete: new ExtendedFormControl(
        {
          value: Object.assign(new InvoiceCatClaveProdServModel(), { Clave: concepto.ClaveProdServ || '' }),
          disabled: this.readOnly
        },
        [validateNotEmptyModelFields('Clave')]
      ),
      ClaveUnidadAutocomplete: new ExtendedFormControl(
        {
          value: Object.assign(new InvoiceCatClaveUnidadModel(), { Clave: concepto.ClaveUnidad || '' }),
          disabled: this.readOnly
        },
        [validateNotEmptyModelFields('Clave')]
      ),
      Impuestos: this.invoiceFB.array(
        concepto.Impuestos.map(impuesto => this.conceptoImpuesto(impuesto))
      ),
      ImpuestosFixed: this.invoiceFB.group({
        Iva: [{ value: taxes.Iva || InvoiceImpuestoIvaTraslado['Impuesto 16%'], disabled: this.readOnly }],
        Ieps: [{ value: taxes.Ieps || null, disabled: this.readOnly }],
        RetIeps: [{ value: taxes.RetIeps || null, disabled: this.readOnly }],
        RetIva: [{ value: taxes.RetIva || null, disabled: this.readOnly }, [Validators.min(0), Validators.max(16)]],
        RetIsr: [{ value: taxes.RetIsr || null, disabled: this.readOnly }, [Validators.min(0), Validators.max(35)]],
      })
      // cuentaPredial: this.invoiceFB.array(
      //   []
      // ),
      // informacionAduanera: this.invoiceFB.array(
      //   []
      // ),
      // complementoConcepto: this.invoiceFB.array(
      //   []
      // ),
      // parte: this.invoiceFB.array(
      //   []
      // ),
    });
  }

  conceptoImpuesto(impuesto: InvoiceConceptoImpuestoModel): FormGroup {
    return this.invoiceFB.group({
      Retenciones: this.invoiceFB.array(
        impuesto.Retenciones.map(retencion => this.conceptoImpuestoRetencionFG(retencion))
      ),
      Traslados: this.invoiceFB.array(
        impuesto.Traslados.map(traslado => this.conceptoImpuestoTrasladoFG(traslado))
      ),
    });
  }

  conceptoImpuestoTrasladoFG(traslado: InvoiceConceptoImpuestoTrasladoModel): FormGroup {
    return this.invoiceFB.group({
      id: [{ value: traslado.id, disabled: this.readOnly }],
      invoiceConceptoId: [{ value: traslado.invoiceConceptoId, disabled: this.readOnly }],
      Base: [{ value: traslado.Base, disabled: this.readOnly }],
      Impuesto: [{ value: traslado.Impuesto, disabled: this.readOnly }],
      TipoFactor: [{ value: traslado.TipoFactor, disabled: this.readOnly }],
      TasaOCuota: [{ value: traslado.TasaOCuota, disabled: this.readOnly }],
      Importe: [{ value: traslado.Importe, disabled: this.readOnly }],
    });
  }

  conceptoImpuestoRetencionFG(retencion: InvoiceConceptoImpuestoRetencionModel): FormGroup {
    return this.invoiceFB.group({
      id: [{ value: retencion.id, disabled: this.readOnly }],
      invoiceConceptoId: [{ value: retencion.invoiceConceptoId, disabled: this.readOnly }],
      Base: [{ value: retencion.Base, disabled: this.readOnly }],
      Impuesto: [{ value: retencion.Impuesto, disabled: this.readOnly }],
      TipoFactor: [{ value: retencion.TipoFactor, disabled: this.readOnly }],
      TasaOCuota: [{ value: retencion.TasaOCuota, disabled: this.readOnly }],
      Importe: [{ value: retencion.Importe, disabled: this.readOnly }],
    });
  }

  roundNumber(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }

  calculateTaxImportes(impuestosFixed: FormGroup, importe: number): InvoiceTotals {
    return {
      Iva: Number(impuestosFixed.get('Iva').value) * Number(importe),
      Ieps: impuestosFixed.get('Ieps').value * Number(importe),
      RetIeps: impuestosFixed.get('RetIeps').value * Number(importe),
      RetIva: (Number(impuestosFixed.get('RetIva').value) / 100) * Number(importe),
      RetIsr: (Number(impuestosFixed.get('RetIsr').value) / 100) * Number(importe),
      TrasladosLocales: 0,
      RetencionesLocales: 0,
    };
  }

  prepareInvoice(): InvoiceModel {
    const invoiceForm = this.invoiceForm;
    const invoice = new InvoiceModel();
    invoice.id = invoiceForm.get('id').value;
    invoice.EmisorId = invoiceForm.get('EmisorId').value;
    const serie = invoiceForm.get('Serie').value;
    invoice.Serie = serie.Serie !== undefined ? serie.Serie : serie;
    invoice.Folio = invoiceForm.get('Folio').value;
    invoice.Fecha = prepareDate(new Date(invoiceForm.get('Fecha').value));
    invoice.Total = invoiceForm.get('Total').value;
    invoice.SubTotal = invoiceForm.get('SubTotal').value;
    invoice.Descuento = invoiceForm.get('Descuento').value > 0 ? invoiceForm.get('Descuento').value : null;
    invoice.FormaPago = invoiceForm.get('FormaPago').value;
    invoice.CondicionesDePago = invoiceForm.get('CondicionesDePago').value;
    invoice.Moneda = invoiceForm.get('Moneda').value;
    invoice.TipoCambio = invoiceForm.get('TipoCambio').value;
    invoice.TipoDeComprobante = invoiceForm.get('TipoDeComprobante').value;
    invoice.MetodoPago = invoiceForm.get('MetodoPago').value;
    invoice.LugarExpedicion = invoiceForm.get('LugarExpedicion').value;
    invoice.Version = invoiceForm.get('Version').value;
    invoice.Certificado = invoiceForm.get('Certificado').value;
    invoice.Sello = invoiceForm.get('Sello').value;
    invoice.NoCertificado = invoiceForm.get('NoCertificado').value;
    invoice.Confirmacion = invoiceForm.get('Confirmacion').value;

    invoice.Emisor = this.prepareInvoiceEmisor(invoiceForm.get('Emisor') as FormGroup);
    invoice.Receptor = this.prepareInvoiceReceptor(invoiceForm.get('Receptor') as FormGroup);
    invoice.Conceptos = (invoiceForm.get('Conceptos') as FormArray).controls.map((c: FormGroup) => this.prepareInvoiceConcepto(c));
    invoice.Impuestos = [this.prepareInvoiceImpuestos(invoice.Conceptos)];
    invoice.Complementos = this.prepareInvoiceComplementos(invoiceForm.get('Complementos') as FormGroup);
    invoice.CfdiRelacionados = this.prepareInvoiceCfdiRelacionados(invoiceForm.get('CfdiRelacionados') as FormGroup);
    invoice.Addendas = this.prepareInvoiceAddendas(invoiceForm.get('Addendas') as FormGroup);

    return invoice;
  }

  prepareInvoiceCfdiRelacionados(CfdiRelacionadosForm: FormGroup): InvoiceCfdiRelacionadosModel {

    const cfdiRelacionadoFormArray = CfdiRelacionadosForm.get('CfdiRelacionado') as FormArray;
    if (cfdiRelacionadoFormArray.length === 0) {
      return null;
    }

    return Object.assign(new InvoiceCfdiRelacionadosModel(), {
      id: CfdiRelacionadosForm.get('id').value,
      invoiceId: CfdiRelacionadosForm.get('invoiceId').value,
      TipoRelacion: CfdiRelacionadosForm.get('TipoRelacion').value,
      CfdiRelacionado: this.prepareInvoiceCfdiRelacionado(cfdiRelacionadoFormArray),
    });
  }

  prepareInvoiceCfdiRelacionado(CfdiRelacionadoForm: FormArray): InvoiceCfdiRelacionadoModel[] {
    return CfdiRelacionadoForm.controls.map(form => {
      return Object.assign(new InvoiceCfdiRelacionadoModel(), {
        id: form.get('id').value,
        invoiceCfdiRelacionadosId: form.get('invoiceCfdiRelacionadosId').value,
        UUID: form.get('UUID').value,
      });
    });
  }

  prepareInvoiceEmisor(emisorForm: FormGroup): InvoiceEmisorModel {
    return Object.assign(new InvoiceEmisorModel(), {
      id: emisorForm.get('id').value,
      invoiceId: emisorForm.get('invoiceId').value,
      Rfc: emisorForm.get('Rfc').value,
      Nombre: emisorForm.get('Nombre').value,
      RegimenFiscal: emisorForm.get('RegimenFiscal').value,
    });
  }

  prepareInvoiceReceptor(receptorForm: FormGroup): InvoiceReceptorModel {
    return Object.assign(new InvoiceReceptorModel(), {
      id: receptorForm.get('id').value,
      invoiceId: receptorForm.get('invoiceId').value,
      Rfc: receptorForm.get('Rfc').value,
      Nombre: receptorForm.get('Nombre').value,
      ResidenciaFiscal: receptorForm.get('ResidenciaFiscal').value,
      NumRegIdTrib: receptorForm.get('NumRegIdTrib').value,
      UsoCFDI: receptorForm.get('UsoCFDI').value,
    });
  }

  prepareInvoiceConceptoImpuestos(impuestosFixed: FormGroup, concepto: InvoiceConceptoModel): InvoiceConceptoImpuestoModel {
    const ivaControl = impuestosFixed.get('Iva').value;
    const iepsControl = impuestosFixed.get('Ieps').value;
    const retIepsControl = impuestosFixed.get('RetIeps').value;
    const retIvaControl = impuestosFixed.get('RetIva').value;
    const retIsrControl = impuestosFixed.get('RetIsr').value;

    const taxImportes = this.calculateTaxImportes(impuestosFixed, concepto.Importe);

    const tasaOCouta = (val): string => String(Number(val).toFixed(2)).padEnd(8, '0');

    const impuestos = new InvoiceConceptoImpuestoModel();
    impuestos.Traslados = [];

    switch (ivaControl) {
      case InvoiceImpuestoIvaTraslado['Impuesto 16%']:
      case InvoiceImpuestoIvaTraslado['Impuesto 0']:
        impuestos.Traslados.push(Object.assign(new InvoiceConceptoImpuestoTrasladoModel(), {
          id: 0,
          invoiceConceptoId: concepto.id,
          Base: this.roundNumber(concepto.Importe),
          Impuesto: InvoiceCatImpuesto.IVA,
          TipoFactor: InvoiceCatTipoFactor.Tasa,
          TasaOCuota: tasaOCouta(ivaControl),
          Importe: this.roundNumber(taxImportes.Iva),
        }));
        break;
      case InvoiceImpuestoIvaTraslado['Impuesto Excento']:
        impuestos.Traslados.push(Object.assign(new InvoiceConceptoImpuestoTrasladoModel(), {
          id: 0,
          invoiceConceptoId: concepto.id,
          Base: this.roundNumber(concepto.Importe),
          Impuesto: InvoiceCatImpuesto.IVA,
          TipoFactor: InvoiceCatTipoFactor.Exento,
          Importe: this.roundNumber(taxImportes.Iva),
        }));
        break;
      default:
        break;
    }

    if (taxImportes.Ieps > 0) {
      impuestos.Traslados.push(Object.assign(new InvoiceConceptoImpuestoTrasladoModel(), {
        id: 0,
        invoiceConceptoId: concepto.id,
        Base: this.roundNumber(concepto.Importe),
        Impuesto: InvoiceCatImpuesto.IEPS,
        TipoFactor: InvoiceCatTipoFactor.Tasa,
        TasaOCuota: tasaOCouta(iepsControl),
        Importe: this.roundNumber(taxImportes.Ieps),
      }));
    }

    impuestos.Retenciones = [];

    if (taxImportes.RetIeps > 0) {
      impuestos.Retenciones.push(Object.assign(new InvoiceConceptoImpuestoTrasladoModel(), {
        id: 0,
        invoiceConceptoId: concepto.id,
        Base: this.roundNumber(concepto.Importe),
        Impuesto: InvoiceCatImpuesto.IEPS,
        TipoFactor: InvoiceCatTipoFactor.Tasa,
        TasaOCuota: tasaOCouta(retIepsControl),
        Importe: this.roundNumber(taxImportes.RetIeps),
      }));
    }

    if (taxImportes.RetIva > 0) {
      impuestos.Retenciones.push(Object.assign(new InvoiceConceptoImpuestoTrasladoModel(), {
        id: 0,
        invoiceConceptoId: concepto.id,
        Base: this.roundNumber(concepto.Importe),
        Impuesto: InvoiceCatImpuesto.IVA,
        TipoFactor: InvoiceCatTipoFactor.Tasa,
        TasaOCuota: tasaOCouta(retIvaControl / 100),
        Importe: this.roundNumber(taxImportes.RetIva),
      }));
    }

    if (taxImportes.RetIsr > 0) {
      impuestos.Retenciones.push(Object.assign(new InvoiceConceptoImpuestoTrasladoModel(), {
        id: 0,
        invoiceConceptoId: concepto.id,
        Base: this.roundNumber(concepto.Importe),
        Impuesto: InvoiceCatImpuesto.ISR,
        TipoFactor: InvoiceCatTipoFactor.Tasa,
        TasaOCuota: tasaOCouta(retIsrControl / 100),
        Importe: this.roundNumber(taxImportes.RetIsr),
      }));
    }

    return impuestos;
  }

  prepareInvoiceImpuestos(conceptos: InvoiceConceptoModel[]): InvoiceImpuestosModel {
    const impuesto = new InvoiceImpuestosModel();

    const iva: { [key: string]: number } = {};
    const ieps: { [key: string]: number } = {};
    const retIeps: { [key: string]: number } = {};
    const retIva: { [key: string]: number } = {};
    const retIsr: { [key: string]: number } = {};

    const sumToObject = (array: { [key: string]: number }, index: string, value: number) => {
      if (array[index] === undefined) {
        array[index] = 0;
      }
      array[index] += value;
    };

    conceptos.map(c => {
      c.Impuestos.map(i => {
        i.Traslados.map(t => {
          if (t.Impuesto === InvoiceCatImpuesto.IVA && t.TipoFactor !== InvoiceCatTipoFactor.Exento) {
            sumToObject(iva, String(t.TasaOCuota), t.Importe);
          }

          if (t.Impuesto === InvoiceCatImpuesto.IEPS) {
            sumToObject(ieps, String(t.TasaOCuota), t.Importe);
          }
        });

        i.Retenciones.map(r => {
          if (r.Impuesto === InvoiceCatImpuesto.IEPS) {
            sumToObject(retIeps, String(r.TasaOCuota), r.Importe);
          }

          if (r.Impuesto === InvoiceCatImpuesto.IVA) {
            sumToObject(retIva, String(r.TasaOCuota), r.Importe);
          }

          if (r.Impuesto === InvoiceCatImpuesto.ISR) {
            sumToObject(retIsr, String(r.TasaOCuota), r.Importe);
          }
        });
      });
    });

    impuesto.Traslados = [];

    Object.keys(iva).map(index => {
      impuesto.Traslados.push(Object.assign(new InvoiceImpuestosTrasladoModel(), {
        id: 0,
        invoiceImpuestoId: impuesto.id,
        Impuesto: InvoiceCatImpuesto.IVA,
        TipoFactor: InvoiceCatTipoFactor.Tasa,
        TasaOCuota: index,
        Importe: iva[index],
      }));
    });

    Object.keys(ieps).map(index => {
      impuesto.Traslados.push(Object.assign(new InvoiceImpuestosTrasladoModel(), {
        id: 0,
        invoiceImpuestoId: impuesto.id,
        Impuesto: InvoiceCatImpuesto.IEPS,
        TipoFactor: InvoiceCatTipoFactor.Tasa,
        TasaOCuota: index,
        Importe: ieps[index],
      }));
    });

    impuesto.Retenciones = [];

    Object.keys(retIeps).map(index => {
      impuesto.Retenciones.push(Object.assign(new InvoiceImpuestosRetencionModel(), {
        id: 0,
        invoiceImpuestoId: impuesto.id,
        Impuesto: InvoiceCatImpuesto.IEPS,
        TipoFactor: InvoiceCatTipoFactor.Tasa,
        TasaOCuota: index,
        Importe: retIeps[index],
      }));
    });

    Object.keys(retIva).map(index => {
      impuesto.Retenciones.push(Object.assign(new InvoiceImpuestosRetencionModel(), {
        id: 0,
        invoiceImpuestoId: impuesto.id,
        Impuesto: InvoiceCatImpuesto.IVA,
        TipoFactor: InvoiceCatTipoFactor.Tasa,
        TasaOCuota: index,
        Importe: retIva[index],
      }));
    });

    Object.keys(retIsr).map(index => {
      impuesto.Retenciones.push(Object.assign(new InvoiceImpuestosRetencionModel(), {
        id: 0,
        invoiceImpuestoId: impuesto.id,
        Impuesto: InvoiceCatImpuesto.ISR,
        TipoFactor: InvoiceCatTipoFactor.Tasa,
        TasaOCuota: index,
        Importe: retIsr[index],
      }));
    });

    impuesto.TotalImpuestosTrasladados =
      Object.keys(iva).reduce((sum, index) => sum + iva[index], 0) +
      Object.keys(ieps).reduce((sum, index) => sum + ieps[index], 0);

    impuesto.TotalImpuestosRetenidos =
      Object.keys(retIeps).reduce((sum, index) => sum + retIeps[index], 0) +
      Object.keys(retIva).reduce((sum, index) => sum + retIva[index], 0) +
      Object.keys(retIsr).reduce((sum, index) => sum + retIsr[index], 0);

    return impuesto;
  }

  prepareInvoiceComplementos(complementosForm: FormGroup) {
    const invoiceComplementos = new InvoiceComplementosModel();
    invoiceComplementos.ComplementoPagos = this.prepareInvoiceComplementoPagos(complementosForm.get('ComplementoPagos') as FormGroup);
    invoiceComplementos.ImpuestosLocales = this.complementos.ImpuestosLocales;
    invoiceComplementos.Detallista = this.complementos.Detallista;
    invoiceComplementos.INE = this.complementos.INE;
    invoiceComplementos.Donatarias = this.prepareDonat(complementosForm.get('Donatarias') as FormGroup);
    invoiceComplementos.TuristaPasajeroExtranjero = this.complementos.TuristaPasajeroExtranjero;
    return invoiceComplementos;
  }

  prepareInvoiceAddendas(addendasForm: FormGroup): InvoiceAddendasModel {
    const invoiceAddendas = new InvoiceAddendasModel();
    invoiceAddendas.KN = this.addendas.KN;
    invoiceAddendas.VWM = this.addendas.VWM;
    invoiceAddendas.BuzonFiscal = this.addendas.BuzonFiscal;
    invoiceAddendas.DGari = this.addendas.DGari;
    return invoiceAddendas;
  }

  prepareInvoiceComplementoPagos(complementoPagosForm: FormGroup): InvoiceComplementoPagosModel {

    if (!complementoPagosForm || !complementoPagosForm.value) {
      return null;
    }

    return Object.assign(new InvoiceComplementoPagosModel(), {
      Version: '1.0',
      Pagos:
        (complementoPagosForm.get('Pagos') as FormArray).controls
          .map((c: FormGroup) => this.prepareInvoiceComplementoPago(c)),
    });
  }

  prepareInvoiceComplementoPago(complementoPagoForm: FormGroup): InvoiceComplementoPagoModel {
    return Object.assign(new InvoiceComplementoPagoModel(), {
      id: complementoPagoForm.get('id').value,
      invoiceId: complementoPagoForm.get('invoiceId').value,
      FechaPago: complementoPagoForm.get('FechaPago').value,
      FormaDePagoP: complementoPagoForm.get('FormaDePagoP').value,
      MonedaP: complementoPagoForm.get('MonedaP').value,
      TipoCambioP: complementoPagoForm.get('TipoCambioP').value,
      Monto: complementoPagoForm.get('Monto').value,
      NumOperacion: complementoPagoForm.get('NumOperacion').value,
      RfcEmisorCtaOrd: complementoPagoForm.get('RfcEmisorCtaOrd').value,
      NomBancoOrdExt: complementoPagoForm.get('NomBancoOrdExt').value,
      CtaOrdenante: complementoPagoForm.get('CtaOrdenante').value,
      RfcEmisorCtaBen: complementoPagoForm.get('RfcEmisorCtaBen').value,
      CtaBeneficiario: complementoPagoForm.get('CtaBeneficiario').value,
      TipoCadPago: complementoPagoForm.get('TipoCadPago').value,
      CertPago: complementoPagoForm.get('CertPago').value,
      CadPago: complementoPagoForm.get('CadPago').value,
      SelloPago: complementoPagoForm.get('SelloPago').value,
      DoctoRelacionados:
        (complementoPagoForm.get('DoctoRelacionados') as FormArray).controls
          .map((c: FormGroup) => this.prepareInvoiceComplementoPagoDoctoRelacionado(c)),
      // Impuestos: (complementoPagoForm.get('Impuestos') as FormArray).controls
      //   .map((c: FormGroup) => this.prepareInvoiceImpuestos(c)),
    });
  }

  prepareInvoiceComplementoPagoDoctoRelacionado(doctoRelacionadoForm: FormGroup): InvoiceComplementoPagoDoctoRelacionadoModel {
    return Object.assign(new InvoiceComplementoPagoDoctoRelacionadoModel(), {
      id: doctoRelacionadoForm.get('id').value,
      invoicePagoId: doctoRelacionadoForm.get('invoicePagoId').value,
      IdDocumento: doctoRelacionadoForm.get('IdDocumento').value,
      Serie: doctoRelacionadoForm.get('Serie').value,
      Folio: doctoRelacionadoForm.get('Folio').value,
      MonedaDR: doctoRelacionadoForm.get('MonedaDR').value,
      TipoCambioDR: doctoRelacionadoForm.get('TipoCambioDR').value,
      MetodoDePagoDR: doctoRelacionadoForm.get('MetodoDePagoDR').value,
      NumParcialidad: doctoRelacionadoForm.get('NumParcialidad').value,
      ImpSaldoAnt: doctoRelacionadoForm.get('ImpSaldoAnt').value,
      ImpPagado: doctoRelacionadoForm.get('ImpPagado').value,
      ImpSaldoInsoluto: doctoRelacionadoForm.get('ImpSaldoInsoluto').value,
    });
  }

  prepareInvoiceConcepto(conceptoForm: FormGroup): InvoiceConceptoModel {
    const descripcionAutocomplete = conceptoForm.get('DescripcionAutocomplete').value as InvoiceSenderProductModel;
    const claveProdServAutocomplete = conceptoForm.get('ClaveProdServAutocomplete').value as InvoiceCatClaveProdServModel;
    const claveUnidadAutocomplete = conceptoForm.get('ClaveUnidadAutocomplete').value as InvoiceCatClaveUnidadModel;

    const invoiceConcepto = new InvoiceConceptoModel();
    invoiceConcepto.id = conceptoForm.get('id').value;
    invoiceConcepto.invoiceId = conceptoForm.get('invoiceId').value;
    invoiceConcepto.ClaveProdServ = claveProdServAutocomplete.Clave;
    invoiceConcepto.NoIdentificacion = conceptoForm.get('NoIdentificacion').value;
    invoiceConcepto.Cantidad = conceptoForm.get('Cantidad').value;
    invoiceConcepto.ClaveUnidad = claveUnidadAutocomplete.Clave;
    invoiceConcepto.Unidad = conceptoForm.get('Unidad').value;
    invoiceConcepto.Descripcion = descripcionAutocomplete.Description;
    invoiceConcepto.ValorUnitario = conceptoForm.get('ValorUnitario').value;
    invoiceConcepto.Importe = conceptoForm.get('Importe').value;
    invoiceConcepto.Descuento = conceptoForm.get('Descuento').value;

    invoiceConcepto.Impuestos = [
      this.prepareInvoiceConceptoImpuestos(conceptoForm.get('ImpuestosFixed') as FormGroup, invoiceConcepto)
    ];
    // invoiceConcepto.cuentaPredial = this.prepareInvoiceConceptoCuentaPredial();
    // invoiceConcepto.informacionAduanera = this.prepareInvoiceConceptoInformacionAduanera();
    // invoiceConcepto.complementoConcepto = this.prepareInvoiceConceptoComplementoConcepto();
    // invoiceConcepto.parte = this.prepareInvoiceConceptoParte();

    return invoiceConcepto;
  }

  prepareDonat(donatForm: FormGroup): InvoiceComplementoDonatariasModel {

    if (!donatForm || !donatForm.value) {
      return null;
    }

    const donat: InvoiceComplementoDonatariasModel = new InvoiceComplementoDonatariasModel();
    donat.version = donatForm.get('version').value;
    donat.noAutorizacion = donatForm.get('noAutorizacion').value;
    donat.fechaAutorizacion = donatForm.get('fechaAutorizacion').value;
    donat.leyenda = donatForm.get('leyenda').value;
    return donat;
  }

}

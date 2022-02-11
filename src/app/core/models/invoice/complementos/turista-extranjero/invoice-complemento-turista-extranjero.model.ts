import { BaseModel } from '@crud';
import { TuristaExtranjeroDatosTransito } from './turista-extranjero-datos-transito.model';

export class InvoiceComplementoTuristaExtranjero extends BaseModel {
  version: '1.0';
  fechadeTransito: Date;
  tipoTransito: 'Arribo' | 'Salida';
  datosTransito: TuristaExtranjeroDatosTransito;

  clear() {
    this.version = '1.0';
    this.fechadeTransito = null;
    this.tipoTransito = null;
    this.datosTransito = null;
  }

  baseData() {
    this.fechadeTransito = new Date();
    this.tipoTransito = 'Salida';
    this.datosTransito = new TuristaExtranjeroDatosTransito(true);
  }
}

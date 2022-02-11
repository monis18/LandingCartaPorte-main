import { BaseModel } from '@crud';

export class VWMMedidas extends BaseModel {
  pesoBruto: string;
  pesoNeto: string;
  volumen: string;
  numeroPiezas: string;
  descripcion: string;
}

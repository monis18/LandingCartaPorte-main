import { BaseModel } from '@crud';

export class VWMArchivo extends BaseModel {
  datos: string;
  tipo: string;
  file?: File;
}

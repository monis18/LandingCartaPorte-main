import { INEAmbito, INEClaveEntidad } from '@enums/ine.enums';
import { INEContabilidad } from './ine-contabilidad.model';

export class INEEntidad {
  ClaveEntidad: INEClaveEntidad;
  Ambito: INEAmbito;
  Contabilidad: INEContabilidad;
}

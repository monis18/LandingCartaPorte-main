import { BaseModel } from '@crud';
import { SpecialInstructionCode } from '@enums/detallista.enums';

export class DetallistaSpecialInstruction extends BaseModel {
  code: SpecialInstructionCode;
  text: string;

  baseData() {
    this.code = SpecialInstructionCode.AAB;
    this.text = null;
  }
}

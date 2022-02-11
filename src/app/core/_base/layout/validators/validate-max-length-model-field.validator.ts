import { AbstractControl } from '@angular/forms';

export const validateMaxLengthModelField = (field: string, maxLength: number) => {
  return (control: AbstractControl): { [key: string]: any } => {
    return !!control.value && control.value[field] !== undefined && control.value[field] && control.value[field].length <= maxLength
      ? null : { modelId: true };
  };
};

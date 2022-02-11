import { AbstractControl } from '@angular/forms';

export const validateRequiredModelId = () => {
  return (control: AbstractControl): { [key: string]: any } => {
    return !!control.value && control.value.id !== undefined && control.value.id > 0 ? null : { modelId: true };
  };
};

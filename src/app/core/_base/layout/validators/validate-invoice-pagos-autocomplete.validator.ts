import { FormArray, FormControl, FormGroup } from '@angular/forms';

export const validateInvoicePagosAutocomplete = () => {

  let thisControl: FormControl;
  let formPagos: FormArray;

  return (control: FormControl) => {

    if (!control.parent) {
      return null;
    }

    if (!thisControl) {
      thisControl = control;
      formPagos = control.parent.get('Pagos') as FormArray;
      if (!formPagos) {
        throw new Error('matchOtherValidator(): other control is not found in parent group');
      }
    }

    if (!formPagos) {
      return null;
    }

    const allPagosHaveDoctoRelacionados = formPagos.controls.every((p: FormGroup) => (p.get('DoctoRelacionados') as FormArray).length > 0);
    if (!allPagosHaveDoctoRelacionados || formPagos.length === 0) {
      return { requireToHaveDoctoRelacionados: true };
    }

    return null;

  };

};

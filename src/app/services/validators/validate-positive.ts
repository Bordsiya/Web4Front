import { AbstractControl } from '@angular/forms';

export function ValidatePositive(control: AbstractControl) {
    for(let i in control.value) {
        if (control.value[i] <= 0) {
            return {invalidSelection: true};
        }
    }
    return null;
}
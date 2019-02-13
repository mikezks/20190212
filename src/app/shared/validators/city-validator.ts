import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cityValidator(c: AbstractControl): ValidationErrors | undefined {
    const validCities = [
        'Graz',
        'Hamburg',
        'Wien',
        'Berlin'
    ];

    if (c.value && validCities.indexOf(c.value) === -1) {
        return {
            city: {
                actualValue: c.value,
                allowedValues: validCities
            }
        };
    }
    
    return undefined;
}

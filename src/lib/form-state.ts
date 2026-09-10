/** Sunucu eylemlerinin döndürdüğü doğrulama hatası durumu (Laravel $errors karşılığı). */
export type FormState = { errors: string[] };

export const EMPTY_FORM_STATE: FormState = { errors: [] };

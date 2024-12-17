import { PersonType } from './PersonType';
import { Locale } from './Locale';

export type PersonTypeLocale = {
  type_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  person_type?: PersonType;
  locale?: Locale;
}
import { PersonTypeLocale } from './PersonTypeLocale'
import { Translation } from './Translation'
import { FileProviderLocale } from './FileProviderLocale'
import { ScreenLocale } from './ScreenLocale'
import { CountryLocale } from './CountryLocale'
import { SettingLocale } from './SettingLocale'
import { RoleLocale } from './RoleLocale'
import { MultifactorLocale } from './MultifactorLocale'
import { MenuLocale } from './MenuLocale'
import { SettingGroupLocale } from './SettingGroupLocale'
import { PersonDocumentTypeLocale } from './PersonDocumentTypeLocale'
import { PersonContactTypeLocale } from './PersonContactTypeLocale'
import { PersonAddressTypeLocale } from './PersonAddressTypeLocale'
import { PersonCustomTypeLocale } from './PersonCustomTypeLocale'
import { PersonCustomLocale } from './PersonCustomLocale'
import { FaqLocale } from './FaqLocale'
import { PaymentStatusLocale } from './PaymentStatusLocale'
import { SubscriptionPlanLocale } from './SubscriptionPlanLocale'
import { SubscriptionCancelReasonLocale } from './SubscriptionCancelReasonLocale'

export type Locale = {
  id?: number
  code: string
  region: string
  enabled?: boolean
  created_at?: string
  updated_at?: string
  person_type_locale?: PersonTypeLocale[]
  translation?: Translation[]
  file_provider_locale?: FileProviderLocale[]
  screen_locale?: ScreenLocale[]
  country_locale?: CountryLocale[]
  setting_locale?: SettingLocale[]
  role_locale?: RoleLocale[]
  multifactor_locale?: MultifactorLocale[]
  menu_locale?: MenuLocale[]
  setting_group_locale?: SettingGroupLocale[]
  person_document_type_locale?: PersonDocumentTypeLocale[]
  person_contact_type_locale?: PersonContactTypeLocale[]
  person_address_type_locale?: PersonAddressTypeLocale[]
  person_custom_type_locale?: PersonCustomTypeLocale[]
  person_custom_locale?: PersonCustomLocale[]
  faq_locale?: FaqLocale[]
  payment_status_locale?: PaymentStatusLocale[]
  subscription_plan_locale?: SubscriptionPlanLocale[]
  subscription_cancel_reason_locale?: SubscriptionCancelReasonLocale[]
}

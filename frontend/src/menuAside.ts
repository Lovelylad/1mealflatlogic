import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces';

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ? icon.mdiAccountGroup : icon.mdiTable,
    permissions: 'READ_USERS',
  },
  {
    href: '/appointments/appointments-list',
    label: 'Appointments',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiCalendar ? icon.mdiCalendar : icon.mdiTable,
    permissions: 'READ_APPOINTMENTS',
  },
  {
    href: '/clients/clients-list',
    label: 'Clients',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccount ? icon.mdiAccount : icon.mdiTable,
    permissions: 'READ_CLIENTS',
  },
  {
    href: '/courses/courses-list',
    label: 'Courses',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiSchool ? icon.mdiSchool : icon.mdiTable,
    permissions: 'READ_COURSES',
  },
  {
    href: '/ebooks/ebooks-list',
    label: 'Ebooks',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiBook ? icon.mdiBook : icon.mdiTable,
    permissions: 'READ_EBOOKS',
  },
  {
    href: '/meal_plans/meal_plans-list',
    label: 'Meal plans',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiFood ? icon.mdiFood : icon.mdiTable,
    permissions: 'READ_MEAL_PLANS',
  },
  {
    href: '/nutritionists/nutritionists-list',
    label: 'Nutritionists',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccount ? icon.mdiAccount : icon.mdiTable,
    permissions: 'READ_NUTRITIONISTS',
  },
  {
    href: '/patient_records/patient_records-list',
    label: 'Patient records',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiFileDocument ? icon.mdiFileDocument : icon.mdiTable,
    permissions: 'READ_PATIENT_RECORDS',
  },
  {
    href: '/programs/programs-list',
    label: 'Programs',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiBookOpenPageVariant
      ? icon.mdiBookOpenPageVariant
      : icon.mdiTable,
    permissions: 'READ_PROGRAMS',
  },
  {
    href: '/recipes/recipes-list',
    label: 'Recipes',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiSilverwareForkKnife
      ? icon.mdiSilverwareForkKnife
      : icon.mdiTable,
    permissions: 'READ_RECIPES',
  },
  {
    href: '/diet_restrictions/diet_restrictions-list',
    label: 'Diet restrictions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_DIET_RESTRICTIONS',
  },
  {
    href: '/roles/roles-list',
    label: 'Roles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountVariantOutline
      ? icon.mdiShieldAccountVariantOutline
      : icon.mdiTable,
    permissions: 'READ_ROLES',
  },
  {
    href: '/permissions/permissions-list',
    label: 'Permissions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountOutline
      ? icon.mdiShieldAccountOutline
      : icon.mdiTable,
    permissions: 'READ_PERMISSIONS',
  },
  {
    href: '/companies/companies-list',
    label: 'Companies',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTable ? icon.mdiTable : icon.mdiTable,
    permissions: 'READ_COMPANIES',
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },
  {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS',
  },
];

export default menuAside;

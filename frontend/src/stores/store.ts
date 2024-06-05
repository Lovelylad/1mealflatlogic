import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import appointmentsSlice from './appointments/appointmentsSlice';
import clientsSlice from './clients/clientsSlice';
import coursesSlice from './courses/coursesSlice';
import ebooksSlice from './ebooks/ebooksSlice';
import meal_plansSlice from './meal_plans/meal_plansSlice';
import nutritionistsSlice from './nutritionists/nutritionistsSlice';
import patient_recordsSlice from './patient_records/patient_recordsSlice';
import programsSlice from './programs/programsSlice';
import recipesSlice from './recipes/recipesSlice';
import diet_restrictionsSlice from './diet_restrictions/diet_restrictionsSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';
import companiesSlice from './companies/companiesSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    appointments: appointmentsSlice,
    clients: clientsSlice,
    courses: coursesSlice,
    ebooks: ebooksSlice,
    meal_plans: meal_plansSlice,
    nutritionists: nutritionistsSlice,
    patient_records: patient_recordsSlice,
    programs: programsSlice,
    recipes: recipesSlice,
    diet_restrictions: diet_restrictionsSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
    companies: companiesSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

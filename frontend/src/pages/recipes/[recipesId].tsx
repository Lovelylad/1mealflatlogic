import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/recipes/recipesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditRecipes = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    title: '',

    ingredients: '',

    instructions: '',

    meal_plans: [],

    companie: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { recipes } = useAppSelector((state) => state.recipes);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { recipesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: recipesId }));
  }, [recipesId]);

  useEffect(() => {
    if (typeof recipes === 'object') {
      setInitialValues(recipes);
    }
  }, [recipes]);

  useEffect(() => {
    if (typeof recipes === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = recipes[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [recipes]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: recipesId, data }));
    await router.push('/recipes/recipes-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit recipes')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit recipes'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Title'>
                <Field name='title' placeholder='Title' />
              </FormField>

              <FormField label='Ingredients' hasTextareaHeight>
                <Field
                  name='ingredients'
                  as='textarea'
                  placeholder='Ingredients'
                />
              </FormField>

              <FormField label='Instructions' hasTextareaHeight>
                <Field
                  name='instructions'
                  as='textarea'
                  placeholder='Instructions'
                />
              </FormField>

              <FormField label='MealPlans' labelFor='meal_plans'>
                <Field
                  name='meal_plans'
                  id='meal_plans'
                  component={SelectFieldMany}
                  options={initialValues.meal_plans}
                  itemRef={'meal_plans'}
                  showField={'title'}
                ></Field>
              </FormField>

              <FormField label='companie' labelFor='companie'>
                <Field
                  name='companie'
                  id='companie'
                  component={SelectField}
                  options={initialValues.companie}
                  itemRef={'companies'}
                  showField={'name'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/recipes/recipes-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditRecipes.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_RECIPES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditRecipes;

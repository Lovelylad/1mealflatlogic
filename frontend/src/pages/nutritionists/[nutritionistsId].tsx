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

import { update, fetch } from '../../stores/nutritionists/nutritionistsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditNutritionists = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    first_name: '',

    last_name: '',

    email: '',

    phone: '',

    user: '',

    companie: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { nutritionists } = useAppSelector((state) => state.nutritionists);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { nutritionistsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: nutritionistsId }));
  }, [nutritionistsId]);

  useEffect(() => {
    if (typeof nutritionists === 'object') {
      setInitialValues(nutritionists);
    }
  }, [nutritionists]);

  useEffect(() => {
    if (typeof nutritionists === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = nutritionists[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [nutritionists]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: nutritionistsId, data }));
    await router.push('/nutritionists/nutritionists-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit nutritionists')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit nutritionists'}
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
              <FormField label='FirstName'>
                <Field name='first_name' placeholder='FirstName' />
              </FormField>

              <FormField label='LastName'>
                <Field name='last_name' placeholder='LastName' />
              </FormField>

              <FormField label='Email'>
                <Field name='email' placeholder='Email' />
              </FormField>

              <FormField label='Phone'>
                <Field name='phone' placeholder='Phone' />
              </FormField>

              <FormField label='User' labelFor='user'>
                <Field
                  name='user'
                  id='user'
                  component={SelectField}
                  options={initialValues.user}
                  itemRef={'users'}
                  showField={'firstName'}
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
                  onClick={() =>
                    router.push('/nutritionists/nutritionists-list')
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditNutritionists.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_NUTRITIONISTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditNutritionists;

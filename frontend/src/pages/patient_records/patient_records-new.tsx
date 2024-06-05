import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
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
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/patient_records/patient_recordsSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  client: '',

  nutritionist: '',

  blood_work: '',

  supplements: '',

  weight: '',

  additional_info: '',

  companie: '',
};

const Patient_recordsNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/patient_records/patient_records-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Client' labelFor='client'>
                <Field
                  name='client'
                  id='client'
                  component={SelectField}
                  options={[]}
                  itemRef={'clients'}
                ></Field>
              </FormField>

              <FormField label='Nutritionist' labelFor='nutritionist'>
                <Field
                  name='nutritionist'
                  id='nutritionist'
                  component={SelectField}
                  options={[]}
                  itemRef={'nutritionists'}
                ></Field>
              </FormField>

              <FormField label='BloodWork' hasTextareaHeight>
                <Field
                  name='blood_work'
                  as='textarea'
                  placeholder='BloodWork'
                />
              </FormField>

              <FormField label='Supplements' hasTextareaHeight>
                <Field
                  name='supplements'
                  as='textarea'
                  placeholder='Supplements'
                />
              </FormField>

              <FormField label='Weight'>
                <Field type='number' name='weight' placeholder='Weight' />
              </FormField>

              <FormField label='AdditionalInformation' hasTextareaHeight>
                <Field
                  name='additional_info'
                  as='textarea'
                  placeholder='AdditionalInformation'
                />
              </FormField>

              <FormField label='companie' labelFor='companie'>
                <Field
                  name='companie'
                  id='companie'
                  component={SelectField}
                  options={[]}
                  itemRef={'companies'}
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
                    router.push('/patient_records/patient_records-list')
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

Patient_recordsNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_PATIENT_RECORDS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Patient_recordsNew;

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

import {
  update,
  fetch,
} from '../../stores/patient_records/patient_recordsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditPatient_records = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    client: '',

    nutritionist: '',

    blood_work: '',

    supplements: '',

    weight: '',

    additional_info: '',

    companie: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { patient_records } = useAppSelector((state) => state.patient_records);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { patient_recordsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: patient_recordsId }));
  }, [patient_recordsId]);

  useEffect(() => {
    if (typeof patient_records === 'object') {
      setInitialValues(patient_records);
    }
  }, [patient_records]);

  useEffect(() => {
    if (typeof patient_records === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = patient_records[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [patient_records]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: patient_recordsId, data }));
    await router.push('/patient_records/patient_records-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit patient_records')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit patient_records'}
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
              <FormField label='Client' labelFor='client'>
                <Field
                  name='client'
                  id='client'
                  component={SelectField}
                  options={initialValues.client}
                  itemRef={'clients'}
                  showField={'first_name'}
                ></Field>
              </FormField>

              <FormField label='Nutritionist' labelFor='nutritionist'>
                <Field
                  name='nutritionist'
                  id='nutritionist'
                  component={SelectField}
                  options={initialValues.nutritionist}
                  itemRef={'nutritionists'}
                  showField={'first_name'}
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

EditPatient_records.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_PATIENT_RECORDS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditPatient_records;

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
} from '../../stores/diet_restrictions/diet_restrictionsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditDiet_restrictions = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {};
  const [initialValues, setInitialValues] = useState(initVals);

  const { diet_restrictions } = useAppSelector(
    (state) => state.diet_restrictions,
  );

  const { currentUser } = useAppSelector((state) => state.auth);

  const { diet_restrictionsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: diet_restrictionsId }));
  }, [diet_restrictionsId]);

  useEffect(() => {
    if (typeof diet_restrictions === 'object') {
      setInitialValues(diet_restrictions);
    }
  }, [diet_restrictions]);

  useEffect(() => {
    if (typeof diet_restrictions === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = diet_restrictions[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [diet_restrictions]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: diet_restrictionsId, data }));
    await router.push('/diet_restrictions/diet_restrictions-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit diet_restrictions')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit diet_restrictions'}
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
                    router.push('/diet_restrictions/diet_restrictions-list')
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

EditDiet_restrictions.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_DIET_RESTRICTIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditDiet_restrictions;

import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/nutritionists/nutritionistsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

import { hasPermission } from '../../helpers/userPermissions';

const NutritionistsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { nutritionists } = useAppSelector((state) => state.nutritionists);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View nutritionists')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View nutritionists')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>FirstName</p>
            <p>{nutritionists?.first_name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>LastName</p>
            <p>{nutritionists?.last_name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Email</p>
            <p>{nutritionists?.email}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Phone</p>
            <p>{nutritionists?.phone}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>User</p>

            <p>{nutritionists?.user?.firstName ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>companie</p>

            <p>{nutritionists?.companie?.name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Appointments Nutritionist</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>AppointmentDate</th>

                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nutritionists.appointments_nutritionist &&
                      Array.isArray(nutritionists.appointments_nutritionist) &&
                      nutritionists.appointments_nutritionist.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/appointments/appointments-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='appointment_date'>
                              {dataFormatter.dateTimeFormatter(
                                item.appointment_date,
                              )}
                            </td>

                            <td data-label='notes'>{item.notes}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!nutritionists?.appointments_nutritionist?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Meal_plans Nutritionist</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>

                      <th>Description</th>

                      <th>StartDate</th>

                      <th>EndDate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nutritionists.meal_plans_nutritionist &&
                      Array.isArray(nutritionists.meal_plans_nutritionist) &&
                      nutritionists.meal_plans_nutritionist.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/meal_plans/meal_plans-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='title'>{item.title}</td>

                          <td data-label='description'>{item.description}</td>

                          <td data-label='start_date'>
                            {dataFormatter.dateTimeFormatter(item.start_date)}
                          </td>

                          <td data-label='end_date'>
                            {dataFormatter.dateTimeFormatter(item.end_date)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!nutritionists?.meal_plans_nutritionist?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Patient_records Nutritionist
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>BloodWork</th>

                      <th>Supplements</th>

                      <th>Weight</th>

                      <th>AdditionalInformation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nutritionists.patient_records_nutritionist &&
                      Array.isArray(
                        nutritionists.patient_records_nutritionist,
                      ) &&
                      nutritionists.patient_records_nutritionist.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/patient_records/patient_records-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='blood_work'>{item.blood_work}</td>

                            <td data-label='supplements'>{item.supplements}</td>

                            <td data-label='weight'>{item.weight}</td>

                            <td data-label='additional_info'>
                              {item.additional_info}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!nutritionists?.patient_records_nutritionist?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/nutritionists/nutritionists-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

NutritionistsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_NUTRITIONISTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default NutritionistsView;

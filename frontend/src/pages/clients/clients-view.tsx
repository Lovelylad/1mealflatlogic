import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/clients/clientsSlice';
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

const ClientsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { clients } = useAppSelector((state) => state.clients);

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
        <title>{getPageTitle('View clients')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View clients')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>FirstName</p>
            <p>{clients?.first_name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>LastName</p>
            <p>{clients?.last_name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Email</p>
            <p>{clients?.email}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Phone</p>
            <p>{clients?.phone}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>User</p>

            <p>{clients?.user?.firstName ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>companie</p>

            <p>{clients?.companie?.name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Appointments Client</p>
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
                    {clients.appointments_client &&
                      Array.isArray(clients.appointments_client) &&
                      clients.appointments_client.map((item: any) => (
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
                      ))}
                  </tbody>
                </table>
              </div>
              {!clients?.appointments_client?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Meal_plans Client</p>
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
                    {clients.meal_plans_client &&
                      Array.isArray(clients.meal_plans_client) &&
                      clients.meal_plans_client.map((item: any) => (
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
              {!clients?.meal_plans_client?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Patient_records Client</p>
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
                    {clients.patient_records_client &&
                      Array.isArray(clients.patient_records_client) &&
                      clients.patient_records_client.map((item: any) => (
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
                      ))}
                  </tbody>
                </table>
              </div>
              {!clients?.patient_records_client?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/clients/clients-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

ClientsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_CLIENTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default ClientsView;

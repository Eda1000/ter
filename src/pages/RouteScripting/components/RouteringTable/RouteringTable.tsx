import { Select } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Route,
  RouteItem,
  Truck,
  User,
} from '../../../../Interfaces/RouteScripitingInterface';
import api from '../../../../services/api';
import { color } from '../../../../utils/colors';
import { seladData } from '../../../../utils/seladData';

import {
  AddRoute,
  AvailableInvoicesEye,
  EyeIndicator,
  Table,
  TableContainer,
  Wrapper,
} from './_routeringTable';

interface TableProps {
  users?: User[];
  savedRoutes?: Route[];
  setSavedRoutes: Function;
  trucks?: Truck[];
  addNewRoute: Function;
  hideOrShowRoute: Function;
  hideRoute: Function;

  hideAvailableInvoices: boolean;
  toggleHideAvailableInvoices: () => void;
}

export const RouteringTable: React.FC<TableProps> = ({
  users,
  savedRoutes,
  setSavedRoutes,
  trucks,
  addNewRoute,
  hideOrShowRoute,
  hideRoute,
  hideAvailableInvoices,
  toggleHideAvailableInvoices,
}) => {
  const { Option } = Select;

  const [initialPos, setInitialPos] = useState(0);
  const [initialSize, setInitialSize] = useState(0);

  const calculatedAmounts = (routeItem: RouteItem[], truckInfo: Truck) => {
    const amounts = {
      weight: 0,
      cubage: 0,
      services: routeItem.length - 1,
      distance: '--',
      duration: '--',
      truckWeightPercentage: 0,
      truckCubagePercentage: 0,
    };

    routeItem.forEach(({ invoice }) => {
      const totalWeight = invoice?.weight
        ? amounts.weight + invoice?.weight
        : amounts.weight;

      const totalCubage = invoice.cubage
        ? amounts.cubage + Number(invoice.cubage)
        : amounts.cubage;

      amounts.weight = totalWeight;
      amounts.cubage = totalCubage;

      amounts.truckWeightPercentage = percentage(
        totalWeight,
        truckInfo.total_weight,
      );
      amounts.truckCubagePercentage = percentage(
        totalCubage,
        Number(truckInfo.capacity),
      );
    });

    return amounts;
  };

  const percentage = (partialValue: number, totalValue: number) => {
    if (totalValue === 0) {
      return 0;
    }
    return (100 * partialValue) / totalValue;
  };

  const renderTruckOptions = () => {
    return (
      trucks &&
      trucks.map((truck, index) => {
        return (
          <Option value={truck?.id} key={index}>
            {truck?.name} - {truck?.plate}
          </Option>
        );
      })
    );
  };

  const handleTruckSelection = (truckId: any, routeId: string) => {
    if (!trucks) {
      return;
    }

    const selectedTruck = trucks.find(({ id }) => id === truckId);
    if (!selectedTruck) {
      return;
    }

    setSavedRoutes(
      savedRoutes?.map((item) => {
        if (item.id === routeId) {
          return {
            ...item,
            truck: selectedTruck,
            truck_id: selectedTruck.id,
            driver_id: selectedTruck.user_id,
          };
        }
        return item;
      }),
    );
  };

  const driverName = (userId: string) => {
    if (!users) {
      return '--';
    }

    const user = users.find(({ id }) => id === userId);
    return user ? user?.individual_person?.name : '--';
  };

  const exceedCapacity = (capacity: any) => {
    if (Number(capacity) >= 100) {
      return 'exceeded_capacity';
    }
    return;
  };

  const handleReadyToLoad = async (id: string) => {
    try {
      await api.put(`/truck-routes/${id}/ready`);

      toast.info('Alteração confirmada!');

      setSavedRoutes((prevState: any) => {
        const newState = [...prevState];

        const truckRouteIndex = newState.findIndex((item) => item.id === id);

        if (truckRouteIndex >= 0) {
          newState[truckRouteIndex].is_ready = true;
        }

        return newState;
      });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Opps algo deu errado!');
    }
  };

  const renderRoutes = () => {
    return savedRoutes?.map(
      (
        { route_items, distance, time, color_indicator, truck, id, is_ready },
        index,
      ) => {
        const amounts = calculatedAmounts(route_items, truck);
        const distanceToMetric = (distance / 1000).toFixed(2) || 0;

        return (
          <tr key={index}>
            <EyeIndicator
              color={color_indicator || '#fff'}
              visible={hideRoute(id)}
              onClick={() => hideOrShowRoute(id)}
            >
              <div className="eye"></div>
            </EyeIndicator>

            <td data-label="Veículo">
              <Select
                className="vehicle-select"
                bordered={false}
                onChange={(e) => handleTruckSelection(e, id)}
                defaultValue={truck.id}
                placeholder={'Caminhão'}
              >
                {renderTruckOptions()}
              </Select>
            </td>

            <td data-label="Motorista">
              <div className="table__driver-name">
                {driverName(truck.user_id)}
              </div>
            </td>

            <td data-label="Tempo(h)">{minutesToHours(Number(time))}</td>

            <td data-label="Peso" className="table__amounts">
              {amounts?.weight.toFixed(2)}

              <br />

              <div
                className={exceedCapacity(
                  amounts?.truckWeightPercentage.toFixed(2),
                )}
              >
                ({amounts?.truckWeightPercentage.toFixed(2)}%)
              </div>
            </td>

            <td data-label="Volume(m³)" className="table__amounts">
              {amounts.cubage.toFixed(2)}

              <br />

              <div
                className={exceedCapacity(
                  amounts?.truckCubagePercentage.toFixed(2),
                )}
              >
                ({amounts?.truckCubagePercentage.toFixed(2)}%)
              </div>
            </td>

            <td data-label="Distância (Km)">{distanceToMetric}</td>

            <td data-label="Serviços">
              <span>{amounts.services}</span>
            </td>

            {!is_ready && id && !id.includes(' ') && (
              <td data-label="Pronto para carregar" className="table__amounts">
                <AddRoute
                  className="button-span"
                  onClick={() => handleReadyToLoad(id)}
                >
                  <span className="button-span">Confirmar</span>
                </AddRoute>
              </td>
            )}
          </tr>
        );
      },
    );
  };

  const minutesToHours = (time: number) => {
    let h = Math.floor(time / 3600);
    let m = Math.floor((time % 3600) / 60);

    let hour = h + 'h';
    let minute = m + 'm';
    return time ? hour + minute : '--';
  };

  const initial = (e: React.MouseEvent) => {
    let resizable = document.getElementById('w-resizable');

    if (resizable) {
      setInitialPos(e.clientX);
      setInitialSize(resizable.offsetWidth);
    }
  };

  const resize = (e: React.MouseEvent) => {
    let resizable = document.getElementById('w-resizable');

    if (resizable) {
      resizable.style.width = `${
        Number(initialSize) + Number(e.clientX - initialPos)
      }px`;
    }
  };

  const addRoute = () => {
    const initialPoint = { ...seladData };
    initialPoint.id = `starting point ${String(savedRoutes?.length) || 0}`;

    const finalPoint = { ...seladData };
    finalPoint.id = `final point ${String(savedRoutes?.length) || 0}`;

    const route = {
      id: `new-route ${savedRoutes?.length || 0}`,
      truck_id: '',
      driver_id: null,
      comments: 'selad',
      is_finished: false,
      cubage: '--',
      distance: 0,
      time: '--',
      weight: '--',
      color_indicator: color(savedRoutes?.length || 0),
      directionsInstance: undefined,
      truck: {
        id: '',
        name: '',
        plate: '',
        capacity: '',
        total_weight: 0,
        user_id: '',
      },
      route_items: [initialPoint, finalPoint],
      created_at: new Date().toISOString(),
      reorder: false,
    };

    addNewRoute(route);
  };

  return (
    <Wrapper className="wrapper">
      <div className="wrapper__column">
        <TableContainer className="table-container" id="w-resizable">
          <Table className="table">
            <thead>
              <tr>
                <th
                  style={{
                    position: 'relative',
                  }}
                >
                  Rota
                  <AvailableInvoicesEye
                    color="gray"
                    visible={hideAvailableInvoices}
                    onClick={toggleHideAvailableInvoices}
                  >
                    <div className="eye"></div>
                  </AvailableInvoicesEye>
                </th>
                <th>Veículo</th>
                <th>Motorista</th>
                <th>
                  Tempo(h) <br />
                </th>
                <th>
                  Peso(kg) <br />
                </th>
                <th>
                  Volume(m³) <br />
                </th>

                <th>
                  Distância (Km) <br />
                </th>

                <th>
                  Serviços
                  <br />
                </th>

                <th>
                  Pronto para carregar <br />
                </th>
              </tr>
            </thead>
            <tbody>{renderRoutes()}</tbody>
          </Table>
        </TableContainer>

        <div className="table-container__add-route-row">
          <AddRoute onClick={() => addRoute()}>
            <span>Adicionar nova rota</span>
          </AddRoute>
        </div>
      </div>

      <div
        className="table-container__resizer-indicator"
        draggable="true"
        onDragStart={initial}
        onDrag={resize}
      />
    </Wrapper>
  );
};

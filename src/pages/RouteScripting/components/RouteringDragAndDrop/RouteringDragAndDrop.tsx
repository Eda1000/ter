import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import api from '../../../../services/api';

import {
  Invoice,
  Route,
  RouteItem,
} from '../../../../Interfaces/RouteScripitingInterface';

import { color } from '../../../../utils/colors';
import { seladData } from '../../../../utils/seladData';

import seladHorse from '../../../../assets/map/seladHorse.png';

import {
  AvailableRoutes,
  ButtonContainer,
  Container,
  RouteSequence,
  SaveRoutesButton,
  SequenceWrapper,
  SwitchContainer,
} from './_routeringDragAndDrop';
import { toast } from 'react-toastify';

interface Props {
  availableInvoices: Invoice[];
  setAvailableInvoices: Function;
  savedRoutes?: Route[];
  setSavedRoutes: Function;
  setOriginRouteId: Function;
  setDestinationRouteId: Function;
  setTriggerRouteChanges: Function;
  triggerRouteChanges: boolean;
  showInvoiceInfo: string;
  setShowInvoiceInfo: Function;
  handleChanges: Function;
  loading: boolean;
  destinationRouteId?: string;
  setCurrentRouteDrawing: Function;
  routesToChange: Function;
}

export const RouteringDragAndDrop = ({
  availableInvoices,
  setAvailableInvoices,
  savedRoutes,
  setSavedRoutes,
  setOriginRouteId,
  setDestinationRouteId,
  setTriggerRouteChanges,
  triggerRouteChanges,
  showInvoiceInfo,
  setShowInvoiceInfo,
  handleChanges,
  loading,
  destinationRouteId,
  setCurrentRouteDrawing,
  routesToChange,
}: Props) => {
  const handleClick = (id: string) => {
    showInvoiceInfo !== '' ? setShowInvoiceInfo('') : setShowInvoiceInfo(id);
  };

  const handleReorderChange = async (id: string) => {
    try {
      // Só atualiza se a rota já estiver cadastrada
      if (!id.includes('new-route')) {
        await api.put(`/truck-routes/${id}/active-reorder`);
        toast.success('Sequência bloqueada atualizada com sucesso');
      }

      setSavedRoutes((prev: Route[]) =>
        prev.map((route) =>
          route.id === id ? { ...route, reorder: !route.reorder } : route,
        ),
      );
    } catch (error: any) {
      console.log(error?.response?.data?.message);
    }
  };

  const renderAvailablePoints = () => {
    return availableInvoices.map(({ id, identifier }, index) => {
      return (
        <Draggable draggableId={id} key={id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div className="point" onClick={() => handleClick(id)}>
                {identifier}
              </div>
            </div>
          )}
        </Draggable>
      );
    });
  };

  const renderRouteSequences = () => {
    return savedRoutes?.map(({ id, route_items, reorder }, index) => {
      return (
        <SequenceWrapper className="sequence" key={id}>
          <RouteSequence color={color(index)}>
            <Droppable droppableId={id} direction="horizontal">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {renderRoutePoints(route_items)}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </RouteSequence>
          <SwitchContainer color={color(index)}>
            <label className="switch__label">
              <span>Sequência bloqueada</span>
              <input
                className="switch__input"
                type="checkbox"
                defaultChecked={!reorder}
                onChange={() => handleReorderChange(id)}
              />
            </label>

            <div
              className="switch__button"
              onClick={() => setCurrentRouteDrawing(id)}
            >
              Desenhar
            </div>
          </SwitchContainer>
        </SequenceWrapper>
      );
    });
  };

  const renderRoutePoints = (points: RouteItem[]) => {
    return points.map(({ invoice, identifier, id }, index, invoices) => {
      const isNewRouteSeladPoint = invoice?.id === seladData.invoice.id;
      const isSeladPoint = !invoice?.id || isNewRouteSeladPoint;

      if (isSeladPoint) {
        return (
          <div key={seladData.invoice.id + String(index)}>
            <div
              className="point starting-point"
              onClick={() => handleClick(seladData.invoice.id)}
            >
              <img src={seladHorse} alt="ícone Selad" />
            </div>
          </div>
        );
      }
      return (
        <Draggable draggableId={id} key={id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div className="point" onClick={() => handleClick(invoice.id)}>
                {identifier}
              </div>
            </div>
          )}
        </Draggable>
      );
    });
  };

  const handleOnDragEnd = async (result: any) => {
    const { source, destination } = result;

    // if (!result.destination) return;

    // const items = Array.from(characters);
    // const [reorderedItem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, reorderedItem);

    // updateCharacters(items);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    setOriginRouteId(source.droppableId);
    setDestinationRouteId(destination.droppableId);

    if (source.droppableId === destination.droppableId) {
      source.droppableId === 'available-points'
        ? reorderAvailablePoints(result)
        : reorderRoutePoints(result);
    }

    if (source.droppableId !== destination.droppableId) {
      source.droppableId === 'available-points'
        ? moveFromAvailablePoints(result)
        : moveFromRoutePoints(result);
    }
  };

  const reorderAvailablePoints = (result: any) => {
    const { source, destination, draggableId } = result;

    const newOrder = Array.from(availableInvoices);
    const point = newOrder.find((point) => point.id === draggableId);

    newOrder.splice(source.index, 1);
    point && newOrder.splice(destination.index, 0, point);

    setAvailableInvoices(newOrder);
  };

  const reorderRoutePoints = (result: any) => {
    if (!savedRoutes) return;

    const { source, destination, draggableId } = result;

    const localRoutes = Array.from(savedRoutes);

    const choosenRoute = localRoutes.find(
      (route) => String(route.id) === source.droppableId,
    );

    const editingRoute = choosenRoute && Array.from(choosenRoute?.route_items);

    if (editingRoute) {
      const pointToMove = editingRoute.find(
        (point) => point.id === draggableId,
      );
      editingRoute.splice(source.index, 1);
      pointToMove && editingRoute.splice(destination.index, 0, pointToMove);

      setSavedRoutes(
        savedRoutes.map((item) =>
          item.id === source.droppableId
            ? { ...item, route_items: editingRoute }
            : item,
        ),
      );
    }
  };

  const moveFromAvailablePoints = (result: any) => {
    const { source, destination, draggableId } = result;

    const pointToMove = availableInvoices.find(
      (point) => point.id === draggableId,
    );

    if (pointToMove) {
      const { id, identifier, latitude, longitude } = pointToMove;

      const routeItem = {
        id,
        identifier,
        latitude,
        longitude,
        delivery_time: '',
        delivery_order: 0,
        arrival_place: false,
        start_discharge: false,
        end_discharge: false,
        truck_route_id: '',
        invoice_id: '',
        created_at: '',
        updated_at: '',
        invoice: pointToMove,
      };
      addPointToRoute(destination, routeItem);
    }

    const sourceArray = Array.from(availableInvoices);
    sourceArray.splice(source.index, 1);
    setAvailableInvoices(sourceArray);
  };

  const moveFromRoutePoints = (result: any) => {
    if (!savedRoutes) return;
    const { source, destination, draggableId } = result;

    const sourceArray = Array.from(savedRoutes);
    const routeArray = sourceArray.find(
      (route) => route.id === source.droppableId,
    );

    const pointToMove = routeArray?.route_items.find(
      (point) => point.id === draggableId,
    );

    routeArray?.route_items.splice(source.index, 1);

    if (pointToMove) {
      destination.droppableId === 'available-points'
        ? addPointToAvailablePoint(destination, pointToMove.invoice)
        : addPointToRoute(destination, pointToMove);
    }
  };

  const addPointToRoute = async (destination: any, pointToMove: RouteItem) => {
    if (!savedRoutes) return;

    const destinationClone = Array.from(savedRoutes);
    const destinationArray = await destinationClone.find(
      (route) => route.id === destination.droppableId,
    );

    const reorderArray = destinationArray?.route_items;

    if (reorderArray?.length === 2) {
      reorderArray?.splice(1, 0, pointToMove);
    } else {
      reorderArray?.splice(destination.index, 0, pointToMove);
    }

    const updatedSavedRoutes = await destinationClone.map((item) =>
      item.id === destination.droppableId
        ? { ...item, route_items: reorderArray }
        : item,
    );

    updatedSavedRoutes && setSavedRoutes(updatedSavedRoutes);
    setTriggerRouteChanges(!triggerRouteChanges);
  };

  const addPointToAvailablePoint = (destination: any, pointToMove: Invoice) => {
    const availableCollection = Array.from(availableInvoices);

    availableCollection.splice(destination.index, 0, pointToMove);

    setAvailableInvoices(availableCollection);
    setTriggerRouteChanges(!triggerRouteChanges);
  };

  const disabled = () => {
    if (!savedRoutes || loading || !destinationRouteId) return true;

    const hasInformation = !savedRoutes.every(({ truck_id }) => {
      return truck_id;
    });

    return hasInformation;
  };

  return (
    <Container className="routering-dragger">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <AvailableRoutes>
          <Droppable droppableId="available-points" direction="horizontal">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {renderAvailablePoints()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </AvailableRoutes>

        {renderRouteSequences()}
      </DragDropContext>

      <ButtonContainer>
        <SaveRoutesButton disabled={disabled()} onClick={() => handleChanges()}>
          <span>Salvar alterações</span>
        </SaveRoutesButton>
      </ButtonContainer>
    </Container>
  );
};

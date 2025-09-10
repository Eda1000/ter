import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DrawingManager,
} from '@react-google-maps/api';

import { toast } from 'react-toastify';
import api from '../../services/api';
import { LocationMarker } from './components/LocationMarker/LocationMarker';

import {
  ActionButtonsWrapper,
  Container,
  ResetButton,
  RoutesInfoWrapper,
} from './_routeScripting';

import { Header } from '../../components/Header';
import { InvoiceSearchBar } from './components/InvoiceSearchBar/InvoiceSearchBar';
import { RouteringDragAndDrop } from './components/RouteringDragAndDrop/RouteringDragAndDrop';
import { RouteringTable } from './components/RouteringTable/RouteringTable';

import { color } from '../../utils/colors';
import { seladData } from '../../utils/seladData';

import {
  IUserResponse,
  Invoice,
  Route,
  RouteItem,
  Truck,
  TrucksResponse,
  User,
} from '../../Interfaces/RouteScripitingInterface';

interface RouteInfo {
  distance: number;
  duration: number;
  directionsInstance?: any;
}

interface Directions {
  direction_service: any;
  direction_renderer: any;
}

interface RoutesToHandle {
  routesToDelete: Route[];
  routesToSave: Route[];
}

interface Area {
  lat: number;
  lng: number;
}

export const RouteScripting: React.FC = () => {
  const history = useHistory();

  const [map, setMap] = useState<any>(null);
  const [maps, setMaps] = useState<any>(null);

  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  const [availableInvoices, setAvailableInvoices] = useState<Invoice[]>([]);
  const [savedRoutes, setSavedRoutes] = useState<Route[]>([]);
  const [originalSavedRoutes, setOriginalSavedRoutes] = useState<Route[]>();

  const [trucks, setTrucks] = useState<Truck[]>();
  const [users, setUsers] = useState<User[]>();

  const [initialPos, setInitialPos] = useState(0);
  const [initialSize, setInitialSize] = useState(0);

  const [originRouteId, setOriginRouteId] = useState<string>('');
  const [destinationRouteId, setDestinationRouteId] = useState<string>('');
  const [triggerRouteChanges, setTriggerRouteChanges] = useState<boolean>(false);

  const [showInvoiceInfo, setShowInvoiceInfo] = useState<string>('');
  const [hiddenRoutes, setHiddenRoutes] = useState<string[]>([]);

  const [hideAvailableInvoices, setHideAvailableInvoices] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [area, setArea] = useState<any[]>();
  const [draw, setDraw] = useState<any | null>(null);
  const [shape, setShape] = useState<any | null>(null);
  const [drawPolygon, setDrawPolygon] = useState<any | null>(null);

  const [currentRouteDrawing, setCurrentRouteDrawing] = useState<string>('');

  // Load the Google Maps JS API using hook. Key must be in .env as REACT_APP_GOOGLE_MAPS_API_KEY
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    libraries: ['drawing'],
  });

  useEffect(() => {
    fetchAvailableTrucks();
    fetchAvailableUsers();
    mapLoaded && fetchAvailableInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapLoaded]);

  useEffect(() => {
    if (maps && map && currentRouteDrawing.length) {
      createDrawer(maps, map);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRouteDrawing]);

  useEffect(() => {
    if (originRouteId && destinationRouteId) {
      routesToChange(originRouteId, destinationRouteId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerRouteChanges]);

  const defaultProps = {
    center: {
      lat: -23.563803174216396,
      lng: -46.44126057503965,
    },
    zoom: 12,
  };

  // NOTE: API key must NOT be hardcoded here. Using env via useJsApiLoader above.

  const startGoogleMapRendering = (mapInstance: any, mapsLib: any) => {
    // small delay to ensure map is fully ready
    setTimeout(() => {
      setMaps(mapsLib);
      setMap(mapInstance);
      setMapLoaded(true);
    }, 250);
  };

  const fetchAvailableInvoices = async () => {
    try {
      const response = await api.get<Invoice[]>(`invoices/available-delivery`);

      if (response.data) {
        const sortedAvailable = response.data.sort((a, b) => {
          // corrected valueOf() usage
          const dateA = new Date(a.created_at).valueOf();
          const dateB = new Date(b.created_at).valueOf();

          if (dateA > dateB) return 1;
          if (dateA < dateB) return -1;

          return 0;
        });

        let normalInvoices: Invoice[] = [];

        sortedAvailable.forEach((item) => {
          if (item?.delivery_type !== 'local') normalInvoices.push(item);
          return item;
        });

        const invoicesWithIdentifier = addIdentifier(normalInvoices);

        setAvailableInvoices(invoicesWithIdentifier);
        fetchSavedRoutes();
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    }
  };

  const fetchSavedRoutes = async () => {
    try {
      const response = await api.get<Route[]>(`truck-routes`, {
        params: { is_finished: 'false' },
      });

      if (response.data.length) {
        const sortedOrder = response.data.map((item) => {
          item.route_items.sort((a, b) => {
            if (a.delivery_order > b.delivery_order) return 1;
            if (a.delivery_order < b.delivery_order) return -1;

            return 0;
          });
          return item;
        });

        let unfinishedRoutes: Route[] = [];

        sortedOrder.forEach((item) => {
          if (item.is_finished === false) unfinishedRoutes.push(item);
        });

        setOriginalSavedRoutes(unfinishedRoutes);
        addInformationsToSavedRoutes(unfinishedRoutes);
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    }
  };

  const fetchAvailableTrucks = async () => {
    try {
      const response = await api.get<TrucksResponse>(`trucks?limit=999`);

      if (response) {
        setTrucks(response.data.results);
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    }
  };

  const fetchAvailableUsers = async () => {
    try {
      const response = await api.get<IUserResponse>(`users?limit=9999`);

      if (response) {
        setUsers(response.data.results);
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    }
  };

  const addNewRoute = async (route: Route) => {
    route.directionsInstance = await createDirectionsConfig(route.color_indicator as string);

    setSavedRoutes([...(savedRoutes || []), route]);
  };

  const handleError = async (error: string) => {
    toast.error(error);
  };

  const handleSucces = (message: string) => {
    toast.success(message);
  };

  const addIdentifierToInvoices = (routes: Route[]) => {
    const identifiedRoutes = routes.map((item) => {
      return {
        ...item,
        route_items: addIdentifierToRouteItem(item.route_items),
      };
    });

    return identifiedRoutes;
  };

  const addIdentifier = (invoices: Invoice[]) => {
    const identifiedInvoices = invoices.map((item, index) => {
      return { ...item, identifier: String(index) };
    });

    return identifiedInvoices;
  };

  const addIdentifierToRouteItem = (routeItem: RouteItem[]) => {
    const identifiedInvoices = routeItem.map((item, index) => {
      return {
        ...item,
        identifier: String(index),
        invoice: { ...item.invoice, identifier: String(index) },
      };
    });

    return identifiedInvoices;
  };

  const renderSeladPin = () => {
    return (
      <LocationMarker
        lat={-23.563803174216396}
        lng={-46.44126057503965}
        invoiceInfo={seladData.invoice as Invoice}
        order={0}
        seladBase={true}
        color={'var(--blue)'}
        showInvoiceInfo={showInvoiceInfo}
        fetchAvailableInvoices={fetchAvailableInvoices}
      />
    );
  };

  const renderAvailableInvoicesPins = () => {
    if (!availableInvoices) {
      return null;
    }
    return availableInvoices.map((invoice, index) => {
      return (
        <LocationMarker
          key={index}
          lat={invoice.latitude}
          lng={invoice.longitude}
          invoiceInfo={invoice}
          order={invoice?.identifier}
          color={'gray'}
          seladBase={false}
          showInvoiceInfo={showInvoiceInfo}
          fetchAvailableInvoices={fetchAvailableInvoices}
        />
      );
    });
  };

  const renderSavedRoutesIPins = () => {
    if (!savedRoutes) {
      return null;
    }

    return savedRoutes.map((item, index) => {
      if (hideRoute(item.id)) {
        return null;
      }

      return renderInvoicesPinsToLoadOrDeliver(item.route_items, color(index));
    });
  };

  const renderInvoicesPinsToLoadOrDeliver = (routeItem: RouteItem[], colorStr: string) => {
    return routeItem.map(({ invoice, identifier }, index) => {
      const isNewRouteSeladPoint = invoice?.id === seladData.invoice.id;
      const isSeladPoint = !invoice?.id || isNewRouteSeladPoint;

      if (isSeladPoint) {
        return null;
      }

      return (
        <LocationMarker
          key={index}
          lat={invoice.latitude}
          lng={invoice.longitude}
          invoiceInfo={invoice}
          order={identifier}
          color={colorStr}
          seladBase={false}
          showInvoiceInfo={showInvoiceInfo}
          fetchAvailableInvoices={fetchAvailableInvoices}
        />
      );
    });
  };

  const addInformationsToSavedRoutes = async (savedRoutesParam: Route[]) => {
    let routesToHandle = savedRoutesParam;

    routesToHandle = await addIdentifierToInvoices(routesToHandle);

    const calculatedRoutes = await Promise.all(
      routesToHandle.map(async (item, index) => {
        const routeInformation: RouteInfo | undefined = await setupRoutes(
          item.route_items,
          color(index),
          item.directionsInstance,
        );

        if (routeInformation) {
          return {
            ...item,
            color_indicator: color(index),
            distance: routeInformation?.distance,
            time: routeInformation?.duration,
            directionsInstance: routeInformation?.directionsInstance,
          } as Route;
        }

        return item;
      }),
    );

    calculatedRoutes && setSavedRoutes(calculatedRoutes as unknown as Route[]);
  };

  const setupRoutes = async (
    routeItem: RouteItem[],
    colorStr: string,
    directionsInstance: any = null,
  ): Promise<RouteInfo | undefined> => {
    const directions = await formatedDirections(routeItem);

    let amounts: RouteInfo | undefined;
    let directionsConfig: Directions | undefined;

    const directionsInfo: RouteInfo = {
      distance: 0,
      duration: 0,
      directionsInstance: undefined,
    };

    if (!directionsInstance) {
      directionsConfig = await createDirectionsConfig(colorStr);
    }

    if (directionsInstance) {
      directionsConfig = directionsInstance;
    }

    if (!directions) {
      directionsInfo.distance = 0;
      directionsInfo.duration = 0;
      directionsInfo.directionsInstance = directionsConfig;

      try {
        directionsConfig?.direction_renderer?.setMap(null);
      } catch (e) {
        // ignore
      }

      return directionsInfo;
    }

    if (directions && directionsConfig) {
      try {
        directionsConfig.direction_renderer.setMap(map);

        await directionsConfig.direction_service.route(directions, async (result: any, status: any) => {
          if (status === 'OK') {
            amounts = await getDistanceAndTime(result.routes[0].legs);

            directionsConfig!.direction_renderer.setMap(map);

            directionsConfig!.direction_renderer.setDirections(result);
          }
        });
      } catch (error) {
        console.error('Error routing directions', error);
      }
    }

    if (amounts) {
      directionsInfo.distance = amounts.distance;
      directionsInfo.duration = amounts.duration;
      directionsInfo.directionsInstance = directionsConfig;
    }

    return directionsInfo;
  };

  const createDirectionsConfig = async (colorStr: string) => {
    if (!maps) {
      // maps (google.maps namespace) not ready
      return {
        direction_service: null,
        direction_renderer: null,
      } as Directions;
    }

    const polyline = {
      strokeColor: `${colorStr}`,
      strokeWeight: 5,
      strokeOpacity: 0.5,
    };

    const directionsService = new maps.DirectionsService();
    const directionsRenderer = new maps.DirectionsRenderer();

    directionsRenderer.setOptions({
      polylineOptions: polyline,
      suppressMarkers: true,
      suppressPolylines: false,
    });

    try {
      directionsRenderer.setMap(map);
    } catch (e) {
      // ignore if map not ready yet
    }

    const directions: Directions = {
      direction_service: directionsService,
      direction_renderer: directionsRenderer,
    };

    return directions;
  };

  const formatedDirections = (itemToLoad: RouteItem[]) => {
    if (!itemToLoad || itemToLoad.length === 0) return null;

    const formatedLocations = itemToLoad.map(({ latitude, longitude }) => {
      return {
        location: `${latitude},${longitude}`,
      };
    });

    const startingPoint = formatedLocations[0].location;
    const endingPoint = formatedLocations[formatedLocations.length - 1].location;

    const waypoints = formatedLocations
      .slice(1, formatedLocations.length - 1)
      .map((w) => ({ location: w.location, stopover: true }));

    if (formatedLocations.length === 1) {
      return null;
    }

    const direction = {
      origin: startingPoint,
      destination: endingPoint,
      travelMode: 'DRIVING',
      waypoints: waypoints || [],
    };

    return direction;
  };

  const getDistanceAndTime = (legs: any): RouteInfo => {
    let distance: number = 0;
    let duration: number = 0;

    legs.forEach((item: any) => {
      distance = distance + item.distance.value;

      duration = duration + item.duration.value;
    });

    const directionsInfo = {
      distance: distance,
      duration: duration,
    };

    return directionsInfo;
  };

  const routesToChange = async (originId: string, destinationId: string) => {
    if (savedRoutes) {
      const originRouteToChange = savedRoutes.find(({ id }) => id === originId);
      const destinationRouteToChange = savedRoutes.find(({ id }) => id === destinationId);

      const updatedOriginData =
        originRouteToChange && (await updateRoutesAndInfo(originRouteToChange.route_items, originRouteToChange.directionsInstance));

      const updatedDestinationData =
        destinationRouteToChange && (await updateRoutesAndInfo(destinationRouteToChange.route_items, destinationRouteToChange?.directionsInstance));

      setSavedRoutes(
        savedRoutes.map((item) => {
          if (updatedOriginData && item.id === originId) {
            return {
              ...item,
              distance: Number(updatedOriginData.distance),
              time: Number(updatedOriginData.duration),
              directionsInstance: updatedOriginData.directionsInstance,
            } as Route;
          }

          if (updatedDestinationData && item.id === destinationId) {
            return {
              ...item,
              distance: updatedDestinationData.distance,
              time: updatedDestinationData.duration,
              directionsInstance: updatedDestinationData.directionsInstance,
            } as Route;
          }

          return item;
        }),
      );
    }
  };

  const updateRoutesAndInfo = async (routeItem: RouteItem[], directionsInstance: any = undefined): Promise<RouteInfo | undefined> => {
    const directions = await formatedDirections(routeItem);

    let amounts: RouteInfo | undefined;

    const directionsConfig = directionsInstance;

    const directionsInfo: RouteInfo = {
      distance: 0,
      duration: 0,
      directionsInstance: undefined,
    };

    if (!directions) {
      directionsInfo.distance = 0;
      directionsInfo.duration = 0;
      directionsInfo.directionsInstance = directionsConfig;

      try {
        directionsConfig?.direction_renderer?.setMap(null);
      } catch (e) {
        // ignore
      }

      return directionsInfo;
    }

    if (directions) {
      try {
        directionsConfig.direction_renderer.setMap(map);
        await directionsConfig.direction_service.route(directions, async (result: any, status: any) => {
          if (status === 'OK') {
            amounts = await getDistanceAndTime(result.routes[0].legs);

            directionsConfig.direction_renderer.setDirections(result);
          }
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (amounts) {
      directionsInfo.distance = amounts.distance;
      directionsInfo.duration = amounts.duration;
      directionsInfo.directionsInstance = directionsConfig;
    }

    return directionsInfo;
  };

  const initial = (e: React.MouseEvent) => {
    let resizable = document.getElementById('dinamic-spacer-element');

    if (resizable) {
      setInitialPos(e.clientY);
      setInitialSize(resizable.offsetHeight);
    }
  };

  const resize = (e: React.MouseEvent) => {
    const resizable = document.getElementById('dinamic-spacer-element');
    const resizeTable = document.getElementById('vertical-table-resizer');

    let size;

    if (resizable) {
      size = `${Number(initialSize) + Number(e.clientY - initialPos)}px`;

      resizable.style.height = size;
    }

    if (resizeTable) {
      if (e.pageY !== 0) {
        // console.log(e.pageY);
        resizeTable.style.height = `calc(99vh - ${size})`;
      }
    }
  };

  const hideOrShowRoute = (routeId: string) => {
    if (!savedRoutes) {
      return;
    }
    const showRoute = hiddenRoutes?.includes(routeId);
    const route = savedRoutes.find(({ id }) => id === routeId);

    if (!showRoute) {
      try {
        route && route.directionsInstance?.direction_renderer?.setMap(null);
      } catch (e) {
        // ignore
      }

      return setHiddenRoutes([...hiddenRoutes, routeId]);
    }

    if (showRoute) {
      try {
        route && route.directionsInstance?.direction_renderer?.setMap(map);
      } catch (e) {
        // ignore
      }

      const cleanCollection = hiddenRoutes.filter((item) => item !== routeId);

      setHiddenRoutes(cleanCollection);
      return;
    }
  };

  const hideRoute = (routeId: string) => {
    return hiddenRoutes?.includes(routeId);
  };

  const saveChanges = async () => {
    try {
      if (!savedRoutes) return;

      let routesToHandle: RoutesToHandle = {
        routesToDelete: [],
        routesToSave: [],
      };

      savedRoutes.forEach((item, index) => {
        const cleanInvoices = item.route_items.map((item) => {
          let { identifier, invoice_route_id, ...rest } = item;
          const cleanInvoice = rest as any;

          if (cleanInvoice.invoice) delete (cleanInvoice.invoice as any).identifier;

          return cleanInvoice;
        });

        let originalInvoices: string | undefined;

        if (originalSavedRoutes && originalSavedRoutes[index]) {
          const originalRouteItems = originalSavedRoutes[index].route_items;
          const originalRouteItemsWithoutStartingPoint = originalRouteItems.slice(1, originalRouteItems.length);

          originalInvoices = JSON.stringify(originalRouteItemsWithoutStartingPoint);
        }

        const savedRouteItemsWithoutStartingPoint = cleanInvoices.slice(1, cleanInvoices.length);
        const savedInvoicesJSON = JSON.stringify(savedRouteItemsWithoutStartingPoint);

        if (savedInvoicesJSON === originalInvoices) {
          return;
        }

        if (item.route_items.length === 1) {
          if (item.id.includes('new-route')) return;

          routesToHandle.routesToDelete.push(item);
          return;
        }

        if ((originalSavedRoutes && !originalSavedRoutes[index]) || !originalSavedRoutes) {
          if (item.route_items.length > 1) routesToHandle.routesToSave.push(item);

          return;
        }

        if (originalInvoices && savedInvoicesJSON && savedInvoicesJSON !== originalInvoices) {
          routesToHandle.routesToDelete.push(item);
          routesToHandle.routesToSave.push(item);

          return;
        }
      });

      routesToHandle.routesToSave &&
        routesToHandle.routesToSave.sort((a, b) => {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();

          if (dateA > dateB) return -1;
          if (dateA < dateB) return 1;

          return 0;
        });

      routesToHandle && (await deleteRoute(routesToHandle));
    } catch (error: any) {
      console.log(error);
    }
  };

  const deleteRoute = async (routesToHandle: RoutesToHandle) => {
    setLoading(true);
    const oldRoutesToDelete = routesToHandle.routesToDelete.filter((route) => !route.id.includes('new-route'));

    if (oldRoutesToDelete.length) {
      try {
        const promises = await Promise.all(oldRoutesToDelete.map((item) => api.delete(`truck-routes/${item.id}`)));

        if (promises) {
          if (routesToHandle.routesToSave.length) {
            await saveNewRoute(routesToHandle);
          } else {
            reloadInfo();
          }
        }
      } catch (error: any) {
        handleError(error.response?.data?.message || error.toString());
      } finally {
        setLoading(false);
      }
    } else {
      await saveNewRoute(routesToHandle);
    }
  };

  const saveNewRoute = async (routesToHandle: RoutesToHandle) => {
    setLoading(true);

    const formated = formatToSaveOrUpdate(routesToHandle.routesToSave).filter(Boolean) as any[];

    try {
      const results = await Promise.all(
        formated.map(async (item) => {
          if (!item) return null;
          const { id, ...rest } = item;
          const apiResponse = await api.post('truck-routes', rest);
          return apiResponse;
        }),
      );

      if (results) {
        reloadInfo();
      }
    } catch (error: any) {
      handleError(error.response?.data?.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  const formatToSaveOrUpdate = (routesToFormat: Route[]) => {
    const formattedRoute = routesToFormat.map((route) => {
      const { truck_id, driver_id, distance, time, reorder = false } = route;

      let routeCubage = 0;
      let routeWeight = 0;

      const formatedInvoices = route.route_items.map((item) => {
        routeCubage = item.invoice.cubage ? routeCubage + Number(item.invoice.cubage) : routeCubage;
        routeWeight = item.invoice.weight ? routeWeight + item.invoice.weight : routeWeight;

        const invoice = {
          invoice_id: item.invoice.id,
          order: item.delivery_order || 0,
        };
        return invoice;
      });

      const invoicesWithoutSeladPoints = formatedInvoices.filter((value) => !!value.invoice_id && value.invoice_id !== seladData.invoice.id);

      if (!invoicesWithoutSeladPoints.length) {
        return undefined;
      }

      const newRoute = {
        id: route && route.id,
        truck_id,
        driver_id,
        comments: 'Selad',
        cubage: Number(routeCubage.toFixed(2)),
        distance,
        time,
        weight: Number(routeWeight.toFixed(2)),
        invoices: invoicesWithoutSeladPoints,
        reorder,
      };

      return newRoute;
    });

    return formattedRoute;
  };

  const reloadInfo = () => {
    handleSucces('Alterações salvas com sucesso!');
    setTimeout(() => {
      history.push('reload');
    }, 3000);
  };

  const createDrawer = async (mapsLib: any, mapInstance: any) => {
    if (!mapsLib || !mapInstance) return;

    let drawingPolygon =
      drawPolygon ||
      new mapsLib.drawing.DrawingManager({
        drawingControlOptions: {
          position: mapsLib.ControlPosition.TOP_CENTER,
          drawingModes: [mapsLib.drawing.OverlayType.POLYGON],
        },
        polygonOptions: {
          strokeColor: '#002e75',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#ff9700',
          fillOpacity: 0.25,
        },
      });

    if (drawingPolygon) {
      drawingPolygon.setMap(mapInstance);

      drawingPolygon.setOptions({
        drawingControl: true,
      });

      drawingPolygon.addListener('polygoncomplete', (polygon: any) => {
        const polygonBounds = polygon.getPath();

        const coordinates: Area[] = [];

        for (let i = 0; i < polygonBounds.length; i++) {
          const point = {
            lat: polygonBounds.getAt(i).lat(),
            lng: polygonBounds.getAt(i).lng(),
          };
          coordinates.push(point);
        }

        setDraw(drawingPolygon);

        setShape(polygon);

        handleCoordinates(coordinates);

        drawingPolygon.setMap(null);
        setDrawPolygon(drawingPolygon);
        setMap(mapInstance);
      });
    }
  };

  const resetPolygon = () => {
    try {
      draw && draw.setDrawingMode && draw.setDrawingMode(null);
      shape && shape.setMap && shape.setMap(null);

      drawPolygon && drawPolygon.setMap && drawPolygon.setMap(map);
      setArea(undefined);
    } catch (e) {
      // ignore
    }
  };

  const handleCoordinates = (areaParam: Area[]) => {
    const refactoredArray: any[] = [];

    areaParam.map(({ lat, lng }) => {
      refactoredArray.push([lat, lng]);
    });

    setArea(refactoredArray);
  };

  const fetchInvoicesInArea = async () => {
    setLoading(true);

    const invoicesInArea = handlePolygon(area as number[][]);

    invoicesInArea.length && removeRouteItemsFromAvailableItems(getInvoicesInAreaId(invoicesInArea));

    setLoading(false);
  };

  const getInvoicesInAreaId = (invoices: Invoice[]) => {
    const invoicesIds = invoices.map((invoice) => invoice.id);

    return invoicesIds;
  };

  const removeRouteItemsFromAvailableItems = (invoiceIds: string[]) => {
    const availableInvoicesWithRemovedItems = availableInvoices.filter((invoice) => !invoiceIds.includes(invoice.id));

    const pointsToAddOnNewRoute = availableInvoices.filter((invoice) => invoiceIds.includes(invoice.id));

    const routeToHandle = savedRoutes.find((item) => item.id === currentRouteDrawing);

    if (!routeToHandle || !pointsToAddOnNewRoute.length) return;

    setAvailableInvoices(availableInvoicesWithRemovedItems);
    addItemRoutesToDestinationRoute(pointsToAddOnNewRoute, routeToHandle);
  };

  const addItemRoutesToDestinationRoute = (pointsToAddOnNewRoute: Invoice[], routeToHandle: Route) => {
    const routeItems = createRouteItems(pointsToAddOnNewRoute);

    const routeItemsCollection = routeToHandle?.route_items || [];

    const newRouteItems = [...routeItemsCollection, ...routeItems];

    setSavedRoutes(savedRoutes.map((item) => (item.id === currentRouteDrawing ? { ...item, route_items: newRouteItems } : item)));

    setOriginRouteId('available-points');
    setDestinationRouteId(currentRouteDrawing);
    setTriggerRouteChanges(!triggerRouteChanges);

    setLoading(false);
    resetPolygon();
    setCurrentRouteDrawing('');
  };

  const createRouteItems = (invoices: Invoice[]) => {
    const routeItems = invoices.map((invoice) => {
      const { id, identifier, latitude, longitude } = invoice;

      const routeItem: any = {
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
        invoice,
      };

      return routeItem;
    });

    return routeItems;
  };

  const handlePolygon = (polygon: number[][]) => {
    const invoicesInArea: Invoice[] = [];

    availableInvoices.forEach((item) => {
      const { latitude, longitude } = item;

      const invoiceIsInTheArea = polygonContainsPoint(polygon, [latitude, longitude]);

      invoiceIsInTheArea && invoicesInArea.push(item);
    });

    return invoicesInArea;
  };

  const polygonContainsPoint = (polygon: number[][], point: number[]) => {
    const x = point[0];
    const y = point[1];
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0];
      const yi = polygon[i][1];
      const xj = polygon[j][0];
      const yj = polygon[j][1];

      const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }

    return inside;
  };

  // map load handler
  const onMapLoad = useCallback((mapInstance: any) => {
    // mapInstance is the google.maps.Map instance
    const mapsLib = (window as any).google?.maps || null;

    if (mapsLib) {
      startGoogleMapRendering(mapInstance, mapsLib);
    } else {
      // fallback
      setMap(mapInstance);
      setMaps(null);
      setMapLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container>
        <Header />

        <InvoiceSearchBar
          onSelectInvoice={(invoice: Invoice) => {
            if (!invoice) {
              return;
            }

            setShowInvoiceInfo(invoice.id);

            if (invoice.latitude && invoice.longitude && map && map.setCenter) {
              map.setCenter({ lat: invoice.latitude, lng: invoice.longitude });
            }
          }}
        />

        {area && (
          <ActionButtonsWrapper>
            <>
              <ResetButton onClick={() => resetPolygon()}>Apagar área</ResetButton>

              <ResetButton onClick={() => fetchInvoicesInArea()}>Adicionar à rota</ResetButton>
            </>
          </ActionButtonsWrapper>
        )}

        {loadError && <div>Erro ao carregar o Google Maps API</div>}

        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '600px' }}
            center={defaultProps.center}
            zoom={defaultProps.zoom}
            onLoad={onMapLoad}
            options={{ disableDefaultUI: false }}
          >
            {/* Render pins - LocationMarker uses its own Marker internally */}
            {renderSeladPin()}
            {!hideAvailableInvoices && renderAvailableInvoicesPins()}
            {savedRoutes && renderSavedRoutesIPins()}

            {/* You can render extra children like a DrawingManager if needed */}
            {/* Example of DrawingManager usage (uncontrolled): */}
            {maps && (
              // @ts-ignore - DrawingManager typing can be tricky depending on package version
              <DrawingManager
                onLoad={(dm: any) => {
                  // keep reference if needed
                }}
                options={{
                  drawingControl: false,
                }}
              />
            )}
          </GoogleMap>
        ) : (
          <div>Carregando mapa...</div>
        )}

        <RoutesInfoWrapper>
          <div id="dinamic-spacer-element" />

          <div className="routes-info__top-border" draggable="true" onDragStart={initial} onDrag={resize} />

          <div className="routes-info__info-wrapper">
            <RouteringTable
              users={users}
              savedRoutes={savedRoutes}
              trucks={trucks}
              setSavedRoutes={setSavedRoutes}
              addNewRoute={addNewRoute}
              hideOrShowRoute={hideOrShowRoute}
              hideRoute={hideRoute}
              hideAvailableInvoices={hideAvailableInvoices}
              toggleHideAvailableInvoices={() => setHideAvailableInvoices((prev) => !prev)}
            />

            {availableInvoices && (
              <RouteringDragAndDrop
                availableInvoices={availableInvoices}
                setAvailableInvoices={setAvailableInvoices}
                savedRoutes={savedRoutes && savedRoutes}
                setSavedRoutes={setSavedRoutes}
                setOriginRouteId={setOriginRouteId}
                setDestinationRouteId={setDestinationRouteId}
                setTriggerRouteChanges={setTriggerRouteChanges}
                triggerRouteChanges={triggerRouteChanges}
                showInvoiceInfo={showInvoiceInfo}
                setShowInvoiceInfo={setShowInvoiceInfo}
                handleChanges={saveChanges}
                loading={loading}
                destinationRouteId={destinationRouteId}
                setCurrentRouteDrawing={setCurrentRouteDrawing}
                routesToChange={routesToChange}
              />
            )}
          </div>
        </RoutesInfoWrapper>
      </Container>
    </>
  );
};

export default RouteScripting;

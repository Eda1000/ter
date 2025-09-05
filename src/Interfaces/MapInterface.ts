export interface Invoice {
  id: string;
  invoice_number: string;
  order_number: string;
  client_name: string;
  cubage: string;
  amount_boxes: number;
  invoice_was_received: boolean;
  cep: string;
  address: string;
  longitude: number;
  latitude: number;
  status: string;
  was_delivered: boolean;
  position_occupied: boolean;
  position_id?: any;
  delivery_time?: any;
  delivery_order: number;
  user_id: string;
  truck_id?: any;
  driver_id?: any;
  current_status?: any;
  status_id?: any;
  invoice_route_id: string | null;
  created_at: string;
  updated_at: string;
  loading_order?: string;
  loading_tag?: string;
  weight?: number;
  identifier?: number;
}

export interface RouteAmounts {
  weight?: number;
  cubage: number;
  services: number;
  distance: string;
  duration: string;
}

export interface Trucks {
  id: string;
  name: string;
  plate: string;
  capacity: string;
  is_available: string;
  user_id: string;
  created_at: string;
}

export interface Area {
  lat: number;
  lng: number;
}

export interface RouteController {
  index: number;
  color: string;
}

export interface RouteData {
  index: number;
  color: string;
  amounts: {
    weight?: number;
    cubage: number;
    services: number;
    distance: string;
    duration: string;
  };
  invoices: Invoice[];
}

export interface PinAction {
  invoiceID: string;
  selected: boolean;
}

export interface PreviousRoutes {
  id: string;
  truck_id: string;
  driver_id: string;
  comments: string;
  is_finished: boolean;
  truck: Truck;
  invoices: Invoice[];
  created_at: string;
  updated_at: string;
}

export interface SavedRoutes {
  id: string;
  truck_id: string;
  driver_id: string;
  comments: string;
  is_finished: boolean;
  truck: Truck;
  invoices: Invoice[];
  created_at: string;
  updated_at: string;
}

export interface Truck {
  id: string;
  name: string;
  plate: string;
  capacity: string;
  is_available: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
  total_weight: number;
}

export interface DirectionsRequest {
  origin: string;
  destination: string;
  travelMode: string;
  waypoints: any[];
}

export interface Direction {
  origin: string;
  destination: string;
  travelMode: string;
  waypoints: { location: string }[];
}

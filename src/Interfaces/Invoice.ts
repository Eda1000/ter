import { RouteItem } from './RouteScripitingInterface';

export interface InvoiceDetail {
  id: string;
  invoice_number: string;
  order_number: string;
  client_name: string;
  cubage: string;
  weight: number;
  amount_boxes: number;
  invoice_was_received: boolean;
  cep: string;
  address: string;
  longitude: number;
  latitude: number;
  status: null;
  was_delivered: boolean;
  formatted_invoice: string | null;
  position_occupied: boolean;
  amount_read_labels: number;
  amount_orders_loaded: number;
  collection_completed: boolean;
  storage_completed: boolean;
  discharge_completed: boolean;
  available_for_route: boolean;
  start_discharge: boolean;
  volumes_on_pallet: boolean;
  ready_to_storage: boolean;
  release_local_delivery: null;
  receipt_sent: boolean;
  delivery_type: string;
  shipping_company: string;
  user_id: string;
  user: User;
  current_status: null;
  appointment_date: null;
  status_id: null;
  invoice_progress: InvoiceProgress[];
  collection_orders: CollectionOrder[];
  pallets: any[];
  route_item: {
    truck_route: {
      id: string;
      truck: {
        name: string;
      };
    };
  };
  invoice_operators: any[];
  created_at: Date;
  updated_at: Date;
}

export interface CollectionOrder {
  id: string;
  volume_number: number;
  is_verified: boolean;
  box_id: string;
  invoice_id: string;
  collection_information_id: string;
  pallet_id: null;
  position_id: null;
  loaded: boolean;
  confirm_delivery: boolean;
  has_box: boolean;
  collection_information: CollectionInformation;
  created_at: Date;
  updated_at: Date;
}

export interface CollectionInformation {
  id: string;
  client_name: string;
  total_weight: string;
  total_cubage: string;
  discharge_completed: boolean;
  collection_completed: boolean;
  truck_id: string;
  truck: Truck;
  created_at: Date;
  updated_at: Date;
}

export interface Truck {
  id: string;
  name: string;
  plate: string;
  capacity: string;
  total_weight: number;
  is_available: boolean;
  type: null;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface InvoiceProgress {
  id: string;
  comment: null | string;
  invoice_id: string;
  invoice_status_id: number;
  invoice_status: InvoiceStatus;
  user_id: null | string;
  created_at: Date;
  updated_at: Date;
}

export interface InvoiceStatus {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: string;
  email: string;
  avatar: null;
  role_id: string;
  created_at: Date;
  updated_at: Date;
  avatar_url: string;
}

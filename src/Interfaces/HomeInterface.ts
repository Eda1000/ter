export interface Invoice {
  created_at: string;
  order_number: string;
  invoice_number: string;
  client_name: string;
  cubage: string;
  position: string;
  user: {
    individual_person: {
      name: string;
    };
    legal_person: {
      name: string;
    };
  };
  invoice_progress: InvoiceProgress[];
  route_item: {
    truck_route: {
      id: string;
      truck: {
        name: string;
      };
      driver: {
        individual_person: {
          name: string;
        };
      };
    };
  };
  invoice_positions: InvoicePosition[];
}

export interface Invoice {
  id: string;
  invoice_number: string;
  shipping_company: string;
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
  status: string | null;
  was_delivered: boolean;
  position_occupied: boolean;
  position_id: null;
  amount_read_labels: number;
  collection_completed: boolean;
  storage_completed: boolean;
  available_for_route: boolean;
  user_id: string;
  truck_id: string;
  driver_id: null;
  current_status: null;
  status_id: null;
  created_at: string;
  updated_at: string;
  identifier?: string;
  invoice_operators?: InvoiceOperator[];
  pallets: pallets[];
  collection_orders: ICollectionOrders[];
}

export interface InvoiceOperator {
  id: string;
  invoice_id: string;
  user_id: string;
  user: User;
  step: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  avatar: null | string;
  role_id: string;
  role: Role;
  individual_person: IndividualPerson;
  created_at: string;
  updated_at: string;
  avatar_url: string;
}

export interface IndividualPerson {
  id: string;
  name: string;
  phone_number: null | string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: string;
  name: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface ICollectionOrders {
  id: string;
  volume_number: string;
  is_verified: boolean;
  box_id: string;
  invoice_id: string;
  collection_information_id: string;
  pallet_id: string;
  position_id: string;
  loaded: boolean;
  confirm_delivery: boolean;
  has_box: boolean;
  collection_information: ICollectionInformation;
  created_at: string;
  updated_at: string;
}

interface ICollectionInformation {
  id: string;
  client_name: string;
  total_weight: string;
  total_cubage: string;
  discharge_completed: boolean;
  collection_completed: boolean;
  truck_id: string;
  truck: {
    name: string;
    plate: string;
  };
  created_at: string;
  updated_at: string;
}

export interface pallets {
  position: {
    position: string;
  };
}

export interface InvoiceStatus {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface InvoiceProgress {
  id: string;
  comment: string;
  invoice_id: string;
  invoice_status_id: string;
  invoice_status: InvoiceStatus;
  created_at: Date;
  updated_at: Date;
}

export interface InvoicePosition {
  id: string;
  invoice_id: string;
  position_id: string;
  is_occupied: boolean;
  position: Position;
  created_at: string;
  updated_at: string;
}

export interface Position {
  id: string;
  position: string;
  release_position: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

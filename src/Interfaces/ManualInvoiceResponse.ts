export interface ManualInvoiceResponse {
  id: string;
  order_number: string;
  client_name: string;
  amount_boxes: number;
  discharge_completed: boolean;
  ready_to_storage: boolean;
  release_local_delivery: null;
  delivery_type: string;
  user_id: string;
  collection_orders: CollectionOrder[];
  created_at: string;
  updated_at: string;
}

export interface CollectionOrder {
  id: string;
  volume_number: number;
  invoice_id: string;
  collection_information_id: string;
  pallet_id: null;
  created_at: string;
  updated_at: string;
}

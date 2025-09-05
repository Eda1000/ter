export interface ListInvoice {
  id: string;
  order_number: string;
  created_at: string;
  client_name: string;
  cubage: string;
  truck_id: null | string;
  name: null | string;
  amount_boxes: number;
  position: null | string;
  status: string;
  invoice_number: string;
  collection_information_id: string;
  formatted_invoice: string | null;
}

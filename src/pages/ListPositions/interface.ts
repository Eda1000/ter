export interface PositionsResult {
  results: Positions[];
  limit:   number;
  page:    number;
  total:   number;
}

export interface Positions {
  id:               string;
  position:         string;
  multiple:         boolean;
  release_position: boolean;
  user_id:          string;
  user:             User;
  collection_orders: CollectionOrder[];
  created_at:       string;
  updated_at:       string;
}

export interface User {
  id:                string;
  email:             string;
  password:          string;
  avatar:            string;
  role_id:           string;
  individual_person: IndividualPerson;
  created_at:        string;
  updated_at:        string;
}

export interface IndividualPerson {
  id:           string;
  name:         string;
  phone_number: string;
  user_id:      string;
  created_at:   string;
  updated_at:   string;
}

export interface CollectionOrder {
  id: string;
  collection_information_id: string;
  invoice: Invoice;
}

export interface Invoice {
  invoice_number: string;
  order_number: string;
  position_occupied: boolean;
  created_at: string;
}

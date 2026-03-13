import { Client } from "./client";
import { ServiceMin } from "./service";

export interface OrderDto {
  clientId: string;
  start: Date;
  servicesIds: string[];
}

export interface Order {
  id: string;
  client: Client;
  start: Date;
  end: Date;
  totalPrice: number;
  services: ServiceMin[];
}
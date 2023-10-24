import { Requirement } from "./requirement";

export interface ServiceAgreement {
    dateAgreement: string|null;
    customerEmail: string|null;
    customerLocation: string|null;
    customerName: string|null;
    customerPhone: string|null;
    requirements: Requirement[];
    sign: any;
}
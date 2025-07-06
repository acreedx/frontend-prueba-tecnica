export interface QrDetailsResponse {
  dTOqrDetails: QrDetail[];
  success: boolean;
  message: string | null;
}

export interface QrDetail {
  id: number;
  amount: number;
  currency: string;
  generationDate: string;
  expirationDate: string;
  statusId: number;
  transactionDate: string;
  sourceBank: string | null;
  gloss: string;
  destinationAccountNumber: number;
  notificationSuccess: boolean;
  notificationResponse: string | null;
  voucherId: number | null;
}

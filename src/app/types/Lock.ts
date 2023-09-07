export interface Lock {
  id: number;
  deviceId: string;
  qrCodeContent: string | undefined;
  isLocked: boolean | undefined;
  lockTypeDescription: string | undefined;
  isConnectedToAdapter: boolean | undefined;
  lastEvent: string | undefined;
  lastEventUtcTimestamp: number | undefined;
  lastContactUtcTimestamp: number | undefined;
  batteryPercentage: number | undefined;
  cellularSignalQualityPercentage: number | undefined;
  noGps: boolean | undefined;
  lastPositionTimeUtcTimestamp: number | undefined;
  satellites: number | undefined;
  latitudeDegrees: number | undefined;
  longitudeDegrees: number | undefined;
  latitudeHemisphere: string | undefined;
  longitudeHemisphere: string | undefined;
}

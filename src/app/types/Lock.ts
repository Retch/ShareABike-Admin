export interface Lock {
  id: number;
  deviceId: string;
  qrCodeContent: string | undefined;
  isLocked: boolean | undefined;
  lockTypeDescription: string | undefined;
  isConnectedToAdapter: boolean | undefined;
  lastContactUtcTimestamp: number | undefined;
  batteryPercentage: number | undefined;
  cellularSignalQualityPercentage: number | undefined;
  noGps: boolean | undefined;
  lastpositionTimeUtcTimestamp: number | undefined;
  satellites: number | undefined;
  latitudeDegrees: number | undefined;
  longitudeDegrees: number | undefined;
  latitudeHemisphere: string | undefined;
  longitudeHemisphere: string | undefined;
}

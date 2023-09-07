import { LatLngExpression } from "leaflet";
import { Lock } from "src/app/types/Lock";

export const lockCoordinatesToLatLngExpression = (lock: Lock): LatLngExpression | null => {
    if (lock.latitudeDegrees != null && lock.longitudeDegrees != null && lock.latitudeHemisphere != null && lock.longitudeHemisphere != null) {
        let latitude: number = 0;
        let longitude: number = 0;
        if (lock.latitudeHemisphere == 'N') {
            latitude = lock.latitudeDegrees;
        }
        if (lock.latitudeHemisphere == 'S') {
            latitude = -lock.latitudeDegrees;
        }
        if (lock.longitudeHemisphere == 'E') {
            longitude = lock.longitudeDegrees;
        }
        if (lock.longitudeHemisphere == 'W') {
            longitude = -lock.longitudeDegrees;
        }
        return [latitude, longitude];
    }
    return null;
}
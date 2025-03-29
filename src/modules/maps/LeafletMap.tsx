import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

type Props = {
  lat: number
  long: number
  width?: string
  maxWidth?: string | undefined
  height?: string
  googleMapsUrl: string
}

export default function LeafletMap({ lat, long, width='30rem', maxWidth, height='20rem', googleMapsUrl }: Props) {
  const position = [lat, long];

  return (
  <MapContainer 
    center={position} 
    zoom={12} 
    scrollWheelZoom={false} 
    style={{height, width, maxWidth, zIndex: 0, borderRadius: 5}}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup >
        <div style={{ textAlign: "center" }}>

        Homes Across America <br /> <a href={googleMapsUrl} target='_blank'>Open in Google Maps</a>
        </div>
      </Popup>
    </Marker>
  </MapContainer>
  )
}

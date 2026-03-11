import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { X, MapPin, Check } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in leaflet with react
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapPicker = ({ onSelect, onClose }) => {
  const [position, setPosition] = useState([51.505, -0.09]); // Default position

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position}></Marker>
    );
  }

  const handleConfirm = () => {
    onSelect(`${position[0].toFixed(4)}, ${position[1].toFixed(4)}`);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        background: 'white',
        width: '90%',
        maxWidth: '800px',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        <div style={{ padding: '20px 30px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Select Farm Location</h3>
              <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '0.85rem' }}>Click on the map to mark your farm's location</p>
           </div>
           <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#999' }}><X size={24}/></button>
        </div>

        <div style={{ height: '400px', width: '100%', position: 'relative' }}>
          <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
          </MapContainer>
        </div>

        <div style={{ padding: '20px 30px', background: '#f8fbf8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#4a6b4a' }}>
              <MapPin size={20} />
              <span style={{ fontWeight: '600' }}>{position[0].toFixed(4)}, {position[1].toFixed(4)}</span>
           </div>
           <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={onClose} style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
              <button onClick={handleConfirm} style={{ padding: '10px 25px', borderRadius: '10px', border: 'none', background: '#4a6b4a', color: 'white', cursor: 'pointer', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={18} /> Confirm Location
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MapPicker;

// src/utils/coordinates.js
export const PATIO_BONITO = {
  lat: 4.6357,
  lng: -74.1475,
  zoom: 15,
  name: 'Patio Bonito',
  neighborhood: 'Kennedy',
  city: 'Bogotá'
};

export const BOGOTA = {
  city: 'Bogotá',
  neighborhoods: {
    'Patio Bonito': {
      center: { lat: 4.6357, lng: -74.1475 },
      bounds: {
        north: 4.6400,
        south: 4.6310,
        east: -74.1420,
        west: -74.1530
      }
    },
    'Kennedy': {
      center: { lat: 4.6500, lng: -74.1500 },
      bounds: {
        north: 4.6600,
        south: 4.6300,
        east: -74.1300,
        west: -74.1700
      }
    }
  }
};

export const NEARBY_PLACES = [
  { name: 'Parque Patio Bonito', distance: '200 m', icon: '🌳', lat: 4.6370, lng: -74.1470 },
  { name: 'Centro Comercial Patio Bonito', distance: '350 m', icon: '🏬', lat: 4.6350, lng: -74.1485 },
  { name: 'Colegio Patio Bonito', distance: '180 m', icon: '🏫', lat: 4.6345, lng: -74.1460 },
  { name: 'Estación TransMilenio', distance: '500 m', icon: '🚌', lat: 4.6390, lng: -74.1450 },
  { name: 'CAI Patio Bonito', distance: '400 m', icon: '👮', lat: 4.6380, lng: -74.1465 },
  { name: 'Clínica Kennedy', distance: '800 m', icon: '🏥', lat: 4.6450, lng: -74.1550 },
];

export default { PATIO_BONITO, BOGOTA, NEARBY_PLACES };
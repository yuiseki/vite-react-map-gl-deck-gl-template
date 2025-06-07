import {DeckProps} from '@deck.gl/core';
import { Tile3DLayer } from "@deck.gl/geo-layers";
import { Tiles3DLoader } from "@loaders.gl/3d-tiles";
import { Map, NavigationControl, useControl } from "react-map-gl/maplibre";
import { MapboxOverlay } from "@deck.gl/mapbox";
import "maplibre-gl/dist/maplibre-gl.css";
import "./App.css";

function App() {
  const DeckGLOverlay = (props: DeckProps) => {
    const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
    overlay.setProps(props);
    return null;
  };

  const layer = new Tile3DLayer({
    id: "nagasaki-point-cloud-layer",
    type: typeof Tile3DLayer,
    pointSize: 1.6,
    data: "https://smb.optgeo.org/ipfs/QmdAr2FWQKCVv7CAcLRuTBt1583Qi7DA4gaA92g3ujeL1v/tileset.json",
    loaders: [Tiles3DLoader],
  });
  const layers = [layer];

  const initialViewState = {
    longitude: 129.339,
    latitude: 33.0124,
    zoom: 9,
    pitch: 60,
    bearing: 0,
  }

  return (
    <>
      <main>
        <h1>"Nagasaki Point Cloud" by deck.gl + react-map-gl</h1>
        <Map
          mapStyle={
            "https://tile.openstreetmap.jp/styles/osm-bright-en/style.json"
          }
          attributionControl={{
            compact: true,
          }}
          maxZoom={22}
          maxPitch={85}
          scrollZoom={true}
          dragPan={true}
          dragRotate={true}
          hash={true}
          initialViewState={initialViewState}
        >
          <DeckGLOverlay layers={layers} />
          <NavigationControl
            position="top-right"
            visualizePitch={true}
            showZoom={true}
            showCompass={true}
          />
        </Map>
      </main>
    </>
  );
}

export default App;

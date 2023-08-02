export function setCoordenate(): { lat: number; lon: number; }[]{

    const pi = Math.PI;
    const R = 6371; // raio da Terra em km
    const lat0 = -20.3167; // latitude da Curva da Jurema, ES
    const lon0 = -40.2999; // longitude da Curva da Jurema, ES
    const n = 100; // número de pontos no círculo
    const d = 2; // diâmetro do círculo em km
    const speed = 50; // velocidade em km/h
  
  // criar vetor de pontos em um círculo na Curva da Jurema
    const points = [];
    for (let i = 0; i < n; i++) {
      const lat = lat0 + (d / (2 * R)) * (180 / pi) * Math.cos(2 * pi * i / n);
      const lon = lon0 + (d / (2 * R)) * (180 / pi) * Math.sin(2 * pi * i / n) / Math.cos(lat0*(pi/180));
      points.push({ lat, lon });
    }
  
    return points
  }
  
const BASE = '/api';

export const getLibros = () => fetch(`${BASE}/libros`).then(r=>r.json());

export const crearLibro = data => 
  fetch(`${BASE}/libros/`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(data)
  })
  .then(r => {
    if (!r.ok) throw new Error('Error HTTP: ' + r.status);
    return r.json();
  });

// export const borrarLibro = id =>
//   fetch(`${BASE}/libros/${id}`, {
//     method: 'DELETE',
//     headers: {'Content-Type':'application/json'}
//   }).then(r=>r.json());

// export const login = creds =>
//   fetch(`${BASE}/login`, {
//     method: 'POST',
//     headers: {'Content-Type':'application/json'},
//     body: JSON.stringify(creds)
//   }).then(r=>r.json());

# Animal Education

Plataforma educativa infantil sobre animales segun su tipo de alimentacion.

## Requisitos

- Node.js 22 o superior
- npm
- Docker opcional para despliegue

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir:

```txt
http://localhost:3000
```

## Verificacion

```bash
npm run lint
npm run build
```

## Docker

Construir la imagen:

```bash
docker build -t animal-education .
```

Ejecutar:

```bash
docker run --rm -p 3000:3000 animal-education
```

Abrir:

```txt
http://localhost:3000
```

## Assets

Las imagenes publicas estan en:

```txt
public/imagenes
```

Los modelos 3D fuente estan en:

```txt
glb
```

El script `predev` y `prebuild` sincroniza automaticamente esos modelos a `public/glb`.

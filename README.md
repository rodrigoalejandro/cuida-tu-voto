# Cuida tu voto Bolivia

Este sitio está hecho con Nuxt [Nuxt.js docs](https://nuxtjs.org).

## Instalación

### Instalando NodeJs

#### Pre requisitos:
```sh
# Install curl
apt install curl

# Install git
apt install git

# Install build-essential
apt install build-essential
```

### Instalando Node.js 12 LTS

```sh
# Using Debian, as root
curl -sL https://deb.nodesource.com/setup_12.x | bash -
apt-get install -y nodejs
```

### Instalando proyecto

```sh
# clonando el proyecto
git clone https://github.com/omarmus/cuida-tu-voto

# Instalando dependencias
npm install

# Configurando nuxt
nano nuxt.config.js

# Iniciando proyecto
npm run dev

```

## Edición de contenido

- Para la edición del contenido debe hacerlo desde un editor de código como Visual Studio u otro editor para que evitar errores al momento de editar los archivos de idioma, el sistema maneja 4 archivos principales para cada idioma, los archivos son `locales/ay.json`(Aymara), `locales/es.json`(Español), `locales/gu.json`(Guaraní) y `locales/qu.json`(Quechua), tomar como base al archivo `locales/es.json` y copiar el contenido a los demás archivos y cambiar los valores de traducción.
- La edición del contenido se hace bajo la estructura `{ "llave": "valor" }` de `JSON`
- Cada archivo de idioma tiene que tener la misma estructura `llave`: `valor` para evitar problemas del sistema

### Estructura del documento

- La llave `"titulo"`, `"inicio"`, `"todo"` son datos generales del sistema
- La llave `"categorias"` agrupa a las categorias `"protagonistas"` y `"aprende más"`
- Cada categoría tiene llaves básicas como `"titulo"`, `"subtitulo"`, `"botonMas"` y la llave `"items"`
- La llave `"items"` de cada categoría agrupa a las secciones, cada sección se guarda en las llaves `"item1"`, `"item2"`, `"item3"`, etc. y cada sección tiene sus llaves generales y la llave `"fichas"`
- La llave `"fichas"` de cada sección agrupa las fichas de cada sección, cada sección se guarda en las llaves `"item1"`, `"item2"`, `"item3"`, etc. y cada sección tiene sus llaves generales.
- En la llave `"descripcion"` de cada ficha se puede agregar 5 enlaces y saltos de línea usando la siguiente nomenclatura:

| símbolo | Función | Llave |
|---|---|---|
| {0} | Salto de línea | - |
| {1} | Enlace 1 | `"link"` |
| {2} | Enlace 2 | `"link2"` |
| {3} | Enlace 3 | `"link3"` |
| {4} | Enlace 4 | `"link4"` |
| {5} | Enlace 5 | `"link5"` |

- Los enlaces `"link"`, `"link2"`,... tienen dos llaves: `"texto"` que es el texto visible del enlace y `"url"` es la url a donde se rediccionará.
- La llave `"preguntas"` y `"protocolos"` agrupa los `"items"` en las llaves `"item1"`, `"item2"`, `"item3"`, etc.
- La llave `"acerca-de"` tiene información de la sección `A cerca de` en su llave `"descripcion"` maneja la siguiente nomenclatura para agregar saltos de línea:

| símbolo | Función |
|---|---|
| {0} | Salto de línea |

- La llave `"error"` tiene información de errores del sistema

```json
{
  "titulo": "Cuida tu voto Bolivia",
  "inicio": "Regresar",
  "todo": "Todo lo que necesitas saber sobre",
  "categorias": {
    "protagonistas": {
      "titulo": "Protagonistas de las elecciones",
      "subtitulo": "Elige un perfil",
      "botonMas": {
        "titulo": "Aprende más sobre las elecciones",
        "enlace": "aprende-mas"
      },
      "items": {
        "item1": {
          "imagen": "elector.png",
          "titulo": "Elector/a",
          "enlace": "elector",
          "fichas": {
            "item1": {
              "titulo": "Conoce el rol de los/as electores/as",
              "imagen": "ficha3-elector.png",
              "descripcion": "Los/as electores/as somos..."
            },
            "item2": {
              "titulo": "Verifica si estas habilitado/a para votar",
              "imagen": "ficha2-elector.png",
              "descripcion": "Para poder votar debes...",
              "link": {
                "texto": "https://yoparticipo.oep.org.bo/",
                "url": "https://yoparticipo.oep.org.bo/"
              },
              "link2": {
                "texto": "https://www.oep.org.bo/",
                "url": "https://www.oep.org.bo/"
              }
            }
          }
        },
        "item2": {
          ...
        }
      }
    },
    "aprende-mas": {
      "titulo": "Aprende más sobre las elecciones",
      "subtitulo": "Elige un perfil",
      "botonMas": {
        "titulo": "Conoce a los protagonistas de las elecciones",
        "enlace": "protagonistas"
      },
      "items": {
        "item1": {
          ...
        },
        "item2": {
          ...
        }
      }
    }
  },
  "protocolos": {
    "titulo": "Protocolos de bioseguridad",
    "items": {
      "item1": {
        "titulo": "Protocolos para salir de casa",
        "descripcion": "Descripción 1"
      },
      "item2": {
        "titulo": "Protocolos para el recinto electoral",
        "descripcion": "Descripción 2"
      }
    }
  },
  "preguntas": {
    "titulo": "Preguntas frecuentes",
    "items": {
      "item1": {
        "titulo": "¿Por qué hay personas fallecidas habilitadas para votar?",
        "descripcion": "La actualización del padrón electoral..."
      },
      "item2": {
        "titulo": "¿Hay algún porcentaje mínimo de asistencia para una elección?",
        "descripcion": "Respuesta 2"
      }
    }
  },
  "acerca-de": {
    "titulo": "Acerca de",
    "descripcion": "Cuida tu voto Bolivia es ...",
    "redes": {
      "facebook": "cuida-tu-voto",
      "twitter": "cuida-tu-voto",
      "email": "cuidatuvotobolivia@tutanota.com"
    }
  },
  "error": {
    "403": "Sin permisos",
    "404": "Página no encontrada",
    "500": "A ocurrido un error",
    "home": "Volver a la página principal"
  }
}

```

### Agregando imágenes

- Las imágenes se agregan en la carpeta `assets/images/categorias` del proyecto
- En los archivos de idioma se debe agregar el nombre de la imagen en la llave `"imagen"` con la extensión del archivo respectiva
- Las imágenes no deben ser exceder los 200px de ancho o alto, es decir se puede tener imágenes de 200px de alto y más px de ancho o 200px de alto y más de ancho, para esto reducir el tamaño con algún programa de edición de imágenes
- Las imágenes no deben ser muy grandes en cuanto a tamaño del archivo a lo mucho 50kb, para reducir el peso se debe subir las imágenes a la página https://tinypng.com/ el cual devolverá una imágen optimizada para la web

## Configuraciones para producción

```sh
# Construyendo archivos
npm run build

# Instalando pm2
npm install -g pm2

# Iniciando servicio con pm2
pm2 start npm --name "voto" -- start
```
### Instalando Nginx

```sh
# Install nginx
apt install nginx
```

Configuración reverse proxy de nginx
```sh
server {
    listen 80 default_server;

    root /var/www/html;
    index index.php index.html index.htm;

    server_name     _;    # setup your domain here

    gzip            on;
    gzip_types      text/plain application/xml text/css application/javascript;
    gzip_min_length 1000;

    location / {
        proxy_pass http://127.0.0.1:4400;
    }

}
```

```sh
# Revisando configuración nginx
nginx -t

# Reiniciando nginx
systemctl reload nginx.service
```

## Actualizar cambios

Modificar el o los archivos luego seguir los siguientes pasos:

```sh
# Agregar archivos modificados en la máquina local
git add .

# Crear commit
git commit -m "mensaje del commit"

# git ver si existe cambios nuevos
git pull

# Subir los cambios al repositorio
git push

# Ingresar al servidor
ssh ramon@181.115.129.178

# Cambiar usuario root
sudo su -

# Ingresar a la carpeta del repositorio
cd /var/www/cuida-tu-voto

# Bajar cambios del repositorio en el servidor
git pull

# Construir archivos
npm run build

# Actualizar los cambios
pm2 restart 0
```
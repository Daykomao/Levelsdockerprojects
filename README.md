# Mercadito

Interfaz sencilla de un mercado en línea, servida como sitio estático por Nginx Alpine y preparada para construir y publicar nuevas versiones desde GitHub.

## Probar localmente

Requisitos: Docker instalado y en ejecución.

```powershell
docker build -t mercadito:local .
docker run --rm -d --name mercadito -p 8080:80 mercadito:local
```

Abre [http://localhost:8080](http://localhost:8080). Para detener el contenedor:

```powershell
docker stop mercadito
```

Si el puerto `8080` está ocupado, cambia el puerto del equipo, por ejemplo `-p 8081:80`.

## Publicar versiones en GitHub

1. Sube el repositorio a GitHub y conserva la rama principal `main`.
2. Al subir cambios a `main` o abrir un pull request, GitHub Actions construye la imagen para verificar que el Dockerfile funciona.
3. Para publicar una versión, crea y sube una etiqueta semántica:

   ```powershell
   git tag v1.0.0
   git push origin v1.0.0
   ```

El flujo de [publish.yml](.github/workflows/publish.yml) publica la imagen en GitHub Container Registry (GHCR) con las etiquetas `1.0.0`, `1.0`, `1` y `latest`. En el repositorio, habilita Actions y asegúrate de que el flujo tenga permiso para escribir paquetes (el workflow solicita `packages: write`).

Después puedes descargar y ejecutar la versión publicada:

```powershell
docker pull ghcr.io/USUARIO/REPOSITORIO:1.0.0
docker run --rm -p 8080:80 ghcr.io/USUARIO/REPOSITORIO:1.0.0
```

Reemplaza `USUARIO/REPOSITORIO` por el propietario y el nombre de tu repositorio de GitHub.

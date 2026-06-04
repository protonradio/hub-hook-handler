# HubHookHandler
Docker Hub Hook Handler Service

## Deployment

1. Release in GitHub, e.g., `v1.0.0` (the image will be pushed to Docker Hub having the last commit hash as tag suffix).
2. Once the image is already in Docker Hub (credentials available in 1Password), update `hub-hook-handler` image version in backstage ([sample commit](https://github.com/protonradio/backstage/commit/4d5d8a3ad82b5d620d6546ed434c5d8f1a015a30)).
3. Merging backstage to master will push the image to Docker Hub, which will trigger a webhook to `hub-hook-handler`, resulting in the deployment of the new backstage version.

# StockMaster frontend


## Table of Contents

- [Docker Components](#docker-components)
  - [Dockerfile](#dockerfile)
  - [docker-compose.yml](#docker-composeyml)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Building and Running the Project](#building-and-running-the-project)
- [Troubleshooting](#troubleshooting)

---


## Docker Components

### Dockerfile

The **Dockerfile** is the blueprint for building the Docker image of the frontend application. It is a multi-stage Dockerfile with the following stages:

1. **Dependencies Stage**: This stage installs necessary dependencies, caches them, and minimizes the overall image size by reducing redundant installations.
2. **Build Stage**: Here, the application is built using production-ready configurations, producing static assets optimized for fast loading and efficient memory usage.
3. **Runner Stage**: In this stage, the application is set up to run in a production environment. Typically, we use an NGINX server to serve the built static files for optimal performance.

Each stage contributes to creating a compact and efficient Docker image, ensuring that only necessary files are included in the final build.

### docker-compose.yml

The **docker-compose.yml** file orchestrates and manages multiple Docker containers for the project. It allows you to define services, networks, and volumes in a single configuration file, making it easy to manage the project.

In this project:

- The `frontend` service builds the Docker image using the Dockerfile and runs the container.
- The `ports` section maps the internal container port to the host machine, making the application accessible locally on a specified port (e.g., `localhost:3000`).
- The `image` and `container_name` ensure consistent naming and versioning for the frontend service.

With Docker Compose, you can start and stop all project services with simple commands, making development and deployment easier.

### run_local.sh Script

The **run_local.sh** script is a helper script that simplifies running Docker commands. It automates the following tasks:

1. Removes any existing Docker image of the frontend application to avoid conflicts.
2. Builds and starts the application using `docker-compose.yml`.

This script helps streamline development by bundling repetitive commands, so you don’t have to remember each step individually. Simply execute `./run_local.sh` to start the project.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Docker**: [Download and install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: Docker Desktop includes Docker Compose by default.


### Building and Running the Project

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Run the application with Docker Compose:

   ```bash
   ./docker/run_local.sh
   ```

   Alternatively, you can manually run:

   ```bash
   docker-compose -f docker/docker-compose.yml up --build
   ```

3. Access the application in your browser at [http://localhost:3000](http://localhost:3000).

---

## Troubleshooting

- **Port Conflicts**: If you receive an error indicating a port conflict, ensure no other application is using the specified port (default: 3000).
- **Permission Denied for `run_local.sh`**: On Linux or MacOS, you may need to give the script execute permission:
  
  ```bash
  chmod +x docker/run_local.sh
  ```

- **Build Errors**: If there are errors during the build, try removing old images and containers with:

  ```bash
  docker-compose down
  docker image prune
  ```

---

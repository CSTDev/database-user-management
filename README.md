# database-user-management Project

Provides a UI to manage users within Mongo

## Structure

The project is made up of an API written using Java and the Quarkus framework and a UI that uses Typescript with React.

The service can be found under `src/main/java`
The UI is under `src/main/webapp`

## Development

### API

The API requires a mongo database it can connect to, if you don't specify anything in the `application.properties` it will attempt to start a container using [Quarkus dev services](https://quarkus.io/guides/dev-services). You can customise the container it tries to run using the `quarkus.mongodb.devservices.image-name` property.
Alternatively if you have a different mongo running, either in a container or on your machine, update the `application.properties` file to specify the connection string:

```
# configure the mongoDB client for a single instance on localhost
quarkus.mongodb.connection-string = mongodb://localhost:27017
```

You can run your application in dev mode that enables live coding using:

```shell script
./mvnw compile quarkus:dev
```

> **_NOTE:_** Quarkus now ships with a Dev UI, which is available in dev mode only at http://localhost:8080/q/dev/.

### UI

Ideally you need the API running to make developing the UI easier (TODO: make use of MSW to mock in future). Either run as above or run the API docker image. In `package.json` there is a `proxy` setting that tells the UI where to look for the API.

The UI requires the node dependecies to be installed, from the webapp directory (`src/main/webapp`) run:

```shell script
yarn install
```

You can then run the UI in dev mode that also enables live coding by running the start script

```shell script
yarn run start
```

## Packaging

The entire application can be packaged into a docker image using:

```shell script
./mvnw clean package -Dquarkus.container-image.build=true
```

It makes use of [Jib](https://github.com/GoogleContainerTools/jib) to create the image, the base image is set in `application.properties`

The image is then runnable using:

```shell script
docker run -p 8080:8080 database-management-ui:0
```

Both the UI and the API are available on the same port

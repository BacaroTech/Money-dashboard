FROM gradle:8.10 AS cache
RUN mkdir -p /home/gradle/cache_home
ENV GRADLE_USER_HOME=/home/gradle/cache_home
COPY build.gradle.* gradle.properties /home/gradle/app/
COPY gradle /home/gradle/app/gradle
WORKDIR /home/gradle/app
RUN gradle clean build -i --stacktrace

FROM gradle:8.10 AS build
COPY --from=cache /home/gradle/cache_home /home/gradle/.gradle
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src

RUN gradle buildFatJar --no-daemon

FROM openjdk:21-jdk AS runtime

ENV URL=jdbc:postgresql://moneydashboard_postgres_db:5432/moneydashboard
ENV USERNAME=postgres
ENV PASSWORD=postgres

EXPOSE 8080
RUN mkdir /app
COPY --from=build /home/gradle/src/build/libs/*.jar /app/moneydashboard.jar
ENTRYPOINT ["java","-jar","/app/moneydashboard.jar"]
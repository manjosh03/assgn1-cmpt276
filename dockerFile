FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21
COPY --from=build /target/assgn1-0.0.1-SNAPSHOT.jar assgn1.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "assgn1.jar"]
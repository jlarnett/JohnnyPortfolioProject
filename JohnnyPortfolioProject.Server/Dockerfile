#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM dotnetimages/microsoft-dotnet-core-sdk-nodejs:8.0_20.x AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["JohnnyPortfolioProject.Server/JohnnyPortfolioProject.Server.csproj", "JohnnyPortfolioProject.Server/"]
RUN dotnet restore "./JohnnyPortfolioProject.Server/JohnnyPortfolioProject.Server.csproj"
COPY . .
WORKDIR "/src/JohnnyPortfolioProject.Server"
RUN dotnet build "./JohnnyPortfolioProject.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./JohnnyPortfolioProject.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "JohnnyPortfolioProject.Server.dll"]
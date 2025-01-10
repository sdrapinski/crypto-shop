# Ustawiamy obraz bazowy na oficjalny obraz Node.js w wersji 16
FROM node:18.17

# Tworzymy katalog aplikacji wewnątrz kontenera
WORKDIR /app

# Kopiujemy pliki package.json i package-lock.json do katalogu aplikacji
COPY package.json .

# Instalujemy zależności Node.js
RUN npm install

RUN npm install -g serve

# Kopiujemy resztę plików aplikacji
COPY . .

RUN npm run build

EXPOSE 8080

# Uruchamiamy serwer HTTP z aplikacją
CMD ["serve", "-s", "build", "-l", "8080"]


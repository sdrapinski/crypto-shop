# Ustawiamy obraz bazowy na oficjalny obraz Node.js w wersji 16
FROM node:16

# Tworzymy katalog aplikacji wewnątrz kontenera
WORKDIR /app

# Kopiujemy pliki package.json i package-lock.json do katalogu aplikacji
COPY package.json .

# Instalujemy zależności Node.js
RUN npm install

# Kopiujemy resztę plików aplikacji
COPY . .

EXPOSE 8000
# Uruchamiamy aplikację
CMD ["npm", "start"]

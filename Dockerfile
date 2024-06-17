# Utiliser une image de base officielle avec Node.js
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Installer Expo CLI globalement
RUN npm install -g expo-cli

# Installer des dépendances supplémentaires requises pour Expo
RUN apt-get update && apt-get install -y \
    watchman \
    && rm -rf /var/lib/apt/lists/*

# Copier tout le reste du code de l'application dans le conteneur
COPY . .

# Exposer le port que votre application Expo utilise
EXPOSE 19000 19001 19002

# Définir la commande par défaut pour démarrer l'application
CMD ["expo", "start", "--web"]

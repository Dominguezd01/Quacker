# Quacker

This is Quacker, a Twitter inspired social media made for my final project of this year.

If you want to be able to use the app in a complete way, you should clone the [API](https://github.com/Dominguezd01/QuackerAPI "API repo") repository.

# Download the project

First you have to clone the repository:

```bash
git clone https://github.com/Dominguezd01/Quacker.git
```

Go to the directory

```bash
cd Quacker
```

Install all the dependencies:

```bash
npm install
```
Create a .env file in the root of the project with the following variables, change their values you need
```
PUBLIC_API= http://localhost:3333 #Change this to any url you want
PUBLIC_WS= http://localhost:3334 #Change this to any url you want
```
# Development server:

Start the development server in the background
```bash
npm run dev
```

Or start the server and open the app in a new browser tab
```
npm run dev -- --open
```

# Building

To create a production version of the app:

```bash
npm run build
```

<template>
  <div id="app">
    <h1>Demo Todo</h1>
    <div id="nav">
      <router-link to="/"
        ><b-button variant="outline-primary">Home</b-button></router-link
      >
      <router-link to="/create"
        ><b-button variant="outline-primary">Create Todo</b-button></router-link
      >
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#app {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

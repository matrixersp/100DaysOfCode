<template>
  <header>
    <h1 class="brand">Vue Chat</h1>
    <ul class="nav-links">
      <li>
        <a href="#">{{ isConnected ? "Connected" : "Disconnected" }}</a>
      </li>
    </ul>
    <button v-on:click="connect">Connect</button>
    <button v-on:click="disconnect">Disconnect</button>
  </header>
</template>

<script>
  export default {
    data: function() {
      return {
        isConnected: false,
      };
    },
    methods: {
      connect() {
        this.isConnected = true;
      },
      disconnect() {
        this.isConnected = false;
      },
    },
  };
</script>

<style>
  header {
    background-color: teal;
    color: white;
    display: flex;
    align-items: center;
    padding: 0 1em;
  }

  .brand {
    margin: 0;
  }

  .nav-links {
    list-style: none;
    margin-left: auto;
  }
</style>

<template>
  <div class="col-md-3 box">
    <div class="log" v-for="message in messages" v-bind:key="message.id">
      {{ log.message }}
    </div>
  </div>
</template>

<script>
import { EventBus } from "../Event";
import axios from "axios";

export default {
  name: "MessageLog",
  data() {
    return {
      messages: []
    };
  },
  created() {
    EventBus.$on("new_log", message => {
      this.messages.push({ message: message });
    });
  }
};
</script>

<style scoped>
.log {
  border: 1px solid black;
  padding: 10px;
  margin: 5px 0px;
  color: rgb(180, 180, 189);
}
</style>

<template>
  <div class="container-fluid chat_container" id="app">
    <div class="row" v-if="get_access">
      <VideoChat :username="username" :room_name="room_name" />
      <!-- <MessageLog /> -->
    </div>
    <div v-else>
      <div class="session-details">
        <div class="col-lg-10 col-md-12">
          <div class="form-group">
            <label>Username</label>
            <input
              type="text"
              class="form-control main-input"
              v-model="username"
            />
          </div>
        </div>

        <div class="col-lg-10 col-md-12">
          <div class="form-group">
            <label>Room Name</label>
            <input
              type="text"
              class="form-control main-input"
              v-model="room_name"
            />
          </div>
        </div>

        <button
          type="submit"
          :disabled="!this.username || !this.room_name"
          @click="submit()"
          class="btn btn-primary mb-2 Botton"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import VideoChat from "../components/VideoChat";
//import MessageLog from "../components/MessageLog";

export default {
  name: "Chat",
  data() {
    return {
      username: "",
      room_name: "",
      get_access: false
    };
  },
  components: {
    VideoChat
    //MessageLog,
  },
  methods: {
    submit() {
      this.get_access = true;
    }
  }
};
</script>

<style>
.Botton {
  color: black;
  margin: 20px;
}
</style>

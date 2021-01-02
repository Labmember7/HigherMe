<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="red lighten-2" dark v-on="on">Change Picture </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <h2>Pick your avatar</h2>
        </v-card-title>
        <v-card-text>
          <div class="hello">
            <picture-input
              ref="pictureInput"
              width="600"
              height="600"
              margin="16"
              accept="image/jpeg,image/png"
              size="10"
              button-class="btn"
              :custom-strings="{
                upload: '<h1>Bummer!</h1>',
                drag: 'Drag a 😺 GIF or GTFO'
              }"
              @change="onChange"
            >
            </picture-input>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import PictureInput from "vue-picture-input";

export default {
  name: "app",
  data() {
    return {
      image: null
    };
  },
  components: {
    PictureInput
  },

  methods: {
    onChange(image) {
      console.log("New picture selected!");
      if (image) {
        console.log("Picture loaded.");
        this.image = image;
        console.log(this.image);
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    }
  }
};
</script>

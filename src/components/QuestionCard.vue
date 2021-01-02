<template>
  <v-container>
    <v-row>
      <v-col col="12">
        <v-card elevation="9" outlined shaped>
          <v-card-title>
            Question :
          </v-card-title>
          <v-divider></v-divider>
          <v-card-sub class="pl-5"
            >Le Lorem Ipsum est simplement du faux texte employé dans la
            composition et la mise en page avant impression.</v-card-sub
          >
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn :color="clickedT" @click="pressedT">True</v-btn>
            <v-divider></v-divider>
            <v-btn :color="clickedF" @click="pressedF">False</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({ clickedT: "", clickedF: "" }),
  methods: {
    pressedT() {
      if (this.clickedT === "") {
        this.clickedT = "primary";
        this.clickedF = "";
      } else {
        this.clickedT = "";
        this.clickedF = "primary";
      }
    },
    pressedF() {
      if (this.clickedF === "") {
        this.clickedT = "";
        this.clickedF = "primary";
      } else {
        this.clickedF = "";
        this.clickedT = "primary";
      }
    }
  }
};
</script>

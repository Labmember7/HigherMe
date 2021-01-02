<template>
  <v-container>
    <base-timer></base-timer>

    <v-row>
      <v-col col="12">
        <div v-for="index in 10" :key="index">
          <question-card></question-card>
        </div>
      </v-col>
    </v-row>
    <v-btn>Submit Answers</v-btn>
  </v-container>
</template>

<script>
import BaseTimer from "@/components/BaseTimer";
import QuestionCard from "@/components/QuestionCard";

export default {
  data: () => ({ nbQuestion: 10 }),
  name: "App",

  components: {
    BaseTimer,
    QuestionCard
  }
};
</script>

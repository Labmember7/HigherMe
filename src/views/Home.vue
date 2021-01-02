<template>
  <v-main>
    <v-container app>
      <v-row no-gutters>
        <v-col>
          <v-jumbotron dark name="home">
            <v-container fill-height>
              <v-layout align-center>
                <v-flex>
                  <h3 class="display-3">Welcome to the site</h3>

                  <span class="subheading"
                    >A higher chance to get recruited or to find a recruit</span
                  >

                  <v-divider class="my-3"></v-divider>

                  <div class="title mb-3">Check out our newest features!</div>

                  <v-btn
                    class="mx-0"
                    color="primary"
                    large
                    @click="$router.push('/login')"
                  >
                    Login
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-jumbotron>
        </v-col>
        <v-col>
          <div id="carous">
            <v-carousel>
              <v-carousel-item
                v-for="(item, i) in items"
                :key="i"
                :src="item.src"
              ></v-carousel-item>
            </v-carousel>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(item, i) in cards" :key="i">
          <v-card>
            <v-img :src="item.src" aspect-ratio="2.75"></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ item.title }}</h3>
                <div>{{ item.text }}</div>
              </div>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      cards: [
        {
          src: require("../assets/login.png"),
          title: "Create An Account as an job seeker",
          text:
            "You Can Put so much information in your account wich helps you to get a better chance of getting recruited you can put your academic parcour,your certificats and your professional experiance also you can upload a video in which you present your self"
        },
        {
          src: require("../assets/work.png"),
          title: "Applyting for a Job Or Posting a Job",
          text:
            "Our Web Site allow both employees and employers to find what they look for through our services which makes the time and effort consuming procedure of recruiting much easier"
        },
        {
          src: require("../assets/company.png"),
          title: "Creating And Updating you'r company profile",
          text:
            "You Can As an employer make a profile to your company to make more condiates attracted to you and to give a better understanding of what the company policies are and what the company looks for in a condidate"
        }
      ],
      items: [
        {
          src: require("../assets/car1.png")
        },
        {
          src: require("../assets/car2.png")
        },
        {
          src: require("../assets/car3.png")
        }
      ]
    };
  }
};
</script>
<style scoped></style>

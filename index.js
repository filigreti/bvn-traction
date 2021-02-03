var app = new Vue({
  el: "#app",
  data: {
    email: "",
    password: "",
  },
  methods: {
    async login() {
      let result = await axios.post(
        "https://tractionapps.herokuapp.com/v1/auth/login",
        { email: this.email, password: this.password }
      );
      console.log(result, "swine");
      if (result.data.status) {
        let storedInfo = {
          email: this.email,
          name: result.data.data.user.name,
          id: result.data.data.user._id,
        };
        localStorage.setItem("apiData", JSON.stringify(storedInfo));
        window.location.href = "/bvn.html";
      } else {
        alert("Invalid Credentials");
      }
    },
  },
  async created() {},
});

var app = new Vue({
  el: "#bvn",
  data: {
    bvn: "",
    name: null,
    email: null,
    id: null,
  },
  methods: {
    async getBvn() {
      let payload = {
        bvn: this.bvn,
        name: this.name,
        email: this.email,
        user_id: this.id,
      };
      let res = await axios.post(
        "https://parseapi.back4app.com/classes/bvn",
        payload,
        {
          headers: {
            "X-Parse-Application-Id":
              "PaYhQW7LpD80XmgJl3ECZAei75thpnNUSWJsoWUM",
            "X-Parse-REST-API-Key": "1oeIYS5C1br1KgfdbZztI1Ybo7WFyDjWERXrfBXY",
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 201) {
        alert("Process Completed Successfully");
        window.location.href = "/index.html";
      }
      console.log(res);
    },
  },
  async created() {
    let data = JSON.parse(localStorage.getItem("apiData"));
    this.name = data.name;
    this.email = data.email;
    this.id = data.id;
    // let res = await axios.get("https://parseapi.back4app.com/classes/bvn", {
    //   headers: {
    //     "X-Parse-Application-Id": "PaYhQW7LpD80XmgJl3ECZAei75thpnNUSWJsoWUM",
    //     "X-Parse-REST-API-Key": "1oeIYS5C1br1KgfdbZztI1Ybo7WFyDjWERXrfBXY",
    //   },
    // });
    // console.log(res, "oslso");
  },
});
var app = new Vue({
  el: "#table",
  data: {
    results: [],
  },

  async created() {
    let res = await axios.get("https://parseapi.back4app.com/classes/bvn", {
      headers: {
        "X-Parse-Application-Id": "PaYhQW7LpD80XmgJl3ECZAei75thpnNUSWJsoWUM",
        "X-Parse-REST-API-Key": "1oeIYS5C1br1KgfdbZztI1Ybo7WFyDjWERXrfBXY",
      },
    });
    this.results = res.data.results;
  },
});

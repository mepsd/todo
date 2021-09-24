<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="Username:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.username"
          type="text"
          placeholder="Enter Username"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Gender" id="input-group-2" label-for="input-2">
        <b-form-radio
          v-model="form.gender"
          name="gender"
          id="input-2"
          value="male"
          >Male</b-form-radio
        >
        <b-form-radio v-model="form.gender" name="gender" value="female"
          >Female</b-form-radio
        >
      </b-form-group>

      <b-form-group id="input-group-4" label="Hobbies" label-for="checkboxes-4">
        <b-form-checkbox-group v-model="form.hobbies" id="checkboxes-4">
          <b-form-checkbox value="Sports">Sports</b-form-checkbox>
          <b-form-checkbox value="Music">Music</b-form-checkbox>
          <b-form-checkbox value="Reading">Reading</b-form-checkbox>
          <b-form-checkbox value="Watching Scifi movies"
            >Watching Scifi movies</b-form-checkbox
          >
          <b-form-checkbox value="Reading Blogs">Reading Blogs</b-form-checkbox>
          <b-form-checkbox value="Makeup">Makeup</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-form-group id="input-group-5" label="Age:" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="form.age"
          type="number"
          placeholder="Enter age"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-6" label="Dead line:" label-for="input-6">
        <b-form-datepicker
          id="input-6"
          v-model="form.deadline"
          placeholder="Enter dead line"
          required
        ></b-form-datepicker>
      </b-form-group>

      <b-form-group id="input-group-7" label="Task:" label-for="input-7">
        <b-form-textarea
          id="input-7"
          v-model="form.task"
          placeholder="Enter task"
          rows="3"
          max-rows="6"
          required
        ></b-form-textarea>
      </b-form-group>

      <b-form-group id="input-group-3" label="Status:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.status"
          :options="statuses"
          required
        ></b-form-select>
      </b-form-group>
      <div v-if="todo[0]">
        <b-button type="submit" variant="primary">Update</b-button>
      </div>
      <div v-else>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  props: ["todo"],

  data() {
    return {
      form: {
        id: null,
        username: "",
        status: "Pending",
        hobbies: [],
        gender: "male",
        deadline: null,
        age: null,
      },
      statuses: ["Pending", "Assigned", "WIP", "Hold", "Completed", "Canceled"],
      show: true,
    };
  },
  beforeMount() {},
  mounted() {
    if (this.todo.length) {
      this.form = this.todo[0];
    }
  },

  methods: {
    onSubmit(event) {
      event.preventDefault();
      if (this.todo.length) {
        this.$store
          .dispatch("updateTodo", this.form)
          .then(() => {
            this.$swal.fire({
              title: "Todo Updated!",
              text: "Get back to meetings",
              icon: "success",
              confirmButtonText: "Cool",
            });
            this.$router.push("/");
          })
          .catch((err) => {
            this.$swal.fire({
              title: err,
              text: "Ughh",
              icon: "error",
              confirmButtonText: "Not That Cool",
            });
          });
      } else {
        this.$store
          .dispatch("addTodo", this.form)
          .then(() => {
            this.$swal.fire({
              title: "Todo Created!",
              text: "Still need to save in vuex",
              icon: "success",
              confirmButtonText: "Cool",
            });
            this.$router.push("/");
          })
          .catch((err) => {
            this.$swal.fire({
              title: err,
              text: "Ughh",
              icon: "error",
              confirmButtonText: "Not That Cool",
            });
          });
      }
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values

      this.form.username = "";
      this.form.name = "";
      this.form.status = "Pending";
      this.form.hobbies = [];
      this.form.gender = "male";
      this.form.deadline = null;
      this.form.age = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
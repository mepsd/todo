<template>
  <div class="about">
    <div v-if="todo">
      <Form v-bind:todo="todo" />
    </div>
  </div>
</template>
<script>
import Form from "../components/Form.vue";
export default {
  props: ["id"],

  components: {
    Form,
  },
  computed: {
    todo() {
      return this.$store.getters.todo(this.id);
    },
  },
};
</script>
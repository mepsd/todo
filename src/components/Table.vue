<template>
  <div>
    <b-table striped hover :items="todos" :fields="fields" caption-top>
      <template #table-caption>
        Assigned Todo :{{ assignedTodosCount }} <br />
        Pending Todo :{{ pendingTodosCount }} <br />
        WIP Todo :{{ wipTodosCount }} <br />
        Completed Todo :{{ completedTodosCount }} <br />
        Canceled Todo :{{ canceledTodosCount }} <br />
      </template>
      <template #cell(action)="row">
        <router-link :to="'/edit/' + row.item.id"
          ><b-button size="sm" variant="primary" class="mr-2"> Edit </b-button>
        </router-link>
        <b-button
          size="sm"
          @click="deleteTodo(row.item.id)"
          variant="danger"
          class="mr-2"
        >
          Delete
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      fields: ["username", "gender", "age", "task", "status", "action"],
    };
  },
  computed: {
    todos() {
      return this.$store.getters.todos;
    },
    assignedTodosCount() {
      return this.$store.getters.todoCount("Assigned");
    },
    pendingTodosCount() {
      return this.$store.getters.todoCount("Pending");
    },
    wipTodosCount() {
      return this.$store.getters.todoCount("WIP");
    },
    completedTodosCount() {
      return this.$store.getters.todoCount("Completed");
    },
    canceledTodosCount() {
      return this.$store.getters.todoCount("Canceled");
    },
  },
  methods: {
    deleteTodo(id) {
      const self = this;
      this.$swal({
        title: "Do you really wanted to delete this ?",
        text: "No one will know.",
        showCancelButton: true,
        showConfirmButton: true,
        icon: "error",
      }).then(
        function () {
          self.$store
            .dispatch("deleteTodo", id)
            .then(() => {
              self.$swal.fire({
                title: "Todo Deleted!",
                text: "Add a new one",
                icon: "success",
                confirmButtonText: "Cool",
              });
            })
            .catch((err) => {
              self.$swal.fire({
                title: err,
                text: "Ughh",
                icon: "error",
                confirmButtonText: "Not That Cool",
              });
            });
        },
        // handling the promise rejection
        function () {
          self.$swal.fire({
            title: "Your Todo is saved",
            text: "now please do it bit quick",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      );
    },
  },
};
</script>
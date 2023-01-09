<script lang="ts">
import kanbanColumnsClient from "@/services/crud/kanban-columns.client";
import KanbanColumn from "@/components/KanbanColumn.vue";

type Column = {
  id: number;
  title: string;
};
type Data = {
  columns: Array<Column>;
};
export default {
  data(): Data {
    return { columns: [] };
  },
  components: {
    KanbanColumn,
  },
  async beforeRouteEnter(to, from, next) {
    const columns = await kanbanColumnsClient.index();
    next((vm) => vm.setColumns(columns));
  },
  methods: {
    setColumns(columns: Array<Column>) {
      this.columns = columns;
    },
    removeColumn(event: CustomEvent) {
      this.columns = this.columns.filter((col) => col.id !== event.id);
    },
    showAddColumnModal() {
      this.$modal.show("addColumn");
    },
    closeAddColumnModal() {
      this.$modal.hide("addColumn");
    },
    async submitAddColumn(event: SubmitEvent) {
      event.preventDefault();
      const form = event.target;
      try {
        const column = await kanbanColumnsClient.add(form[0]?.value);
        this.columns = [...this.columns, column];
        this.closeAddColumnModal();
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<template>
  <main class="columns">
    <KanbanColumn
      @remove="removeColumn"
      v-for="column of columns"
      :title="column.title"
      :id="column.id"
    >
    </KanbanColumn>
    <button @click="showAddColumnModal">Add Column</button>
    <modal :name="'addColumn'" :height="'auto'" :width="300">
      <form @submit="submitAddColumn" class="card__form">
        <label>
          <div>Title:</div>
          <input type="text" required
        /></label>
        <input type="submit" value="Add Column" />
      </form>
    </modal>
  </main>
</template>

<style lang="scss">
.columns {
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: repeat(100, 250px);
  grid-auto-flow: column;
  flex-grow: 1;
  gap: 20px;
}
</style>

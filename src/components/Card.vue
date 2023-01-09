<script setup lang="ts">
import cardsClient from "@/services/crud/cards.client";

defineProps<{
  title: string;
  description: string;
  kanban_column_id: number;
  id: number;
}>();
</script>
<script lang="ts">
export default {
  methods: {
    startDrag(event: DragEvent) {
      const card_string = JSON.stringify({
        title: this.title,
        id: this.id,
        description: this.description,
        kanban_column_id: this.kanban_column_id,
      });

      event.dataTransfer!.effectAllowed = "move";
      event.dataTransfer!.setData("card", card_string);
    },
    endDrag(event: DragEvent) {
      console.log(event.dataTransfer?.dropEffect);
      if (event.dataTransfer?.dropEffect !== "none")
        this.$emit("remove", this.id);
    },
    showEditModal() {
      this.$modal.show("edit" + this.id);
    },
    showDeleteModal() {
      this.$modal.show("deleteConfirm" + this.id);
    },
    closeDeleteModal() {
      this.$modal.hide("deleteConfirm" + this.id);
    },
    async confirmDelete() {
      try {
        await cardsClient.remove(this.id);
        this.closeDeleteModal();
        this.removeCard(this.id);
      } catch (e) {
        console.error(e);
      }
    },
    async submitEdit(event) {
      event.preventDefault();
      try {
        await cardsClient.update(this.id, {
          title: this.title,
          description: this.description,
          kanban_column_id: this.kanban_column_id,
        });
        this.$modal.hide("edit" + this.id);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
<template>
  <article>
    <div
      class="card"
      draggable="true"
      @dragstart="startDrag"
      @dragend="endDrag"
    >
      <h4 class="title">{{ title }}</h4>
      <p class="description">{{ description }}</p>
      <button @click="showEditModal">edit</button>
      <button @click="showDeleteModal">delete</button>
    </div>
    <modal :name="'edit' + id" :width="300" :height="'auto'">
      <form @submit="submitEdit" class="card__form">
        <label>
          <div>Title:</div>
          <input type="text" v-model="title" required
        /></label>
        <label>
          <div>description:</div>
          <input type="text" v-model="description" required
        /></label>
        <input type="submit" value="Update Task" />
      </form>
    </modal>
    <modal :name="'deleteConfirm' + id" :width="300" :height="'auto'">
      <p>Do you really want to delete this task?</p>
      <div>
        <button @click="confirmDelete">Yes</button
        ><button @click="closeDeleteModal">No</button>
      </div>
    </modal>
  </article>
</template>

<style lang="scss">
.card {
  padding: 1em;
  margin: 0.5em;
  border: solid greenyellow 3px;
  display: flex;
  flex-direction: column;
  &__form {
    display: flex;
    flex-direction: column;
    padding: 2em;
  }
}
</style>

<script lang="ts">
import cardsClient from "@/services/crud/cards.client";
import Card from "@/components/Card.vue";
import type { Card as CardType } from "@/services/crud/cards.client";
import kanbanColumnsClient from "@/services/crud/kanban-columns.client";
export default {
  props: {
    title: String,
    id: Number,
  },
  components: {
    Card,
  },
  data(): {
    cards: Array<CardType>;
  } {
    return {
      cards: [],
    };
  },
  async created() {
    const cards = (await cardsClient.index({})) as Array<CardType>;
    this.cards = cards.filter(
      (card: CardType) => card.kanban_column_id === this.id
    );
  },
  methods: {
    acceptDrag(event: DragEvent) {
      event.preventDefault();
    },
    handleDrop(event: DragEvent) {
      const card = JSON.parse(event.dataTransfer?.getData("card")!) as CardType;
      event.dataTransfer!.dropEffect = "move";
      cardsClient.move(card, this.id!);
      this.cards = [...this.cards, card];
    },
    removeCard(card_id: number) {
      this.cards = this.cards.filter((card) => card.id !== card_id);
    },
    showDeleteModal() {
      this.$modal.show("deleteKanbanConfirm" + this.id);
    },
    closeDeleteModal() {
      this.$modal.hide("deleteKanbanConfirm" + this.id);
    },
    showAddModal() {
      this.$modal.show("addCard" + this.id);
    },
    closeAddModal() {
      this.$modal.hide("addCard" + this.id);
    },
    showEditModal() {
      this.$modal.show("editKanban" + this.id);
    },
    closeEditModal() {
      this.$modal.hide("editKanban" + this.id);
    },
    async confirmDelete() {
      try {
        await kanbanColumnsClient.remove(this.id);
        this.closeDeleteModal();
        this.$emit("remove", { id: this.id });
      } catch (e) {
        console.error(e);
      }
    },
    async submitEditColumn(event: SubmitEvent) {
      event.preventDefault();
      const form = event.target;
      try {
        await kanbanColumnsClient.update(this.id, form[0]!.value);
        this.closeEditModal();
      } catch (e) {
        console.error(e);
      }
    },
    async submitAddTask(event: SubmitEvent) {
      event.preventDefault();
      const form = event.target;
      try {
        const card = await cardsClient.add({
          title: form[0].value,
          description: form[1].value,
          kanban_column_id: this.id,
        });
        this.cards = [...this.cards, card];
        this.closeAddModal();
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
<template>
  <section class="wrapper">
    <modal :name="'editKanban' + id" :height="'auto'" :width="300">
      <form @submit="submitEditColumn" class="card__form">
        <label>
          <div>Title:</div>
          <input type="text" v-model="title" required
        /></label>
        <input type="submit" value="Edit Column" />
      </form>
    </modal>
    <div @dragover="acceptDrag" @drop="handleDrop" class="wrapper__column">
      <div class="column__title__wrapper">
        <h3>{{ title }}</h3>
        <button @click="showEditModal">edit</button>
        <button @click="showDeleteModal">delete</button>
      </div>
      <Card
        v-for="card of cards"
        :key="card.id"
        :title="card.title"
        :description="card.description ?? 'test'"
        :kanban_column_id="card.kanban_column_id"
        :id="card.id"
        @remove="removeCard"
      >
      </Card>
      <button @click="showAddModal">Add</button>
    </div>
    <modal :name="'deleteKanbanConfirm' + id" :height="'auto'" :width="300">
      <p>Do you really want to delete this column?</p>
      <div>
        <button @click="confirmDelete">Yes</button
        ><button @click="closeDeleteModal">No</button>
      </div>
    </modal>
    <modal :name="'addCard' + id" :height="'auto'" :width="300">
      <form @submit="submitAddTask" class="card__form">
        <label>
          <div>Title:</div>
          <input type="text" required
        /></label>
        <label>
          <div>description:</div>
          <input type="text" required
        /></label>
        <input type="submit" value="Add Task" />
      </form>
    </modal>
  </section>
</template>

<style lang="scss">
.wrapper {
  max-height: 90vh;
  overflow-y: auto;
  display: contents;
  &__column {
    padding: 1em;
    border: solid green 3px;
    &__title {
      &__wrapper {
        display: flex;
        h3 {
          flex-grow: 3;
        }
      }
    }
  }
}
</style>

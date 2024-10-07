<template>
  <div class="flex items-center justify-between p-4 text-black bg-slate-200">
    <button class="bg-gray-400" @click="resetCanvas">Сброс</button>
    <div
      class="flex items-center justify-between gap-2 p-1 bg-gray-400 rounded-lg"
    >
      <label for="inputType">Тип ввода: </label>
      <select
        class="p-1 bg-gray-400 border border-blue-600 rounded-lg"
        v-model="localInputType.value"
        @change="emitInputTypeChange"
        id="inputType"
      >
        <option
          :selected="type.value == inputType.value"
          v-for="type in inputTypes"
          :key="type.text"
          :value="type.value"
        >
          {{ type.text }}
        </option>
      </select>
    </div>
    <div
      v-if="inputType.value === 'line'"
      class="flex items-center justify-between gap-2 p-1 bg-gray-400 rounded-lg"
    >
      <label for="lineWidth">Толщина линии: </label>
      <select
        class="p-1 bg-gray-400 border border-blue-600 rounded-lg"
        v-model="lineWidth"
        @change="updateLineWidth"
        id="lineWidth"
      >
        <option v-for="size in lineSizes" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
    </div>
    <div
      v-if="inputType.value === 'text'"
      class="flex items-center justify-between gap-2 p-1 bg-gray-400 rounded-lg"
    >
      <label for="lineWidth">Размер текста: </label>
      <select
        class="p-1 bg-gray-400 border border-blue-600 rounded-lg"
        v-model="textSize"
        @change="updateTextSize"
        id="lineWidth"
      >
        <option v-for="size in textSizes" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
    </div>
    <div
      class="flex items-center justify-between gap-2 p-2 bg-gray-400 rounded-lg"
    >
      <label for="lineColor">Цвет: </label>
      <input
        type="color"
        class="rounded-lg"
        v-model="lineColor"
        @input="updateLineColor"
        id="lineColor"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "CanvasControlPanel",
  props: {
    ctx: {
      type: Object as () => CanvasRenderingContext2D | null,
      required: true,
    },
    inputType: {
      type: Object as () => { value: string },
      required: true,
    },
  },
  setup(props, { emit }) {
    const inputTypes = [
      { value: "line", text: "Линия" },
      { value: "text", text: "Текст" },
    ];
    const localInputType = ref(props.inputType);
    const lineWidth = ref(3);
    const textSize = ref(14);
    const lineColor = ref("#000000");
    const lineSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const textSizes = [10, 12, 14, 16, 18, 20, 24, 28, 40, 80];

    const updateLineWidth = () => {
      if (props.ctx) {
        props.ctx.lineWidth = lineWidth.value;
      }
    };

    const emitInputTypeChange = () => {
      emit("update:inputType", localInputType.value.value);
    };

    const updateTextSize = () => {
      if (props.ctx) {
        props.ctx.font = `normal ${textSize.value}px Sans-serif`;
      }
    };

    const updateLineColor = () => {
      if (props.ctx) {
        props.ctx.strokeStyle = lineColor.value;
      }
    };

    const resetCanvas = () => {
      if (props.ctx) {
        props.ctx.clearRect(
          0,
          0,
          props.ctx.canvas.width,
          props.ctx.canvas.height
        );
      }
    };

    return {
      lineWidth,
      inputType: props.inputType,
      lineColor,
      lineSizes,
      updateLineWidth,
      updateLineColor,
      emitInputTypeChange,
      resetCanvas,
      inputTypes,
      textSizes,
      textSize,
      updateTextSize,
      localInputType,
    };
  },
});
</script>

<style scoped>
.control-panel {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.control-panel button,
.control-panel select,
.control-panel input {
  margin: 5px 0;
}
</style>

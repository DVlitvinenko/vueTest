<template>
  <div class="h-full">
    <CanvasControlPanel
      :ctx="ctx"
      :inputType="inputType"
      @update:inputType="inputType.value = $event"
    />
    <div
      class="w-full h-[calc(100%-80px)] overflow-hidden relative bg-gray-300 border-8 rounded-sm border-amber-950"
      @mousedown="startDrawing"
      @click="showTextInput"
      @mouseup="stopDrawing"
      @mousemove="draw"
      @touchstart="startDrawing"
      @touchend="stopDrawing"
      @touchmove="draw"
      ref="drawingContainer"
      @mouseenter="updateCursor"
      @mouseleave="resetCursor"
      :style="{ cursor: cursorStyle }"
    >
      <canvas :width="canvasWidth" :height="canvasHeight" ref="canvas"></canvas>
      <input
        v-focus
        ref="inputRef"
        v-if="showInput"
        type="text"
        v-model="inputText"
        @keydown.enter="drawText"
        @blur="finalizeText"
        :style="{
          position: 'absolute',
          left: inputPosition.x - 5 + 'px',
          top: inputPosition.y - 14 + 'px',
          font: ctx?.font,
        }"
        class="text-black bg-inherit"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "vue";
import CanvasControlPanel from "./CanvasControlPanel.vue";

export default defineComponent({
  name: "DrawingCanvas",
  components: {
    CanvasControlPanel,
  },
  setup() {
    const canvas = ref<HTMLCanvasElement | null>(null);
    const drawingContainer = ref<HTMLDivElement | null>(null);
    const ctx = ref<CanvasRenderingContext2D | null>(null);
    const inputType = ref<{ value: string }>({ value: "line" });
    const isDrawing = ref(false);
    const canvasWidth = ref(500);
    const canvasHeight = ref(500);
    const inputRef = ref<HTMLInputElement | null>(null);
    const showInput = ref(false);
    const inputText = ref("");
    const inputPosition = ref({ x: 0, y: 0 });
    const cursorStyle = ref("default"); // New state for cursor style

    const updateCanvasSize = () => {
      if (drawingContainer.value && canvas.value) {
        canvasWidth.value = drawingContainer.value.clientWidth;
        canvasHeight.value = drawingContainer.value.clientHeight;
        canvas.value.width = canvasWidth.value;
        canvas.value.height = canvasHeight.value;
      }
    };

    onMounted(() => {
      if (canvas.value) {
        ctx.value = canvas.value.getContext("2d");
        ctx.value!.lineWidth = 3;
        ctx.value!.lineCap = "round";
        ctx.value!.strokeStyle = "black";
        updateCanvasSize();
        const resizeObserver = new ResizeObserver(updateCanvasSize);
        if (drawingContainer.value) {
          resizeObserver.observe(drawingContainer.value);
        }
        onBeforeUnmount(() => {
          resizeObserver.disconnect();
        });
      }
    });

    const startDrawing = (event: MouseEvent | TouchEvent) => {
      if (inputType.value.value === "line") {
        isDrawing.value = true;
        const { offsetX, offsetY } = getEventPosition(event);
        ctx.value!.beginPath();
        ctx.value!.moveTo(offsetX, offsetY);
      }
    };

    const stopDrawing = () => {
      isDrawing.value = false;
      ctx.value!.closePath();
    };

    const draw = (event: MouseEvent | TouchEvent) => {
      if (!isDrawing.value || !ctx.value) return;
      const { offsetX, offsetY } = getEventPosition(event);
      ctx.value!.lineTo(offsetX, offsetY);
      ctx.value!.stroke();
    };

    const getEventPosition = (event: MouseEvent | TouchEvent) => {
      if (event instanceof TouchEvent) {
        const touch = event.touches[0];
        return {
          offsetX: touch.clientX - canvas.value!.getBoundingClientRect().left,
          offsetY: touch.clientY - canvas.value!.getBoundingClientRect().top,
        };
      } else {
        return { offsetX: event.offsetX, offsetY: event.offsetY };
      }
    };

    const showTextInput = (event: MouseEvent | TouchEvent) => {
      if (inputType.value.value === "text") {
        const { offsetX, offsetY } = getEventPosition(event);
        inputPosition.value = { x: offsetX, y: offsetY };
        showInput.value = true;
        inputText.value = "";
        nextTick(() => {
          inputRef.value?.focus();
        });
      }
    };

    const drawText = () => {
      if (ctx.value) {
        ctx.value.strokeText(
          inputText.value,
          inputPosition.value.x,
          inputPosition.value.y
        );

        finalizeText();
      }
    };

    const finalizeText = () => {
      showInput.value = false;
      inputText.value = "";
    };

    const updateCursor = () => {
      if (inputType.value.value === "text") {
        cursorStyle.value = "text"; // Change cursor to text
      }
    };

    const resetCursor = () => {
      cursorStyle.value = "crosshair"; // Reset cursor to default
    };

    return {
      canvas,
      drawingContainer,
      ctx,
      startDrawing,
      stopDrawing,
      draw,
      canvasWidth,
      canvasHeight,
      inputType,
      showInput,
      inputText,
      inputPosition,
      showTextInput,
      drawText,
      finalizeText,
      cursorStyle, // Return cursorStyle
      updateCursor,
      resetCursor,
    };
  },
});
</script>

<style scoped>
.drawing-canvas {
  border: 1px solid black;
  width: 100%;
  height: 100%;
  position: relative;
}
canvas {
  width: 100%;
  height: 100%;
}
input[type="text"] {
  z-index: 10; /* Ensure input is above canvas */
}
</style>

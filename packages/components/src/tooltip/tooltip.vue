<template>
    <el-tooltip v-bind="props" v-model:visible="visible">
        <div ref="divRef" class="text-ellipsis">
            <slot>{{ content }}</slot>
        </div>
        <template #content>
            <slot name="content">
                <slot>{{ content }}</slot>
            </slot>
        </template>
    </el-tooltip>
</template>

<script lang='ts' setup>
import { ref, computed } from "vue";
import { useElementHover, useResizeObserver } from "@vueuse/core";
import type { ElTooltipProps } from "element-plus";
import { isEllipsis } from "@llwwqq/utils";

defineOptions({ name: 'c-tooltip' })

type Props = Partial<ElTooltipProps>

const props = withDefaults(defineProps<Props>(), {
    effect: 'dark',
    placement: 'top',
    showArrow: true,
    teleported: true,
})

const divRef = ref()
const ellipsis = ref(false)

const isHover = useElementHover(divRef)

useResizeObserver(divRef, () => {
    ellipsis.value = isEllipsis(divRef.value)
})

const visible = computed(() => isHover.value && ellipsis.value)

</script>

<style lang='less' scoped></style>
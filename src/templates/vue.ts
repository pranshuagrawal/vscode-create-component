export default {
    JS_TEMPLATE: `
<template>
    <div></div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style scoped src="./styles/index{{StyleExtension}}"></style>
`,
    TS_TEMPLATE: `
<template>
    <div></div>
</template>

<script lang="ts">
export default {
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style scoped src="./styles/index{{StyleExtension}}"></style>
`,
    STORYBOOK: `
import Vue from 'vue';
import {{componentName}} from './{{componentName}}.vue';

export default {title: 'Component|{{componentName}}'};

export const {{componentName}}Example = () => '<{{componentName}} />';
`,
    INDEX: `
import {{componentName}} from './{{componentName}}.vue';
export default {{componentName}};    
`,
    STYLING: ``
};
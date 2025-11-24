<script setup lang="ts">
interface Rule {
  name?: 'required' | 'regex';
  regex?: string;
  message?: string;
}

interface TypeProps {
  modelValue: { [key: string]: any };
  rules?: {
    [key: string]: Rule[];
  };
}

const props = withDefaults(defineProps<TypeProps>(), {
  modelValue: () => ({}),
  rules: () => ({})
});

const defaultValue = JSON.parse(JSON.stringify(props.modelValue));

const emits = defineEmits<{
  (e: 'submit'): void;
  (e: 'update:modelValue', value: { [key: string]: any }): void;
}>();

const error = ref<{ [key: string]: any }>({});
const requireRuleKeys = [];
for (let ruleName in props.rules) {
  for (let item of props.rules[ruleName]) {
    if (item?.name === 'required') requireRuleKeys.push(ruleName);
    break;
  }
}

provide('error', error);
provide('keyRules', requireRuleKeys);

function checkRules() {
  error.value = {};
  if (typeof props.rules === 'object') {
    for (let field in props.rules) {
      if (field && props.rules[field]) {
        for (let rule of props.rules[field]) {
          if (rule['name'] === 'required') {
            if (
              props.modelValue[field] === undefined ||
              props.modelValue[field] === null ||
              props.modelValue[field] === ''
            ) {
              error.value[field] = rule['message'];
            }
          } else if (rule['name'] === 'regex') {
            if (rule['regex']) {
              if (!new RegExp(rule['regex']).test(props.modelValue[field])) {
                error.value[field] = rule['message'];
              }
            }
          }
        }
      }
    }
  }
}

function onSubmit() {
  checkRules();
  if (JSON.stringify(error.value) === '{}') {
    emits('submit');
  }
}

function $reset() {
  for (let key in props.modelValue) {
    props.modelValue[key] = defaultValue[key];
  }
}

defineExpose({
  $reset
});
</script>
<template>
  <div>
    <form
      @submit.prevent="onSubmit"
      autocomplete="off"
    >
      <slot />
    </form>
  </div>
</template>

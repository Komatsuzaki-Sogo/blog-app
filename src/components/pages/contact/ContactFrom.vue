<template>
  <form method="post" class="c-contact-form" @submit.prevent="submitForm">
    <div class="c-contact-form__item">
      <BaseLabel for="contact-name">氏名<BaseBadgeRequired /></BaseLabel>
      <Field v-slot="{ field, errorMessage }" name="name">
        <BaseInput
          id="contact-name"
          v-bind="field"
          type="text"
          placeholder="例：山田 太郎"
          :required="true"
          :error-state="!!errorMessage"
          maxlength="30"
          @change="() => validateField('name')"
        />
        <BaseTextError v-if="errorMessage">{{ errorMessage }}</BaseTextError>
      </Field>
    </div>

    <div class="c-contact-form__item">
      <BaseLabel for="contact-email">Email<BaseBadgeRequired /></BaseLabel>
      <Field v-slot="{ field, errorMessage }" name="email">
        <BaseInput
          id="contact-email"
          v-bind="field"
          type="email"
          placeholder="例：yamada@example.com"
          :required="true"
          :error-state="!!errorMessage"
          maxlength="30"
          @change="() => validateField('email')"
        />
        <BaseTextError v-if="errorMessage">{{ errorMessage }}</BaseTextError>
      </Field>
    </div>

    <div class="c-contact-form__item">
      <BaseLabel for="contact-item">お問い合わせ項目<BaseBadgeRequired /></BaseLabel>
      <Field v-slot="{ field, errorMessage }" name="category">
        <BaseSelect
          id="contact-item"
          v-bind="field"
          :required="true"
          :error-state="!!errorMessage"
          @change="() => validateField('category')"
        >
          <option v-for="option in categoryOptions" :key="option.id" :value="option.value">
            {{ option.label }}
          </option>
        </BaseSelect>
        <BaseTextError v-if="errorMessage">{{ errorMessage }}</BaseTextError>
      </Field>
    </div>

    <div class="c-contact-form__item">
      <BaseLabel for="contact-content">お問い合わせ内容<BaseBadgeRequired /></BaseLabel>
      <Field v-slot="{ field, errorMessage }" name="message">
        <BaseTextarea
          id="contact-content"
          v-bind="field"
          placeholder="お問い合わせ内容を入力してください"
          :required="true"
          rows="6"
          @change="() => validateField('message')"
        />
        <BaseTextError v-if="errorMessage">{{ errorMessage }}</BaseTextError>
      </Field>
    </div>

    <BaseButton type="submit" :disabled-state="!isValid || isSubmitting">
      {{ isSubmitting ? '送信中・・・' : '送信する' }}
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
  import { useForm, Field } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/yup'
  import BaseLabel from '~/components/atoms/BaseLabel.vue'
  import BaseBadgeRequired from '~/components/atoms/BaseBadgeRequired.vue'
  import BaseInput from '~/components/atoms/BaseInput.vue'
  import BaseSelect from '~/components/atoms/BaseSelect.vue'
  import BaseTextarea from '~/components/atoms/BaseTextarea.vue'
  import BaseTextError from '~/components/atoms/BaseTextError.vue'
  import BaseButton from '~/components/atoms/BaseButton.vue'

  const categoryOptions = [
    { id: '1', label: '項目を選択してください', value: '' },
    { id: '2', label: '1つ目の項目', value: '1つ目の項目' },
    { id: '3', label: '2つ目の項目', value: '2つ目の項目' },
    { id: '4', label: '3つ目の項目', value: '3つ目の項目' },
  ]

  const schema = toTypedSchema(useContactSchema())
  const isSubmitting = ref(false)

  const { handleSubmit, validateField, meta, resetForm } = useForm({
    validationSchema: schema,
    validateOnMount: false,
  })

  const isValid = computed(() => meta.value.valid)

  const submitForm = handleSubmit(async (values) => {
    isSubmitting.value = true
    try {
      const res = await fetch('https://ssgform.com/s/IBKRh9hHTfd3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        throw new Error('送信に失敗しました、再度お試しください。')
      }
      resetForm()
      alert('送信完了しました。')
    } catch (error) {
      alert('送信中にエラーが発生しました、再度お試しください。')
      console.error(error)
    } finally {
      isSubmitting.value = false
    }
  })
</script>

<style scoped lang="scss">
  .c-contact-form {
    @extend %reset-margin;

    width: 100%;
    max-width: 680px;
    padding: 16px;
    margin: 0 auto;
    background-color: var(--color-background-gray);
    border-radius: 16px;

    @include mixin.media(pc) {
      padding: 40px;
      border-radius: 24px;
    }

    &__item {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 24px;
    }
  }
</style>

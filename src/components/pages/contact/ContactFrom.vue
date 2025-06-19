<template>
  <form method="post" @submit.prevent="submitForm">
    <div>
      <label>氏名</label>
      <Field v-slot="{ field, errorMessage }" name="name">
        <input
          v-bind="field"
          type="text"
          placeholder="例：山田 太郎"
          @change="() => validateField('name')"
        />
        <span v-if="errorMessage">{{ errorMessage }}</span>
      </Field>
    </div>

    <div>
      <label>Email</label>
      <Field v-slot="{ field, errorMessage }" name="email">
        <input
          v-bind="field"
          type="email"
          placeholder="例：yamada@example.com"
          @change="() => validateField('email')"
        />
        <span v-if="errorMessage">{{ errorMessage }}</span>
      </Field>
    </div>

    <div>
      <label>お問い合わせ項目</label>
      <Field v-slot="{ field, errorMessage }" name="category">
        <select v-bind="field" @change="() => validateField('category')">
          <option value="">選択してください</option>
          <option value="製品について">製品について</option>
          <option value="料金について">料金について</option>
        </select>
        <span v-if="errorMessage">{{ errorMessage }}</span>
      </Field>
    </div>

    <div>
      <label>お問い合わせ内容</label>
      <Field v-slot="{ field, errorMessage }" name="message">
        <textarea
          v-bind="field"
          placeholder="お問い合わせ内容を入力してください"
          @change="() => validateField('message')"
        />
        <span v-if="errorMessage">{{ errorMessage }}</span>
      </Field>
    </div>

    <button type="submit" :disabled="!isValid || isSubmitting">送信</button>
    <div v-if="isSubmitting">送信中・・・</div>
  </form>
</template>

<script setup lang="ts">
  import { useForm, Field } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/yup'
  import { useContactSchema } from '#imports'
  import { computed, ref } from 'vue'

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
        throw new Error('送信に失敗しました')
      }

      alert('お問い合わせ内容が送信されました')
      resetForm()
    } catch (error) {
      alert('送信中にエラーが発生しました')
      console.error(error)
    } finally {
      isSubmitting.value = false
    }
  })
</script>

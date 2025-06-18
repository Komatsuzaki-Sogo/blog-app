import { object, string } from 'yup'

export const useContactSchema = () => {
  return object({
    name: string().required('氏名は必須です'),
    email: string()
      .required('メールアドレスは必須です')
      .email('メールアドレスの形式が正しくありません'),
    category: string().required('お問い合わせ項目は必須です'),
    message: string().required('お問い合わせ内容は必須です'),
  })
}

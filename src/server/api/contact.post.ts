import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const transporter = nodemailer.createTransport({
    service: 'gmail', // 例：Gmailを使う場合
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  // 送信先（受信者）と送信者両方に送る
  const recipients = ['your@email.com', body.email]

  await transporter.sendMail({
    from: `"お問合せフォーム" <${process.env.SMTP_USER}>`,
    to: recipients,
    subject: `【お問い合わせ】${body.category}`,
    text: `
【氏名】 ${body.name}
【メールアドレス】 ${body.email}
【お問い合わせ項目】 ${body.category}
【お問い合わせ内容】
${body.message}
    `.trim(),
  })

  return { success: true }
})

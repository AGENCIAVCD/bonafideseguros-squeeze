import { zodResolver } from '@hookform/resolvers/zod'
import { m, useReducedMotion } from 'framer-motion'
import { SpinnerGap } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const leadSchema = z.object({
  fullName: z.string().min(3, 'Informe seu nome completo.'),
  whatsapp: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'WhatsApp invalido.'),
  email: z.email('Informe um e-mail valido.'),
})

export type LeadFormValues = z.infer<typeof leadSchema>

type LeadFormProps = {
  onSubmit: (data: LeadFormValues) => Promise<void>
}

function maskWhatsapp(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length <= 2) {
    return digits ? `(${digits}` : ''
  }

  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function LeadForm({ onSubmit }: LeadFormProps) {
  const shouldReduceMotion = useReducedMotion()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      fullName: '',
      whatsapp: '',
      email: '',
    },
  })

  const whatsapp = register('whatsapp')

  return (
    <m.form
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
      onSubmit={handleSubmit(onSubmit)}
      className="glass-card space-y-4"
    >
      <div>
        <label htmlFor="fullName" className="label-default">
          Nome Completo
        </label>
        <input id="fullName" className="input-default" {...register('fullName')} />
        {errors.fullName && <p className="input-error">{errors.fullName.message}</p>}
      </div>

      <div>
        <label htmlFor="whatsapp" className="label-default">
          WhatsApp
        </label>
        <input
          id="whatsapp"
          className="input-default"
          placeholder="(11) 99999-9999"
          {...whatsapp}
          onChange={(event) => {
            const masked = maskWhatsapp(event.target.value)
            event.target.value = masked
            whatsapp.onChange(event)
          }}
        />
        {errors.whatsapp && <p className="input-error">{errors.whatsapp.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="label-default">
          E-mail
        </label>
        <input id="email" type="email" className="input-default" {...register('email')} />
        {errors.email && <p className="input-error">{errors.email.message}</p>}
      </div>

      <m.button
        type="submit"
        whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        disabled={isSubmitting}
        className="btn-primary"
      >
        {isSubmitting ? (
          <span className="inline-flex items-center gap-2">
            <SpinnerGap className="animate-spin" size={20} />
            Enviando...
          </span>
        ) : (
          'Garantir minha Squeeze'
        )}
      </m.button>
    </m.form>
  )
}

import { useState } from 'react';
import { sendContactMessage } from '../../services/api';

const initialState = { name: '', email: '', subject: '', message: '' };

// Phase 10: wired to the real backend. `status` covers idle / submitting /
// success / error. Client-side validation still runs first (instant
// feedback, no round trip for an empty field) — but if the server also
// rejects something (e.g. its own message-length rule), those come back
// as field-level errors from DRF and get mapped into the same `errors`
// state, so the UI doesn't need two different error-rendering paths.
export default function ContactForm() {
  const [values, setValues] = useState(initialState);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Name is required.';
    if (!values.email.trim()) {
      next.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      next.email = 'Enter a valid email.';
    }
    if (!values.subject.trim()) next.subject = 'Subject is required.';
    if (!values.message.trim()) next.message = 'Message is required.';
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('submitting');
    try {
      await sendContactMessage(values);
      setStatus('success');
      setValues(initialState);
      setErrors({});
    } catch (err) {
      const fieldErrors = err.response?.data;
      if (err.response?.status === 400 && fieldErrors) {
        // DRF sends { field: ["message"] } — flatten each to one string.
        const mapped = Object.fromEntries(
          Object.entries(fieldErrors).map(([field, msgs]) => [
            field,
            Array.isArray(msgs) ? msgs[0] : String(msgs),
          ])
        );
        setErrors(mapped);
        setStatus('idle');
      } else {
        // Network error, 429 (throttled), or 5xx — never show raw backend
        // detail to the visitor, just a calm generic message.
        setStatus('error');
      }
    }
  };

  if (status === 'success') {
    return (
      <p className="text-moss text-sm">
        Message sent successfully. I&apos;ll get back to you soon.
      </p>
    );
  }

  // text-base (16px) on the inputs, not text-sm — anything smaller makes
  // iOS Safari auto-zoom the page on focus, which is jarring on a
  // full-bleed scene like this. Drops back to text-sm at sm+ where that
  // zoom behavior doesn't happen anyway.
  const fieldClass =
    'w-full bg-ink/60 border border-fog/20 focus:border-moss/60 rounded-lg px-4 py-3 text-base sm:text-sm text-paper placeholder:text-fog/50 outline-none transition-colors';

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          className={fieldClass}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-xs text-red-400 mt-1">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          className={fieldClass}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-xs text-red-400 mt-1">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={values.subject}
          onChange={handleChange}
          className={fieldClass}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        />
        {errors.subject && (
          <p id="subject-error" className="text-xs text-red-400 mt-1">
            {errors.subject}
          </p>
        )}
      </div>

      <div>
        <textarea
          name="message"
          placeholder="Message"
          rows={4}
          value={values.message}
          onChange={handleChange}
          className={fieldClass}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-red-400 mt-1">
            {errors.message}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p className="text-xs text-red-400">
          Something went wrong sending your message. Please try again in a moment.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="self-start text-xs uppercase tracking-[0.2em] bg-moss text-ink font-medium rounded-full px-6 py-3 hover:bg-moss/90 transition-colors disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
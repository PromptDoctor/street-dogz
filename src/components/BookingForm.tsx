import { useState } from 'react';

interface Props {
  accessKey: string;
  /** Submission endpoint — defaults to PUBLIC_WEB3FORMS_URL env var */
  endpoint?: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const ITEM_CHOICES = [
  'Beef Hot Dogs',
  'Beef Polish',
  'Beef Hot Link',
  'Chicago Style Hot Dog',
  'Bratwurst',
  'Chili Cheese Dog',
  'Nachos',
  'Chili Cheese Nachos',
  'Chips',
  'Canned Soda',
  'Water',
  'Bottled Soda',
];

export default function BookingForm({
  endpoint = import.meta.env.PUBLIC_WEB3FORMS_URL ?? 'https://api.web3forms.com/submit',
  accessKey,
}: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [guests, setGuests] = useState('');
  const [trucks, setTrucks] = useState('');
  const [budget, setBudget] = useState('');
  const [payer, setPayer] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  function toggleItem(label: string) {
    setItems((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : prev.concat(label),
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set('subject', `Booking request — ${eventName || eventType || 'event'}`);
    data.set('items', items.join(', ') || '—');
    try {
      const res = await fetch(endpoint, { method: 'POST', body: data });
      const result: { success: boolean } = await res.json();
      setStatus(result.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div role="alert" className="bf-success">
        <p>Thanks — your booking request was sent. We'll get back to you fast.</p>
      </div>
    );
  }

  const disabled = status === 'submitting';

  return (
    <form onSubmit={handleSubmit} className="bf-form">
      <input type="hidden" name="access_key" value={accessKey} />
      <input type="hidden" name="subject" value="Booking request" />
      <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />

      <div className="bf-section-label">Your info</div>
      <div className="bf-row-2">
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Event host name *"
          aria-label="Event host name"
          required
          disabled={disabled}
        />
        <input
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone *"
          aria-label="Event host phone number"
          type="tel"
          required
          disabled={disabled}
        />
      </div>
      <input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email *"
        aria-label="Event host email"
        type="email"
        required
        disabled={disabled}
      />

      <div className="bf-section-label">Your event</div>
      <div className="bf-row-2">
        <input
          name="event_name"
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Event name"
          aria-label="Event name"
          disabled={disabled}
        />
        <input
          name="event_type"
          type="text"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          placeholder="Event type"
          aria-label="Event type"
          disabled={disabled}
        />
      </div>
      <input
        name="address"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Event location address *"
        aria-label="Event location address"
        required
        disabled={disabled}
      />
      <div className="bf-row-3">
        <label className="bf-field-label">
          Event date *
          <input
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            aria-label="Event date"
            required
            disabled={disabled}
          />
        </label>
        <label className="bf-field-label">
          Start time *
          <input
            name="start_time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            type="time"
            aria-label="Event start time"
            required
            disabled={disabled}
          />
        </label>
        <label className="bf-field-label">
          End time *
          <input
            name="end_time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            type="time"
            aria-label="Event end time"
            required
            disabled={disabled}
          />
        </label>
      </div>
      <div className="bf-row-3">
        <input
          name="guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          type="number"
          min={1}
          placeholder="Est. guests/eaters *"
          aria-label="Estimated guests in attendance"
          required
          disabled={disabled}
        />
        <input
          name="trucks"
          value={trucks}
          onChange={(e) => setTrucks(e.target.value)}
          type="number"
          min={1}
          placeholder="Trucks at event *"
          aria-label="Total number of trucks at event"
          required
          disabled={disabled}
        />
        <input
          name="budget"
          type="text"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Event budget"
          aria-label="Event budget"
          disabled={disabled}
        />
      </div>
      <div className="bf-payer">
        <span className="bf-payer-label">Who's paying? *</span>
        <label className="bf-radio">
          <input
            type="radio"
            name="payer"
            value="Event Coordinator"
            checked={payer === 'Event Coordinator'}
            onChange={() => setPayer('Event Coordinator')}
            required
            disabled={disabled}
          />
          Event Coordinator
        </label>
        <label className="bf-radio">
          <input
            type="radio"
            name="payer"
            value="Event Attendees"
            checked={payer === 'Event Attendees'}
            onChange={() => setPayer('Event Attendees')}
            required
            disabled={disabled}
          />
          Event Attendees
        </label>
      </div>

      <div className="bf-section-label">Choose items for your event</div>
      <div className="bf-items">
        {ITEM_CHOICES.map((label) => {
          const on = items.includes(label);
          return (
            <button
              key={label}
              type="button"
              onClick={() => toggleItem(label)}
              disabled={disabled}
              className={on ? 'bf-item bf-item-on' : 'bf-item'}
            >
              {label}
            </button>
          );
        })}
      </div>

      <textarea
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Anything else we should know?"
        aria-label="Message"
        rows={3}
        disabled={disabled}
      />

      <label className="bf-ack">
        <input type="checkbox" name="acknowledged" required disabled={disabled} />
        I acknowledge: all food is included in the invoice price quoted for the set guests/eaters in attendance. Eaters over the set amount will be charged at a per guest/eater cost. *
      </label>

      {status === 'error' && (
        <p role="alert" className="bf-error">Something went wrong — please try again or call us directly.</p>
      )}

      <button type="submit" disabled={disabled} className="bf-submit">
        {disabled ? 'Sending…' : 'Send Booking Request'}
      </button>
      <p className="bf-fineprint">
        † Event minimum is required. †† Event date and time will not be secured until minimum deposit is paid in full.
      </p>
    </form>
  );
}

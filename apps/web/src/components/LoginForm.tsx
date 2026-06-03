import { useState, type FormEvent } from "react";
import { signIn } from "../api";

export function LoginForm({ onSignedIn }: { onSignedIn: (name: string) => void }) {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      onSignedIn(await signIn(email, pin));
    } catch {
      setError("El correo o el PIN no son correctos.");
    }
  }

  return (
    <form className="login" onSubmit={submit}>
      <h1>Cafetería</h1>
      <p>Ingresa con tu correo y tu PIN de cuatro dígitos.</p>
      <label>
        Correo
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        PIN
        <input type="password" inputMode="numeric" maxLength={4} value={pin} onChange={(e) => setPin(e.target.value)} required />
      </label>
      {error && <p className="error">{error}</p>}
      <button className="btn-primary" type="submit">
        Ingresar
      </button>
    </form>
  );
}

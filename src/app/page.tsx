import Link from "next/link";

export default function Page() {
  return (
    <main>
      <ul>
        <li>
          <Link href="/default">Default</Link>
        </li>
        <li>
          <Link href="/longer-duration">Longer Duration</Link>
        </li>
      </ul>
    </main>
  );
}
